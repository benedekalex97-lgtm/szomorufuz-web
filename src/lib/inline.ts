/**
 * Minimális, biztonságos inline formázó a tartalmi szövegekhez:
 *  - [szöveg](url) → link (belső vagy külső; külső új lapon)
 *  - **szöveg** → <strong>
 *  - magyar telefonszám (+36 …) → kattintható tel: link (a megjelenített szám = hívott szám)
 * Minden más HTML-ként escape-elve.
 */
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const PHONE = /\+36[ \d-]{8,14}\d/g;

export const telFromDisplay = (display: string) => `tel:+${display.replace(/\D/g, '')}`;

function linkPhones(html: string): string {
  // Csak a linkeken kívüli szövegrészekben
  return html
    .split(/(<a [^>]*>.*?<\/a>)/g)
    .map((part) =>
      part.startsWith('<a ')
        ? part
        : part.replace(PHONE, (m) => `<a href="${telFromDisplay(m)}" class="tel">${m}</a>`),
    )
    .join('');
}

export function inline(text: string): string {
  let html = escape(text);
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) => {
    const external = /^https?:\/\//.test(href);
    return external
      ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}<span class="visually-hidden"> (új lapon nyílik)</span></a>`
      : `<a href="${href}">${label}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return linkPhones(html);
}

/** Árajánlatkérő e-mail (mailto) – az élő oldal űrlapjának kérdései alapján. */
export function quoteMailto(email: string): string {
  const subject = 'Árajánlat kérés';
  const body = [
    'Tisztelt Szomorúfűz Temetkezés!',
    '',
    'Kérem, küldjenek árajánlatot az alábbiak szerint.',
    '',
    'Temetés típusa (hamvasztásos / koporsós):',
    'A hamvak vagy a koporsó elhelyezése (budapesti temető / budapesti altemplom / vidéki temető / a hamvak hazavitele / egyéb):',
    'A temető neve, ha ismert:',
    'Van-e már sírhely (igen / új sírhelyet vásárolok / szórást választok / nem tudom):',
    'Hol történt a haláleset (kórházban / lakáson / külföldön / egyéb helyen):',
    'Hol található jelenleg az elhunyt:',
    'Egyéb kérés, megjegyzés:',
    '',
    'Az ajánlatot kérem (e-mailben / telefonos visszahívással):',
    'Név:',
    'Telefonszám:',
  ].join('\n');
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
