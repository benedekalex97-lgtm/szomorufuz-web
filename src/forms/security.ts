/**
 * Űrlap-védelem (audit SZF-002): Origin-ellenőrzés, méretkorlát, rate limit,
 * honeypot + kitöltési idő, dupla beküldés elleni idempotencia-kulcs.
 *
 * FONTOS: a rate limit és az idempotencia-tár a futó szerverfüggvény memóriájában él.
 * Vercel serverless környezetben példányonként külön tár van, ezért ez „legjobb
 * erőfeszítés” védelem. Élesítés előtt javasolt egy megosztott tár (pl. Upstash Redis)
 * vagy a Vercel Firewall rate-limit szabálya – lásd docs/audit-remediation-2026-11.md.
 */

export const LIMITS = {
  /** A teljes kérés legnagyobb mérete bájtban */
  maxBodyBytes: 32 * 1024,
  /** Ennyi beküldés engedélyezett kliensenként az időablakon belül */
  rateLimit: 5,
  rateWindowMs: 10 * 60 * 1000,
  /** Ennél gyorsabb kitöltés robotra utal (ms) */
  minFillMs: 2500,
  idempotencyTtlMs: 10 * 60 * 1000,
  storeMaxEntries: 2000,
} as const;

/** Rejtett technikai mezők nevei (az ügyféladatoktól elkülönítve) */
export const META = {
  form: '_urlap',
  service: '_szolgaltatas',
  page: '_oldal',
  key: '_kulcs',
  startedAt: '_t',
  honeypot: 'weboldal',
  /** „Elolvastam az adatkezelési tájékoztatót” jelölőnégyzet */
  notice: '_tajekoztato',
} as const;

/**
 * Az Origin (vagy annak hiányában a Referer) a kérés saját originjével, vagy az
 * engedélyezett listával egyezik-e. Süti/munkamenet nincs, így ez a CSRF-védelem.
 */
export function originAllowed(request: Request, allowed: readonly string[]): boolean {
  const self = new URL(request.url).origin;
  const header = request.headers.get('origin') ?? refererOrigin(request.headers.get('referer'));
  if (!header || header === 'null') return false;
  return header === self || allowed.includes(header);
}

function refererOrigin(ref: string | null): string | null {
  if (!ref) return null;
  try {
    return new URL(ref).origin;
  } catch {
    return null;
  }
}

/** Egyszerű csúszóablakos korlátozó, kulcsonként. */
export class RateLimiter {
  readonly #hits = new Map<string, number[]>();
  /** Teszteléshez: hány kliens kulcsa van jelenleg memóriában */
  get size(): number {
    return this.#hits.size;
  }
  constructor(
    private readonly limit: number = LIMITS.rateLimit,
    private readonly windowMs: number = LIMITS.rateWindowMs,
  ) {}

  /** true = engedélyezett (és a találat rögzítve) */
  hit(key: string, now: number): { allowed: boolean; retryAfterS: number } {
    // Lejárt kulcsok törlése: a kivonat legfeljebb az időablak hosszáig marad memóriában.
    for (const [k, hits] of this.#hits) {
      const last = hits[hits.length - 1];
      if (last === undefined || now - last >= this.windowMs) this.#hits.delete(k);
    }
    const recent = (this.#hits.get(key) ?? []).filter((t) => now - t < this.windowMs);
    if (recent.length >= this.limit) {
      const oldest = recent[0] ?? now;
      this.#hits.set(key, recent);
      return { allowed: false, retryAfterS: Math.ceil((this.windowMs - (now - oldest)) / 1000) };
    }
    recent.push(now);
    this.#hits.set(key, recent);
    if (this.#hits.size > LIMITS.storeMaxEntries) {
      const first = this.#hits.keys().next().value;
      if (first !== undefined) this.#hits.delete(first);
    }
    return { allowed: true, retryAfterS: 0 };
  }
}

export interface StoredResult {
  status: number;
  body: Record<string, unknown>;
}

/** Idempotencia-tár: ugyanazzal a kulccsal érkező ismételt beküldés nem küld új e-mailt. */
export class IdempotencyStore {
  readonly #items = new Map<string, { at: number; result: StoredResult | 'pending' }>();

  get(key: string, now: number): StoredResult | 'pending' | undefined {
    const item = this.#items.get(key);
    if (!item) return undefined;
    if (now - item.at > LIMITS.idempotencyTtlMs) {
      this.#items.delete(key);
      return undefined;
    }
    return item.result;
  }

  set(key: string, result: StoredResult | 'pending', now: number): void {
    this.#items.set(key, { at: now, result });
    if (this.#items.size > LIMITS.storeMaxEntries) {
      const first = this.#items.keys().next().value;
      if (first !== undefined) this.#items.delete(first);
    }
  }

  delete(key: string): void {
    this.#items.delete(key);
  }
}

const KEY_RE = /^[a-zA-Z0-9-]{16,64}$/;
export function validKey(key: string | undefined): key is string {
  return typeof key === 'string' && KEY_RE.test(key);
}

/** Robotgyanú: kitöltött honeypot vagy irreálisan gyors kitöltés. */
export function looksLikeBot(
  honeypot: string | undefined,
  startedAt: string | undefined,
  now: number,
): boolean {
  if (honeypot && honeypot.trim() !== '') return true;
  const t = Number(startedAt);
  if (!startedAt || !Number.isFinite(t)) return false; // JS nélküli kitöltés: nincs időbélyeg
  const elapsed = now - t;
  return elapsed >= 0 && elapsed < LIMITS.minFillMs;
}

/** Az IP-címet nem tároljuk: csak egy egyirányú, sózott kivonat lesz a korlátozó kulcsa. */
export async function clientKey(ip: string | undefined, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip ?? 'ismeretlen'}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest).slice(0, 12)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Az oldal-útvonal csak belső, egyszerű útvonal lehet (e-mailben jelenik meg). */
export function safePagePath(p: string | undefined): string {
  return p && /^\/[a-z0-9\-/]{0,120}$/.test(p) ? p : '';
}
