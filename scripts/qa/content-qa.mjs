// Tartalmi QA a lefordított oldalon (dist/):
//  1. minden tel: link hívott száma = a megjelenített szám
//  2. nincs prototípus-felirat a publikus oldalakon
//  3. az irodacímek és telefonszámok egyeznek a forrással (content/data/contact.ts)
//  4. az árajánlatkérés működik (tel: + előkitöltött mailto)
//  5. a régi oldal fontos URL-jei mind elérhetők az új oldalon
// Használat: npm run build && node scripts/qa/content-qa.mjs
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist');
const files = [];
const walk = (d) =>
  readdirSync(d).forEach((f) => {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  });
walk(DIST);

const fail = [];
const report = { pages: files.length, tel: { total: 0, mismatches: [] }, banned: [], checks: {} };
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
const text = (h) =>
  strip(h)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

// 1. tel: linkek
for (const f of files) {
  const html = strip(readFileSync(f, 'utf8'));
  for (const [, href, inner] of html.matchAll(/<a[^>]*href="tel:([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    report.tel.total++;
    const visible = inner
      .replace(/<span class="visually-hidden">[\s\S]*?<\/span>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/^\D*?(?=\+|\d)/, '');
    const digits = (visible.match(/\+?[\d\s-]{8,}/) ?? [''])[0].replace(/\D/g, '');
    const hrefDigits = href.replace(/\D/g, '');
    if (!digits || digits !== hrefDigits) {
      report.tel.mismatches.push({ page: f.slice(DIST.length), href, visible: visible.trim() });
    }
  }
}
if (report.tel.mismatches.length) fail.push(`${report.tel.mismatches.length} hibás tel: link`);

// 1/b. link nélküli telefonszám a látható szövegben
report.tel.unlinked = [];
for (const f of files) {
  const html = strip(readFileSync(f, 'utf8')).replace(
    /<a[^>]*href="tel:[^"]+"[^>]*>[\s\S]*?<\/a>/g,
    ' ',
  );
  const t = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
  for (const m of t.matchAll(/\+36[\d\s()-]{8,}\d/g)) {
    report.tel.unlinked.push({ page: f.slice(DIST.length), text: m[0] });
  }
}
if (report.tel.unlinked.length) fail.push(`${report.tel.unlinked.length} link nélküli telefonszám`);

// 2. tiltott feliratok (a belső /stilus/ oldal kivételével)
const BANNED = [
  'Bemutatóverzió',
  'Demo',
  'Jóváhagyásra vár',
  'Tesztoldal',
  'Mintatartalom',
  'Hamarosan',
  'Ellenőrizetlen',
];
for (const f of files) {
  if (f.includes('/stilus/')) continue;
  const t = text(readFileSync(f, 'utf8'));
  for (const word of BANNED) {
    if (new RegExp(`\\b${word}\\b`).test(t))
      report.banned.push({ page: f.slice(DIST.length), word });
  }
}
if (report.banned.length) fail.push(`Tiltott felirat: ${report.banned.length}`);

// 3. irodaadatok – a forrás (élő oldal /elerhetoseg/) szerint
const OFFICES = [
  ['1064 Budapest, Izabella utca 65.', '+36 1 919 0170', '+36 30 847 1915'],
  ['1123 Budapest, Nagyenyed utca 1.', '+36 1 919 0886', '+36 30 203 2300'],
  ['1146 Budapest, Thököly út 167.', '+36 1 919 0172', '+36 30 965 1783'],
  ['1173 Budapest, Pesti út 41/A.', '+36 1 919 0171', '+36 30 313 7920'],
  ['1204 Budapest, Szivacs utca 5.', '+36 1 919 0173', '+36 30 576 7206'],
];
const contactText = text(readFileSync(join(DIST, 'elerhetoseg/index.html'), 'utf8'));
report.checks.offices = OFFICES.map(([addr, tel, mob]) => {
  const ok = [addr, tel, mob].every((v) => contactText.includes(v));
  if (!ok) fail.push(`Iroda adat hiányzik: ${addr}`);
  return { addr, tel, mob, ok };
});
const CENTRAL = [
  '+36 30 847 1915',
  '+36 30 849 3538',
  '+36 1 919 0170',
  'budapest@temetkezes.hu',
  '8:00–16:00',
];
report.checks.central = CENTRAL.map((v) => ({ v, ok: contactText.includes(v) }));
for (const c of report.checks.central) if (!c.ok) fail.push(`Központi adat hiányzik: ${c.v}`);
const homeText = text(readFileSync(join(DIST, 'index.html'), 'utf8'));
if (!homeText.includes('+36 30 847 1915') || !homeText.includes('Szomorúfűz'))
  fail.push('Főoldal: név/központi szám hiányzik');
if (/0[–-]24/.test(homeText + contactText)) fail.push('0–24 állítás szerepel');

// 4. árajánlatkérés
const quote = readFileSync(join(DIST, 'arajanlat-keres-itt/index.html'), 'utf8');
report.checks.quote = {
  mailto: /href="mailto:budapest@temetkezes\.hu\?subject=/.test(quote),
  tel: /href="tel:\+36308471915"/.test(quote),
};
if (!report.checks.quote.mailto || !report.checks.quote.tel)
  fail.push('Árajánlatkérés: hiányzó mailto/tel');

// 5. a régi oldal fontos URL-jei
const LEGACY = [
  '/',
  '/teendok-halaleset-utan/',
  '/szukseges-iratok/',
  '/hamvasztasos-temetes/',
  '/hamvasztas-urnakiadas/',
  '/hamvak-hazavitele/',
  '/hamvasztas-menete/',
  '/hamvak-temetese/',
  '/hamvak-szorasa-temeto/',
  '/hamvak-szorasa-dunaba/',
  '/koporsos-temetes/',
  '/ravatalozo-terem/',
  '/polgari-bucsuztatas/',
  '/fiumei-uti-temeto/',
  '/szocialis-temetes/',
  '/argarancia/',
  '/arajanlat-keres-itt/',
  '/arajanlatkeres/',
  '/tajekoztatas-keres/',
  '/elerhetoseg/',
  '/ceginformaciok/',
  '/adatkezeles/',
  '/jogi-nyilatkozat/',
  '/urnak/',
  '/jogszabalyok/',
  '/gyakori-kerdesek/',
  '/ravatalozo-galeria/',
  '/termek-adatlapok/',
  '/hasznos-linkek/',
];
report.checks.legacy = LEGACY.map((u) => {
  const ok = existsSync(join(DIST, u, 'index.html'));
  if (!ok) fail.push(`Régi URL hiányzik: ${u}`);
  return { url: u, ok };
});

report.failures = fail;
writeFileSync(resolve('docs/qa/content-qa.json'), JSON.stringify(report, null, 2));
console.log(
  `Oldalak: ${report.pages}, tel: linkek: ${report.tel.total}, régi URL-ek: ${LEGACY.length}`,
);
if (fail.length) {
  console.log('HIBÁK:\n- ' + fail.join('\n- '));
  console.log(
    JSON.stringify(
      { tel: report.tel.mismatches.slice(0, 10), banned: report.banned.slice(0, 10) },
      null,
      1,
    ),
  );
  process.exit(1);
}
console.log('Minden tartalmi ellenőrzés sikeres.');
