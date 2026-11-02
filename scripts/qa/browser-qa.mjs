// Böngészős minőségellenőrzés a lefordított (dist/) oldalon.
// Használat:  npm run build && npm run qa:browser
//             node scripts/qa/browser-qa.mjs --dir dist-review --tag review   (review mód)
// Igényli: Playwright + Chromium (a fejlesztői gépen: npx playwright install chromium).
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { extname, join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .join(' ')
    .split('--')
    .filter(Boolean)
    .map((a) => a.trim().split(/\s+/)),
);
const DIST = resolve(args.dir ?? 'dist');
const TAG = args.tag ?? 'strict';
const SHOT_DIR = resolve('docs/screenshots/qa');
const REPORT = resolve(`docs/qa/browser-qa-${TAG}.json`);
const WIDTHS = [320, 375, 390, 768, 1024, 1440];
const A11Y_PAGES = [
  '/',
  '/teendok-halaleset-utan/',
  '/szukseges-iratok/',
  '/szolgaltatasok/',
  '/hamvasztasos-temetes/',
  '/koporsos-temetes/',
  '/ravatalozo-terem/',
  '/arak/',
  '/arajanlat-keres-itt/',
  '/elerhetoseg/',
  '/gyakori-kerdesek/',
  '/ceginformaciok/',
  '/nem-letezo-oldal/',
];

if (!existsSync(DIST)) {
  console.error(`Nincs ${DIST} – előbb futtasd: npm run build`);
  process.exit(1);
}
mkdirSync(SHOT_DIR, { recursive: true });
mkdirSync(resolve('docs/qa'), { recursive: true });

// ---------- Minimális statikus szerver (404.html valódi 404-es státusszal) ----------
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = join(DIST, path);
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
const BASE = `http://127.0.0.1:${server.address().port}`;

const report = { tag: TAG, base: DIST, startedAt: new Date().toISOString(), checks: {} };
const fail = [];
const browser = await chromium.launch();

// ---------- 1. Reszponzív: túlcsordulás, betűméret, érintési célpontok, konzol ----------
report.checks.responsive = [];
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const consoleErrors = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;
    const overflowing = [...document.querySelectorAll('body *')]
      .filter((el) => el.getBoundingClientRect().right > doc.clientWidth + 1)
      .filter((el) => !el.closest('.visually-hidden, .skip-link, [hidden]'))
      .slice(0, 5)
      .map(
        (el) =>
          el.tagName.toLowerCase() + (el.className ? `.${String(el.className).split(' ')[0]}` : ''),
      );
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return (
        r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && !el.closest('.visually-hidden')
      );
    };
    const texts = [
      ...document.querySelectorAll('p, li, a, span, dd, dt, button, summary, h1, h2, h3'),
    ].filter((el) => visible(el) && el.textContent.trim());
    const minFont = Math.min(...texts.map((el) => parseFloat(getComputedStyle(el).fontSize)));
    // WCAG 2.2 – 2.5.8: legalább 24×24 px (soron belüli linkek kivételek)
    const small = [...document.querySelectorAll('a, button, summary, input')]
      .filter(visible)
      .filter((el) => !el.closest('p'))
      // A kártyalink ::after rétege a teljes kártyát lefedi – a célpont maga a kártya.
      .filter((el) => !el.hasAttribute('data-stretched-link'))
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.width < 24 || r.height < 24)
      .map(
        ({ el, r }) =>
          `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${Math.round(r.width)}×${Math.round(r.height)}`,
      );
    return { overflow, overflowing, minFont, smallTargets: small, height: doc.scrollHeight };
  });

  const name = `home-${width}-full.png`;
  await page.screenshot({ path: join(SHOT_DIR, `${TAG}-${name}`), fullPage: true });
  if (width === 390 || width === 1440) {
    await page.screenshot({ path: join(SHOT_DIR, `${TAG}-home-${width}-fold.png`) });
  }
  const entry = { width, ...metrics, consoleErrors };
  report.checks.responsive.push(entry);
  if (metrics.overflow > 0) fail.push(`${width}px: vízszintes túlcsordulás ${metrics.overflow}px`);
  if (metrics.minFont < 12) fail.push(`${width}px: túl kicsi betű (${metrics.minFont}px)`);
  if (metrics.smallTargets.length) fail.push(`${width}px: kis érintési célpont(ok)`);
  if (consoleErrors.length) fail.push(`${width}px: konzolhiba`);
  await page.close();
}

// ---------- 2. Mobilmenü billentyűzettel ----------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  const steps = [];
  // Első Tab: skip link
  await page.keyboard.press('Tab');
  steps.push({
    step: 'Tab 1',
    focused: await page.evaluate(() => document.activeElement?.textContent?.trim()),
  });
  const toggle = page.locator('[data-menu-toggle]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  const openState = await toggle.getAttribute('aria-expanded');
  const menuVisible = await page.locator('#mobil-menu').isVisible();
  await page.screenshot({ path: join(SHOT_DIR, `${TAG}-mobile-menu-open-390.png`) });
  await page.keyboard.press('Tab');
  const firstLink = await page.evaluate(() => document.activeElement?.textContent?.trim());
  await page.keyboard.press('Escape');
  const closedState = await toggle.getAttribute('aria-expanded');
  const focusBack = await page.evaluate(() =>
    document.activeElement?.hasAttribute('data-menu-toggle'),
  );
  const menuHidden = await page.locator('#mobil-menu').isHidden();
  const result = {
    steps,
    openState,
    menuVisible,
    firstLinkAfterTab: firstLink,
    closedState,
    focusBack,
    menuHidden,
  };
  report.checks.mobileMenu = result;
  if (!(
    openState === 'true' &&
    menuVisible &&
    closedState === 'false' &&
    focusBack &&
    menuHidden
  )) {
    fail.push('Mobilmenü: hibás nyitás/zárás/fókusz');
  }
  // Fókuszjelölő képernyőkép
  await page.locator('.hero a').first().focus();
  await page.screenshot({ path: join(SHOT_DIR, `${TAG}-focus-visible-390.png`) });
  await page.close();
}

// ---------- 3. axe-core (WCAG 2.0/2.1/2.2 A+AA) ----------
report.checks.axe = [];
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
for (const path of A11Y_PAGES) {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeSource });
    const result = await page.evaluate(async () =>
      // eslint-disable-next-line no-undef
      axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
        },
      }),
    );
    const violations = result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
      help: v.help,
      targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')),
    }));
    report.checks.axe.push({
      path,
      width,
      violations,
      passes: result.passes.length,
      incomplete: result.incomplete.map((i) => i.id),
    });
    if (violations.length)
      fail.push(`axe ${path} @${width}: ${violations.map((v) => v.id).join(', ')}`);
    await page.close();
  }
}

// ---------- 4. Linkellenőrzés (minden belső link + horgony a dist/ HTML-jeiben) ----------
{
  const htmlFiles = [];
  const walk = (dir) =>
    readdirSync(dir).forEach((f) => {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (p.endsWith('.html')) htmlFiles.push(p);
    });
  walk(DIST);
  const links = new Map();
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:)/.test(href)) continue;
      const rel = file.slice(DIST.length + 1);
      const from = '/' + (rel.endsWith('index.html') ? rel.replace(/index\.html$/, '') : rel);
      if (!links.has(href)) links.set(href, new Set());
      links.get(href).add(from);
    }
  }
  const broken = [];
  const page = await browser.newPage();
  for (const [href, from] of links) {
    const [pathPart, hash] = href.split('#');
    const target = pathPart || [...from][0];
    const res = await fetch(new URL(target, BASE));
    if (res.status !== 200) {
      broken.push({ href, status: res.status, from: [...from].slice(0, 3) });
      continue;
    }
    if (hash) {
      await page.goto(new URL(target, BASE).href);
      const exists = await page.evaluate((id) => !!document.getElementById(id), hash);
      if (!exists) broken.push({ href, status: 'missing-anchor', from: [...from].slice(0, 3) });
    }
  }
  await page.close();
  const notFound = await fetch(`${BASE}/nem-letezo-oldal/`);
  report.checks.links = { checked: links.size, broken, unknownPathStatus: notFound.status };
  if (broken.length) fail.push(`Hibás link: ${broken.length}`);
  if (notFound.status !== 404) fail.push('Ismeretlen útvonal nem 404');
}

await browser.close();
server.close();

report.finishedAt = new Date().toISOString();
report.failures = fail;
writeFileSync(REPORT, JSON.stringify(report, null, 2));
console.log(`Jelentés: ${REPORT}`);
console.log(`Képernyőképek: ${SHOT_DIR}`);
if (fail.length) {
  console.log('\nHIBÁK:\n- ' + fail.join('\n- '));
  process.exit(1);
}
console.log('\nMinden böngészős ellenőrzés sikeres.');
