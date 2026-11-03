// Bemutató-képernyőképek a lefordított oldalról (dist/).
// Használat: npm run build && node scripts/qa/screenshots.mjs
// Kimenet: docs/screenshots/demo/<oldal>-<szélesség>-{fold,full}.png
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { extname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const DIST = resolve('dist/client');
const OUT = resolve('docs/screenshots/content');
const PAGES = [
  ['home', '/', [320, 375, 390, 768, 1024, 1440]],
  ['teendok', '/teendok-halaleset-utan/', [390, 1440]],
  ['szolgaltatasok', '/szolgaltatasok/', [390, 1440]],
  ['hamvasztasos-temetes', '/hamvasztasos-temetes/', [390, 1440]],
  ['koporsos-temetes', '/koporsos-temetes/', [390, 1440]],
  ['arak', '/arak/', [390, 1440]],
  ['arajanlat', '/arajanlat-keres-itt/', [390, 1440]],
  ['kapcsolat', '/elerhetoseg/', [390, 1440]],
  ['szukseges-iratok', '/szukseges-iratok/', [390, 1440]],
  ['ravatalozo-terem', '/ravatalozo-terem/', [390, 1440]],
];
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

mkdirSync(OUT, { recursive: true });
const server = createServer((req, res) => {
  let file = join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    res.end(readFileSync(join(DIST, '404.html')));
    return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();

for (const [name, path, widths] of PAGES) {
  for (const width of widths) {
    // Mozgáscsökkentés: a fűz-animáció végállapota látszik a képen
    const page = await browser.newPage({
      viewport: { width, height: width < 800 ? 844 : 900 },
      reducedMotion: 'reduce',
    });
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(OUT, `${name}-${width}-fold.png`) });
    await page.screenshot({ path: join(OUT, `${name}-${width}-full.png`), fullPage: true });
    await page.close();
  }
}
// Nyitott mobilmenü
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.locator('[data-menu-toggle]').click();
  await page.waitForTimeout(500); // a menü előtűnési animációja
  await page.screenshot({ path: join(OUT, 'mobile-menu-390.png') });
  await page.close();
}
await browser.close();
server.close();
console.log(`Képernyőképek: ${OUT}`);
