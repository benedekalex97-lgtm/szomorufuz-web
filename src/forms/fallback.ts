/** JavaScript nélküli beküldés válaszoldala – minden szöveg escape-elve. */
import type { HandlerResult } from './handler';

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c,
  );

export function renderFallbackPage(result: HandlerResult): string {
  const ok = result.body['ok'] === true;
  const message = typeof result.body['message'] === 'string' ? result.body['message'] : '';
  const errors = result.body['errors'];
  const list =
    errors && typeof errors === 'object'
      ? `<ul>${Object.values(errors as Record<string, string>)
          .map((e) => `<li>${esc(e)}</li>`)
          .join('')}</ul>`
      : '';
  return `<!doctype html><html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${ok ? 'Köszönjük' : 'Hiba az űrlapon'} | Szomorúfűz Temetkezés</title><style>body{font:1.0625rem/1.6 system-ui,sans-serif;color:#292825;background:#f7f5f0;max-width:40rem;margin:0 auto;padding:2rem 1rem}a{color:#6e5b47}h1{font-weight:400}</style></head><body><main><h1>${ok ? 'Köszönjük' : 'Az űrlapot nem tudtuk elküldeni'}</h1><p>${esc(message)}</p>${list}<p>${ok ? '<a href="/">Vissza a főoldalra</a>' : '<a href="javascript:history.back()">Vissza az űrlaphoz</a> (a beírt adatok a legtöbb böngészőben megmaradnak)'}</p><p>Telefon: <a href="tel:+36308471915">+36 30 847 1915</a></p></main></body></html>`;
}
