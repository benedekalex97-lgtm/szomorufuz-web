/**
 * Űrlapok: validáció, szolgáltatásspecifikus mezők, szerverhibák, dupla beküldés,
 * e-mail-adapter. Kizárólag szintetikus tesztadatok (nem valódi személyek).
 */
import { describe, expect, it } from 'vitest';

import { resolveMode } from '@/forms/config';
import { allFields, forms, quoteHref, serviceById, serviceForms } from '@/forms/definitions';
import { disabledAdapter, dryRunAdapter, memoryAdapter, smtpAdapter } from '@/forms/delivery';
import { composeMessage, handleSubmission, type HandlerDeps } from '@/forms/handler';
import { IdempotencyStore, LIMITS, RateLimiter } from '@/forms/security';
import { clean, isEmail, isPhone, validate } from '@/forms/validate';

const ORIGIN = 'https://teszt.example';
const T0 = 1_800_000_000_000;

/** Szintetikus, érvényes kitöltés a kapcsolat űrlaphoz */
const contact = {
  _urlap: 'kapcsolat',
  _tajekoztato: 'igen',
  nev: 'Teszt Elek',
  email: 'teszt@example.com',
  telefon: '+36 30 000 0000',
  kerdes: 'Tesztkérdés',
};

function req(
  body: Record<string, string | string[]>,
  init: { origin?: string | null; type?: string; raw?: string } = {},
) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(body))
    (Array.isArray(v) ? v : [v]).forEach((x) => params.append(k, x));
  const headers: Record<string, string> = {
    'content-type': init.type ?? 'application/x-www-form-urlencoded',
  };
  if (init.origin !== null) headers['origin'] = init.origin ?? ORIGIN;
  return new Request(`${ORIGIN}/api/urlap/`, {
    method: 'POST',
    headers,
    body: init.raw ?? params.toString(),
  });
}

function deps(over: Partial<HandlerDeps> = {}): HandlerDeps & { logs: Record<string, unknown>[] } {
  const logs: Record<string, unknown>[] = [];
  let t = T0;
  return {
    adapter: memoryAdapter(),
    limiter: new RateLimiter(),
    store: new IdempotencyStore(),
    allowedOrigins: [],
    ip: '192.0.2.1',
    salt: 'teszt',
    now: () => (t += 10),
    log: (e) => logs.push(e),
    logs,
    ...over,
  };
}

describe('validáció', () => {
  it('kötelező mezők, e-mail és telefon formátum', () => {
    const r = validate(forms.kapcsolat, { nev: '', email: 'rossz', telefon: 'abc' });
    expect(r.ok).toBe(false);
    expect(Object.keys(r.errors).sort()).toEqual(['email', 'nev', 'telefon']);
  });
  it('érvényes kitöltés', () => {
    const r = validate(forms.kapcsolat, contact);
    expect(r.ok).toBe(true);
    expect(r.values['nev']).toBe('Teszt Elek');
  });
  it('csak a felsorolt opció fogadható el (rádió, jelölőnégyzet, lista)', () => {
    const base = {
      temetes_tipusa: 'Hamvasztásos',
      halaleset_helye: 'Kórházban',
      elhunyt_helye: 'Kórházban',
    };
    expect(
      validate(forms.arajanlat, { ...base, temetes_tipusa: 'Valami más' }).errors['temetes_tipusa'],
    ).toBeDefined();
    expect(
      validate(forms.ravatalozo, { szolgaltatasok: ['Ravatalozó terem', 'Hamis'] }).errors[
        'szolgaltatasok'
      ],
    ).toBeDefined();
    expect(validate(forms.termek, { termek: 'Nem létező urna' }).errors['termek']).toBeDefined();
  });
  it('hosszkorlát', () => {
    expect(validate(forms.kapcsolat, { ...contact, nev: 'x'.repeat(201) }).errors['nev']).toMatch(
      /200/,
    );
    expect(
      validate(forms.kapcsolat, { ...contact, kerdes: 'x'.repeat(3001) }).errors['kerdes'],
    ).toMatch(/3000/);
  });
  it('fejléc-injekció: egysoros mezőből a sortörés eltűnik, vezérlőkarakter is', () => {
    expect(clean('a\r\nBcc: x@example.com', false)).toBe('a Bcc: x@example.com');
    expect(clean('a\u0000b\u0007c', true)).toBe('abc');
    expect(isEmail('a@example.com\r\nBcc: b@example.com')).toBe(false);
  });
  it('telefonszám', () => {
    expect(isPhone('+36 30 847 1915')).toBe(true);
    expect(isPhone('06-1/919-0170')).toBe(true);
    expect(isPhone('12345')).toBe(false);
    expect(isPhone('<script>')).toBe(false);
  });
});

describe('szolgáltatásspecifikus űrlapok', () => {
  it('minden szolgáltatás létező űrlapra mutat, az előkitöltés létező opció', () => {
    for (const s of serviceForms) {
      const def = forms[s.form];
      for (const [name, value] of Object.entries(s.prefill ?? {})) {
        const field = allFields(def).find((f) => f.name === name);
        expect(field?.options).toContain(value);
      }
    }
  });
  it('az eredeti űrlapok kötelező kérdései megvannak', () => {
    const names = (id: keyof typeof forms) => allFields(forms[id]).map((f) => f.name);
    expect(names('arajanlat')).toEqual(
      expect.arrayContaining([
        'temetes_tipusa',
        'nyugalom_helye',
        'nyugalom_hely_neve',
        'sirhely',
        'sirhely_tipusa',
        'halaleset_helye',
        'elhunyt_helye',
        'elhunyt_helye_neve',
        'nev',
        'email',
        'telefon',
        'valasz_mod',
        'elhunyt_neve',
        'megjegyzes',
      ]),
    );
    expect(names('kapcsolat')).toEqual(['nev', 'email', 'telefon', 'kerdes', 'elhunyt_neve']);
    expect(names('visszahivas')).toEqual(['nev', 'telefon', 'idopont', 'tema']);
    expect(names('termek')).toEqual(
      expect.arrayContaining(['termek', 'email', 'telefon', 'uzenet']),
    );
    expect(forms.termek.sections[0]?.fields[0]?.options).toHaveLength(7);
  });
  it('CTA-hivatkozás a szolgáltatás azonosítójával', () => {
    expect(quoteHref('hamvak-hazavitele')).toBe(
      '/arajanlat-keres-itt/?szolgaltatas=hamvak-hazavitele#urlap',
    );
    expect(serviceById('hamvak-szorasa-dunaba')?.form).toBe('szoras');
  });
  it('szolgáltatás és űrlap eltérése elutasítva', async () => {
    const r = await handleSubmission(
      req({ ...contact, _szolgaltatas: 'koporsos-temetes' }),
      deps(),
    );
    expect(r.status).toBe(400);
  });
  it('az e-mail tárgyában nincs felhasználói adat, a szolgáltatás megjelenik', () => {
    const msg = composeMessage(
      forms.hamvasztasos,
      { nev: 'Teszt\nBcc', email: 'teszt@example.com' },
      { service: 'hamvak-hazavitele', page: '/arajanlat-keres-itt/', at: new Date(T0) },
    );
    expect(msg.subject).toBe(
      '[Weboldal] Árajánlatkérés – hamvasztásos temetés – Hamvak hazavitele',
    );
    expect(msg.replyTo).toBe('teszt@example.com');
  });
});

describe('végpont-logika', () => {
  it('sikeres beküldés: csak a kézbesítő elfogadása után 200', async () => {
    const d = deps();
    const r = await handleSubmission(req(contact), d);
    expect(r.status).toBe(200);
    expect(r.body['ok']).toBe(true);
    expect((d.adapter as ReturnType<typeof memoryAdapter>).sent).toHaveLength(1);
  });
  it('kézbesítési hiba → 502, nem siker', async () => {
    const r = await handleSubmission(req(contact), deps({ adapter: memoryAdapter(true) }));
    expect(r.status).toBe(502);
    expect(r.body['ok']).toBe(false);
  });
  it('kikapcsolt mód → 503', async () => {
    const r = await handleSubmission(req(contact), deps({ adapter: disabledAdapter }));
    expect(r.status).toBe(503);
  });
  it('dry-run: elfogadja, de jelzi, hogy nem továbbított', async () => {
    const r = await handleSubmission(req(contact), deps({ adapter: dryRunAdapter }));
    expect(r.status).toBe(200);
    expect(r.body['dryRun']).toBe(true);
  });
  it('mezőhiba → 422 mezőnként, és az adatkezelési jelölés kötelező', async () => {
    const r = await handleSubmission(req({ _urlap: 'kapcsolat', nev: '', email: 'x' }), deps());
    expect(r.status).toBe(422);
    expect(Object.keys(r.body['errors'] as object)).toEqual(
      expect.arrayContaining(['nev', 'email', '_tajekoztato']),
    );
  });
  it('idegen Origin / hiányzó Origin → 403', async () => {
    expect(
      (await handleSubmission(req(contact, { origin: 'https://gonosz.example' }), deps())).status,
    ).toBe(403);
    expect((await handleSubmission(req(contact, { origin: null }), deps())).status).toBe(403);
  });
  it('engedélyezett külön origin elfogadva', async () => {
    const r = await handleSubmission(
      req(contact, { origin: 'https://www.budapest-temetkezes.hu' }),
      deps({ allowedOrigins: ['https://www.budapest-temetkezes.hu'] }),
    );
    expect(r.status).toBe(200);
  });
  it('méretkorlát → 413, rossz tartalomtípus → 415, ismeretlen űrlap → 400', async () => {
    expect(
      (await handleSubmission(req({}, { raw: 'a='.padEnd(LIMITS.maxBodyBytes + 10, 'x') }), deps()))
        .status,
    ).toBe(413);
    expect((await handleSubmission(req(contact, { type: 'text/plain' }), deps())).status).toBe(415);
    expect((await handleSubmission(req({ ...contact, _urlap: 'nincs' }), deps())).status).toBe(400);
  });
  it('JSON törzs is elfogadott', async () => {
    const r = await handleSubmission(
      req({}, { type: 'application/json', raw: JSON.stringify(contact) }),
      deps(),
    );
    expect(r.status).toBe(200);
  });
  it('rate limit → 429 Retry-After fejléccel', async () => {
    const d = deps({ adapter: dryRunAdapter });
    for (let i = 0; i < LIMITS.rateLimit; i++)
      expect((await handleSubmission(req(contact), d)).status).toBe(200);
    const r = await handleSubmission(req(contact), d);
    expect(r.status).toBe(429);
    expect(r.headers?.['Retry-After']).toBeDefined();
  });
  it('honeypot / túl gyors kitöltés: látszólagos siker, de nincs küldés', async () => {
    const d = deps();
    const r1 = await handleSubmission(req({ ...contact, weboldal: 'http://spam.example' }), d);
    const r2 = await handleSubmission(req({ ...contact, _t: String(T0) }), d);
    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
    expect((d.adapter as ReturnType<typeof memoryAdapter>).sent).toHaveLength(0);
  });
  it('dupla beküldés ugyanazzal a kulccsal: egyetlen e-mail', async () => {
    const d = deps();
    const key = 'teszt-kulcs-1234567890';
    const r1 = await handleSubmission(req({ ...contact, _kulcs: key }), d);
    const r2 = await handleSubmission(req({ ...contact, _kulcs: key }), d);
    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
    expect(r2.body['duplicate']).toBe(true);
    expect((d.adapter as ReturnType<typeof memoryAdapter>).sent).toHaveLength(1);
  });
  it('párhuzamos dupla beküldés: a második 409', async () => {
    let release: () => void = () => {};
    const slow = {
      mode: 'smtp' as const,
      send: () =>
        new Promise<{ accepted: true; dryRun: boolean }>(
          (res) => (release = () => res({ accepted: true, dryRun: false })),
        ),
    };
    const d = deps({ adapter: slow });
    const key = 'parhuzamos-kulcs-12345';
    const p1 = handleSubmission(req({ ...contact, _kulcs: key }), d);
    await new Promise((r) => setTimeout(r, 5));
    const r2 = await handleSubmission(req({ ...contact, _kulcs: key }), d);
    release();
    expect(r2.status).toBe(409);
    expect((await p1).status).toBe(200);
  });
  it('a napló nem tartalmaz személyes adatot', async () => {
    const d = deps();
    await handleSubmission(req(contact), d);
    const text = JSON.stringify(d.logs);
    expect(text).not.toContain('Teszt Elek');
    expect(text).not.toContain('teszt@example.com');
    expect(text).not.toContain('192.0.2.1');
  });
});

describe('rate limiter memória', () => {
  it('a lejárt kulcsok az időablak után törlődnek', () => {
    const l = new RateLimiter(5, 1000);
    l.hit('a', 0);
    l.hit('b', 500);
    expect(l.size).toBe(2);
    l.hit('c', 1600);
    expect(l.size).toBe(1);
  });
});

describe('e-mail adapter és üzemmód', () => {
  it('hiányos SMTP-konfiguráció → nem küld (config)', async () => {
    const r = await smtpAdapter({ host: 'smtp.example', port: 587 }).send({
      subject: 's',
      text: 't',
    });
    expect(r).toEqual({ accepted: false, reason: 'config' });
  });
  it('alapértelmezett mód: production → disabled, preview → dry-run', () => {
    expect(resolveMode(undefined, 'production', false)).toBe('disabled');
    expect(resolveMode(undefined, undefined, false)).toBe('disabled');
    expect(resolveMode(undefined, 'preview', false)).toBe('dry-run');
    expect(resolveMode('smtp', 'preview', false)).toBe('smtp');
  });
});
