// Build utáni lépés: a vercel.json „headers” szabályait a Vercel Build Output API
// routing-konfigurációjába (.vercel/output/config.json) is beírja.
// Ok: az @astrojs/vercel adapter saját config.json-t ír, és nem garantált, hogy a
// vercel.json fejlécei ilyenkor érvényesülnek. A noindex (X-Robots-Tag) KÖTELEZŐ.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const CONFIG = '.vercel/output/config.json';
if (!existsSync(CONFIG)) {
  console.log('[vercel-headers] nincs .vercel/output – kihagyva');
  process.exit(0);
}
const vercelJson = JSON.parse(readFileSync('vercel.json', 'utf8'));
const config = JSON.parse(readFileSync(CONFIG, 'utf8'));

// A vercel.json „source” mintái itt csak „/előtag/(.*)” alakúak – ezt alakítjuk regexszé.
const toSrc = (source) => {
  if (!/^\/[a-z0-9/_-]*\(\.\*\)$/.test(source)) {
    throw new Error(`[vercel-headers] nem támogatott minta: ${source}`);
  }
  return `^${source.replace('(.*)', '(.*)')}$`;
};

const headerRoutes = (vercelJson.headers ?? []).map((rule) => ({
  src: toSrc(rule.source),
  headers: Object.fromEntries(rule.headers.map((h) => [h.key, h.value])),
  continue: true,
}));

// Idempotens: a korábban beszúrt (azonos) szabályokat nem duplikáljuk.
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
config.routes = [
  ...headerRoutes,
  ...config.routes.filter((r) => !headerRoutes.some((h) => same(h, r))),
];
writeFileSync(CONFIG, JSON.stringify(config, null, 2));

const robots = headerRoutes.find((r) => r.headers['X-Robots-Tag']);
if (!robots || !/noindex/.test(robots.headers['X-Robots-Tag'])) {
  console.error('[vercel-headers] HIBA: hiányzik az X-Robots-Tag noindex szabály');
  process.exit(1);
}
console.log(`[vercel-headers] ${headerRoutes.length} fejlécszabály beírva a ${CONFIG} fájlba`);
