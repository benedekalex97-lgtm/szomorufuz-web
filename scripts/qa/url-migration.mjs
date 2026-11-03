// URL-migráció ellenőrzése (audit SZF-007) a lefordított kimeneten, helyi emulátorral.
// Minden régi URL: 200, vagy EGYETLEN 301 egy létező oldalra; a horgony létezik a célon;
// semmi nem irányít a főoldalra. Kimenet: docs/qa/url-migration.json és .md táblázat.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { startServer } from './vercel-local.mjs';

// [régi URL, megjegyzés]
const LEGACY = [
  ['/', 'Főoldal'],
  ['/teendok-halaleset-utan/', ''],
  ['/szukseges-iratok/', ''],
  ['/hamvasztasos-temetes/', ''],
  ['/hamvasztas-urnakiadas/', ''],
  ['/hamvak-hazavitele/', ''],
  ['/hamvasztas-menete/', ''],
  ['/hamvak-temetese/', ''],
  ['/hamvak-szorasa-temeto/', ''],
  ['/hamvak-szorasa-dunaba/', ''],
  ['/koporsos-temetes/', ''],
  ['/ravatalozo-terem/', ''],
  ['/polgari-bucsuztatas/', ''],
  ['/fiumei-uti-temeto/', ''],
  ['/szocialis-temetes/', ''],
  ['/argarancia/', ''],
  ['/arajanlat-keres-itt/', ''],
  ['/tajekoztatas-keres/', ''],
  ['/elerhetoseg/', ''],
  ['/ceginformaciok/', ''],
  ['/adatkezeles/', ''],
  ['/jogi-nyilatkozat/', ''],
  ['/urnak/', ''],
  ['/jogszabalyok/', ''],
  ['/gyakori-kerdesek/', ''],
  ['/arajanlatkeres/', 'duplikátum'],
  ['/irodak/', ''],
  ['/suti-tajekoztato/', ''],
  ['/ravatalozo-galeria/', ''],
  ['/termek-adatlapok/', ''],
  ['/hasznos-linkek/', ''],
  // SZF-007: korábban 404-et adó URL-ek
  ['/sirjelzo/', 'SZF-007'],
  ['/textiliak/', 'SZF-007'],
  ['/visszajelzes-kuldese/', 'SZF-007 / SZF-012'],
  ['/termek-adatlapok/fejfa-sephia-kezzel-festett-femurna-0102001/517/', 'SZF-007 termékadatlap'],
  ['/termek-adatlapok/alkonyat-sephia-kezzel-festett-urna-0102002/1312/', 'SZF-007 termékadatlap'],
  ['/termek-adatlapok/cedrus-sephia-kezzel-festett-femurna-0102003/1313/', 'SZF-007 termékadatlap'],
  ['/termek-adatlapok/csend-sephia-kezzel-festett-femurna-0102004/1317/', 'SZF-007 termékadatlap'],
  ['/termek-adatlapok/erdo-sephia-kezzel-festett-femurna-0102005/1318/', 'SZF-007 termékadatlap'],
  ['/termek-adatlapok/liliom-sephia-kezzel-festett-femurna-0102006/1319/', 'SZF-007 termékadatlap'],
  [
    '/termek-adatlapok/vizpart-sephia-kezzel-festett-femurna-0102007/1320/',
    'SZF-007 termékadatlap',
  ],
  [
    '/jogszabalyok/1999-evi-xliii-torveny-a-temetokrol-es-a-temetkezesrol/24177/',
    'SZF-007 jogszabály',
  ],
  [
    '/jogszabalyok/145-1999-x-1-korm-rendelet-a-temetokrol-es-a-temetkezesrol/24178/',
    'SZF-007 jogszabály',
  ],
  [
    '/jogszabalyok/146-1999-x-1-korm-rendelet-a-nemzeti-kegyeleti-bizottsag-szervezeterol/24179/',
    'SZF-007 jogszabály',
  ],
  ['/jogszabalyok/2005-evi-xxi-torveny/24180/', 'SZF-007 jogszabály'],
  ['/jogszabalyok/34-1999-ix-24-bm-eum-im-egyuttes-rendelet/24181/', 'SZF-007 jogszabály'],
  ['/jogszabalyok/2013-evi-cxxxviii-torveny/24182/', 'SZF-007 jogszabály'],
  ['/jogszabalyok/379-2013-x-25-korm-rendelet/24183/', 'SZF-007 jogszabály'],
];

const { server, base } = await startServer();
const rows = [];
const fail = [];
for (const [path, note] of LEGACY) {
  const r1 = await fetch(base + path, { redirect: 'manual' });
  const row = {
    path,
    note,
    status: r1.status,
    location: r1.headers.get('location'),
    final: null,
    finalStatus: null,
    anchor: null,
  };
  if (r1.status === 200) {
    row.final = path;
    row.finalStatus = 200;
  } else if ([301, 308].includes(r1.status) && row.location) {
    const target = new URL(row.location, base);
    const r2 = await fetch(target, { redirect: 'manual' });
    row.final = target.pathname + target.hash;
    row.finalStatus = r2.status;
    if (r2.status !== 200) fail.push(`${path}: lánc vagy hibás cél (${r2.status})`);
    if (target.hash) {
      const html = await r2.text();
      const id = decodeURIComponent(target.hash.slice(1));
      row.anchor = html.includes(`id="${id}"`);
      if (!row.anchor) fail.push(`${path}: hiányzó horgony ${target.hash}`);
    }
    if (target.pathname === '/' && path !== '/') fail.push(`${path}: a főoldalra irányít`);
    if (r1.status !== 301) fail.push(`${path}: nem 301 (${r1.status})`);
  } else {
    fail.push(`${path}: HTTP ${r1.status}`);
  }
  rows.push(row);
}
// Perjel nélküli változat: legfeljebb két ugrás (308 perjel + 301)
const noSlash = await fetch(`${base}/sirjelzo`, { redirect: 'manual' });
if (noSlash.status !== 308) fail.push('/sirjelzo (perjel nélkül): nem 308');
// Ismeretlen URL valódi 404
const nf = await fetch(`${base}/nincs-ilyen-oldal/`, { redirect: 'manual' });
if (nf.status !== 404) fail.push('ismeretlen URL nem 404');
server.close();

mkdirSync(resolve('docs/qa'), { recursive: true });
writeFileSync(
  resolve('docs/qa/url-migration.json'),
  JSON.stringify({ rows, failures: fail }, null, 2),
);
const md = [
  '| Régi URL | Válasz | Új cél | Horgony | Megjegyzés |',
  '|---|---|---|---|---|',
  ...rows.map(
    (r) =>
      `| \`${r.path}\` | ${r.status} | ${r.status === 200 ? '(változatlan)' : `\`${r.final}\` (${r.finalStatus})`} | ${r.anchor === null ? '–' : r.anchor ? 'van' : 'HIÁNYZIK'} | ${r.note} |`,
  ),
].join('\n');
writeFileSync(resolve('docs/qa/url-migration.md'), `${md}\n`);
console.log(`${rows.length} régi URL, ${fail.length} hiba`);
if (fail.length) {
  console.log('HIBÁK:\n- ' + fail.join('\n- '));
  process.exit(1);
}
