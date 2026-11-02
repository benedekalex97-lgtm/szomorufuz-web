/**
 * Űrlap-beküldés feldolgozása (audit SZF-002). Keretrendszer-független: a függőségeket
 * (kézbesítő, tárak, óra) paraméterként kapja, így egységtesztből is futtatható.
 *
 * Sorrend: méret → Origin → tartalomtípus/elemzés → űrlap-azonosító → rate limit →
 * robotszűrés → idempotencia → mezőellenőrzés → kézbesítés.
 * Siker CSAK akkor, ha a kézbesítő elfogadta az üzenetet.
 */
import { allFields, type FormDef, type FormId, forms, serviceById } from './definitions';
import type { DeliveryAdapter, OutgoingMessage } from './delivery';
import {
  clientKey,
  IdempotencyStore,
  LIMITS,
  looksLikeBot,
  META,
  originAllowed,
  RateLimiter,
  safePagePath,
  type StoredResult,
  validKey,
} from './security';
import { NOTICE_ERROR, USER_MESSAGES } from './messages';
import { type Errors, validate, type Values } from './validate';

export interface HandlerDeps {
  adapter: DeliveryAdapter;
  limiter: RateLimiter;
  store: IdempotencyStore;
  allowedOrigins: readonly string[];
  ip?: string | undefined;
  salt: string;
  now?: () => number;
  log?: (entry: Record<string, unknown>) => void;
}

export interface HandlerResult extends StoredResult {
  headers?: Record<string, string>;
}

type Input = Record<string, string | string[]>;

/** application/x-www-form-urlencoded vagy JSON; ismétlődő kulcs → tömb */
export async function parseBody(
  request: Request,
): Promise<Input | 'too-large' | 'unsupported' | 'invalid'> {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > LIMITS.maxBodyBytes) return 'too-large';
  const type = (request.headers.get('content-type') ?? '').split(';')[0]?.trim().toLowerCase();
  if (type !== 'application/x-www-form-urlencoded' && type !== 'application/json')
    return 'unsupported';

  const buf = await request.arrayBuffer();
  if (buf.byteLength > LIMITS.maxBodyBytes) return 'too-large';
  const text = new TextDecoder('utf-8', { fatal: false }).decode(buf);

  const out: Input = {};
  const add = (k: string, v: unknown) => {
    if (typeof v !== 'string') return;
    const prev = out[k];
    if (prev === undefined) out[k] = v;
    else out[k] = Array.isArray(prev) ? [...prev, v] : [prev, v];
  };
  if (type === 'application/json') {
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return 'invalid';
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return 'invalid';
    for (const [k, v] of Object.entries(data)) {
      if (Array.isArray(v)) v.forEach((x) => add(k, x));
      else add(k, v);
    }
  } else {
    for (const [k, v] of new URLSearchParams(text)) add(k, v);
  }
  return out;
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function composeMessage(
  def: FormDef,
  values: Values,
  meta: { service?: string | undefined; page: string; at: Date },
): OutgoingMessage {
  const service = serviceById(meta.service);
  const lines: string[] = [def.title, ''];
  if (service) lines.push(`Szolgáltatás: ${service.label}`, '');
  for (const section of def.sections) {
    const filled = section.fields.filter((f) => values[f.name] !== undefined);
    if (!filled.length) continue;
    lines.push(`== ${section.legend} ==`);
    for (const f of filled) {
      const v = values[f.name];
      const text = Array.isArray(v) ? v.join(', ') : (v ?? '');
      lines.push(f.kind === 'textarea' ? `${f.label}:\n${text}` : `${f.label}: ${text}`);
    }
    lines.push('');
  }
  lines.push(
    '---',
    `Beküldve a weboldalról${meta.page ? ` (${meta.page})` : ''}: ${meta.at.toISOString()}`,
  );
  const email = values['email'];
  return {
    subject: `[Weboldal] ${def.title}${service ? ` – ${service.label}` : ''}`,
    text: lines.join('\n'),
    ...(typeof email === 'string' ? { replyTo: email } : {}),
  };
}

export async function handleSubmission(
  request: Request,
  deps: HandlerDeps,
): Promise<HandlerResult> {
  const now = deps.now ?? Date.now;
  const started = now();
  const log = deps.log ?? (() => {});
  let formId: FormId | 'ismeretlen' = 'ismeretlen';
  const done = (
    status: number,
    body: Record<string, unknown>,
    outcome: string,
    headers?: Record<string, string>,
  ): HandlerResult => {
    // Napló: személyes adat, IP, üzenettartalom NÉLKÜL.
    log({ event: 'form_submission', form: formId, outcome, status, ms: now() - started });
    return headers ? { status, body, headers } : { status, body };
  };

  if (request.method !== 'POST')
    return done(405, { ok: false, message: USER_MESSAGES.bad }, 'method', { Allow: 'POST' });
  if (!originAllowed(request, deps.allowedOrigins))
    return done(403, { ok: false, message: USER_MESSAGES.origin }, 'origin');

  const parsed = await parseBody(request);
  if (parsed === 'too-large')
    return done(413, { ok: false, message: USER_MESSAGES.tooLarge }, 'too-large');
  if (parsed === 'unsupported')
    return done(415, { ok: false, message: USER_MESSAGES.bad }, 'content-type');
  if (parsed === 'invalid')
    return done(400, { ok: false, message: USER_MESSAGES.bad }, 'invalid-body');

  const requested = one(parsed[META.form]);
  if (!requested || !Object.hasOwn(forms, requested))
    return done(400, { ok: false, message: USER_MESSAGES.bad }, 'unknown-form');
  formId = requested as FormId;
  const def = forms[formId];

  const serviceId = one(parsed[META.service]);
  const service = serviceById(serviceId);
  if (serviceId && (!service || service.form !== formId))
    return done(400, { ok: false, message: USER_MESSAGES.bad }, 'service-mismatch');

  const key = await clientKey(deps.ip, deps.salt);
  const rate = deps.limiter.hit(key, now());
  if (!rate.allowed)
    return done(429, { ok: false, message: USER_MESSAGES.rate }, 'rate-limited', {
      'Retry-After': String(rate.retryAfterS),
    });

  if (looksLikeBot(one(parsed[META.honeypot]), one(parsed[META.startedAt]), now())) {
    // Robotnak sikert mutatunk (ne tanulja meg a szűrőt), de semmit nem továbbítunk.
    return done(200, { ok: true, message: def.successMessage }, 'spam');
  }

  const idem = one(parsed[META.key]);
  if (validKey(idem)) {
    const prev = deps.store.get(idem, now());
    if (prev === 'pending')
      return done(409, { ok: false, message: USER_MESSAGES.pending }, 'duplicate-pending');
    if (prev) return done(prev.status, { ...prev.body, duplicate: true }, 'duplicate');
    deps.store.set(idem, 'pending', now());
  }

  const result = validate(def, parsed);
  if (one(parsed[META.notice]) !== 'igen') {
    result.ok = false;
    result.errors[META.notice] = NOTICE_ERROR;
  }
  if (!result.ok) {
    if (validKey(idem)) deps.store.delete(idem); // javítás után újraküldhető
    return done(
      422,
      { ok: false, message: USER_MESSAGES.validation, errors: result.errors satisfies Errors },
      'invalid-fields',
    );
  }

  if (deps.adapter.mode === 'disabled') {
    if (validKey(idem)) deps.store.delete(idem);
    return done(503, { ok: false, code: 'disabled', message: USER_MESSAGES.disabled }, 'disabled');
  }

  const message = composeMessage(def, result.values, {
    service: service?.id,
    page: safePagePath(one(parsed[META.page])),
    at: new Date(now()),
  });
  const delivery = await deps.adapter.send(message);
  if (!delivery.accepted) {
    if (validKey(idem)) deps.store.delete(idem);
    const status = delivery.reason === 'disabled' ? 503 : 502;
    return done(
      status,
      {
        ok: false,
        code: delivery.reason,
        message: delivery.reason === 'disabled' ? USER_MESSAGES.disabled : USER_MESSAGES.transport,
      },
      `delivery-${delivery.reason}`,
    );
  }

  const body = delivery.dryRun
    ? { ok: true, dryRun: true, message: USER_MESSAGES.dryRun }
    : { ok: true, message: def.successMessage };
  if (validKey(idem)) deps.store.set(idem, { status: 200, body }, now());
  return done(200, body, delivery.dryRun ? 'accepted-dry-run' : 'accepted');
}

/** Mezőnevek listája (a kliensoldali hibamegjelenítéshez) */
export function fieldNames(id: FormId): string[] {
  return allFields(forms[id]).map((f) => f.name);
}
