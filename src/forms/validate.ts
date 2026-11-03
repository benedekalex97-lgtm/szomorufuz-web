/**
 * Űrlap-ellenőrzés – tiszta függvények, a kliens és a szerver is ezt használja.
 * A szerver a végső döntő: a kliensoldali ellenőrzés csak kényelmi funkció.
 */
import { allFields, type FieldDef, type FormDef, MAX } from './definitions';

export type Values = Record<string, string | string[]>;
export type Errors = Record<string, string>;

export interface ValidationResult {
  ok: boolean;
  values: Values;
  errors: Errors;
}

// Gyakorlati e-mail-minta: egy @, pont a domainben, szóköz és vezérlőkarakter nélkül.
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/u;
// Telefon: számjegy, szóköz, +, -, /, zárójel; legalább 6, legfeljebb 15 számjegy.
const TEL_RE = /^[+\d\s()/-]+$/;
// Vezérlőkarakterek (a sortörés kivételével – azt mezőtípus szerint kezeljük)
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function maxLengthOf(f: FieldDef): number {
  return f.maxLength ?? (f.kind === 'textarea' ? MAX.textarea : MAX.text);
}

/** Szöveg normalizálása: vezérlőkarakterek ki, egysoros mezőben sortörés sem marad. */
export function clean(raw: string, multiline: boolean): string {
  let s = raw.normalize('NFC').replace(CONTROL_RE, '');
  s = multiline ? s.replace(/\r\n?/g, '\n') : s.replace(/[\r\n]+/g, ' ');
  return s.trim();
}

export function isEmail(v: string): boolean {
  return v.length <= 254 && EMAIL_RE.test(v);
}

export function isPhone(v: string): boolean {
  const digits = v.replace(/\D/g, '').length;
  return TEL_RE.test(v) && digits >= 6 && digits <= 15;
}

export const MESSAGES = {
  required: 'Kérjük, töltse ki ezt a mezőt.',
  requiredChoice: 'Kérjük, válasszon a lehetőségek közül.',
  email: 'Kérjük, érvényes e-mail címet adjon meg (például nev@example.com).',
  tel: 'Kérjük, érvényes telefonszámot adjon meg, körzetszámmal együtt.',
  tooLong: (n: number) => `Legfeljebb ${n} karakter adható meg.`,
  option: 'Kérjük, a felsorolt lehetőségek közül válasszon.',
} as const;

/**
 * @param input  mezőnév → nyers érték(ek). Ismeretlen mezőket figyelmen kívül hagy.
 */
export function validate(
  def: FormDef,
  input: Record<string, string | string[] | undefined>,
): ValidationResult {
  const values: Values = {};
  const errors: Errors = {};

  for (const f of allFields(def)) {
    const raw = input[f.name];
    if (f.kind === 'checkboxes') {
      const list = (Array.isArray(raw) ? raw : raw ? [raw] : [])
        .map((v) => clean(v, false))
        .filter(Boolean);
      const unique = [...new Set(list)];
      if (unique.some((v) => !f.options?.includes(v))) errors[f.name] = MESSAGES.option;
      else if (f.required && unique.length === 0) errors[f.name] = MESSAGES.requiredChoice;
      if (unique.length) values[f.name] = unique;
      continue;
    }
    const first = Array.isArray(raw) ? raw[0] : raw;
    const v = clean(first ?? '', f.kind === 'textarea');
    if (!v) {
      if (f.required)
        errors[f.name] =
          f.kind === 'radio' || f.kind === 'select' ? MESSAGES.requiredChoice : MESSAGES.required;
      continue;
    }
    const max = maxLengthOf(f);
    if (v.length > max) errors[f.name] = MESSAGES.tooLong(max);
    else if ((f.kind === 'radio' || f.kind === 'select') && !f.options?.includes(v))
      errors[f.name] = MESSAGES.option;
    else if (f.kind === 'email' && !isEmail(v)) errors[f.name] = MESSAGES.email;
    else if (f.kind === 'tel' && !isPhone(v)) errors[f.name] = MESSAGES.tel;
    values[f.name] = v;
  }

  return { ok: Object.keys(errors).length === 0, values, errors };
}
