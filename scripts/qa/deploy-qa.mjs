// Deployment utáni ellenőrzés egy TÉNYLEGES URL-en (pl. Vercel).
// Használat: node scripts/qa/deploy-qa.mjs --base https://szomorufuz-web.vercel.app
// Csak olvasó GET-kéréseket küld.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const argv = process.argv.slice(2);
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const BASE = (arg('base') ?? '').replace(/\/$/, '');
if (!BASE.startsWith('https://')) {
  console.error('Adj meg HTTPS bázis-URL-t: --base https://…');
  process.exit(1);
}
const SHOT_DIR = resolve('docs/screenshots/deploy');
const REPORT = resolve('docs/qa/deploy-qa.json');
mkdirSync(SHOT_DIR, { recursive: true });

const report = { base: BASE, startedAt: new Date().toISOString(), checks: {} };
const fail = [];
const origin = new URL(BASE).origin;

// ---------- 1. HTTP: bejárás, fejlécek, meta robots, canonical, assetek ----------
const pages = new Map();
const assets = new Map();
const queue = ['/'];
while (queue.length) {
  const path = queue.shift();
  if (pages.has(path)) continue;
  const res = await fetch(origin + path, { redirect: 'manual' });
  const html = res.headers.get('content-type')?.includes('text/html') ? await res.text() : '';
  const meta = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? null;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
  const jsonLd = html.includes('application/ld+json');
  pages.set(path, {
    status: res.status,
    xRobotsTag: res.headers.get('x-robots-tag'),
    metaRobots: meta,
    canonical,
    jsonLd,
  });
  for (const [, href] of html.matchAll(/href="([^"#]*)(#[^"]*)?"/g)) {
    if (!href || /^(https?:|mailto:|tel:)/.test(href)) continue;
    const abs = new URL(href, origin + path);
    if (abs.origin !== origin) continue;
    if (/\.(svg|woff2|css|js|xml|txt|png|ico)$/.test(abs.pathname)) assets.set(abs.pathname, path);
    else if (!pages.has(abs.pathname)) queue.push(abs.pathname);
  }
  for (const [, src] of html.matchAll(/src="([^"]+)"/g)) {
    const abs = new URL(src, origin + path);
    if (abs.origin === origin) assets.set(abs.pathname, path);
  }
}
for (const [path, from] of assets) {
  const res = await fetch(origin + path);
  assets.set(path, { status: res.status, type: res.headers.get('content-type'), from });
}
const pageList = [...pages].map(([path, v]) => ({ path, ...v }));
report.checks.pages = pageList;
report.checks.assets = [...assets].map(([path, v]) => ({ path, ...v }));
for (const p of pageList) {
  if (p.status !== 200) fail.push(`${p.path}: HTTP ${p.status}`);
  if (!p.xRobotsTag?.includes('noindex')) fail.push(`${p.path}: hiányzó X-Robots-Tag noindex`);
  if (p.metaRobots !== 'noindex, nofollow') fail.push(`${p.path}: meta robots = ${p.metaRobots}`);
  if (p.canonical) fail.push(`${p.path}: canonical jelen van (${p.canonical})`);
  if (p.jsonLd) fail.push(`${p.path}: JSON-LD jelen van`);
}
for (const a of report.checks.assets)
  if (a.status !== 200) fail.push(`asset ${a.path}: HTTP ${a.status}`);

// robots.txt, sitemap, 404
{
  const robots = await fetch(`${origin}/robots.txt`);
  const robotsText = await robots.text();
  const sitemap = await fetch(`${origin}/sitemap-index.xml`);
  const nf = await fetch(`${origin}/nem-letezo-oldal-qa/`);
  const nfHtml = await nf.text();
  report.checks.robotsTxt = {
    status: robots.status,
    body: robotsText,
    xRobotsTag: robots.headers.get('x-robots-tag'),
  };
  report.checks.sitemap = { status: sitemap.status };
  report.checks.notFound = {
    status: nf.status,
    xRobotsTag: nf.headers.get('x-robots-tag'),
    hasCustomPage: nfHtml.includes('Ezt az oldalt nem találjuk'),
  };
  if (!/Disallow: \/\s*$/m.test(robotsText)) fail.push('robots.txt nem tilt mindent');
  if (sitemap.status === 200) fail.push('sitemap-index.xml elérhető');
  if (nf.status !== 404 || !report.checks.notFound.hasCustomPage) fail.push('404-oldal hibás');
  if (/budapest-temetkezes\.hu/.test(robotsText))
    fail.push('robots.txt az éles domainre hivatkozik');
}

// ---------- 2. Böngésző: képernyőképek, konzol, hibás kérések, menü, navigáció, axe ----------
const browser = await chromium.launch();
report.checks.browser = [];
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
for (const width of [390, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } });
  const consoleErrors = [];
  const failedRequests = [];
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  page.on('requestfailed', (r) => failedRequests.push(`${r.url()} ${r.failure()?.errorText}`));
  page.on(
    'response',
    (r) => r.status() >= 400 && failedRequests.push(`${r.url()} HTTP ${r.status()}`),
  );
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const info = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    fontsLoaded: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family),
    stylesApplied: getComputedStyle(document.body).backgroundColor,
    h1: document.querySelector('h1')?.textContent?.trim(),
  }));
  await page.screenshot({ path: join(SHOT_DIR, `vercel-home-${width}-fold.png`) });
  await page.screenshot({ path: join(SHOT_DIR, `vercel-home-${width}-full.png`), fullPage: true });

  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () =>
    axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
    }),
  );
  const violations = axe.violations.map((v) => `${v.id} (${v.nodes.length})`);

  let nav;
  if (width === 390) {
    const toggle = page.locator('[data-menu-toggle]');
    await toggle.focus();
    await page.keyboard.press('Enter');
    const opened = (await toggle.getAttribute('aria-expanded')) === 'true';
    await page.screenshot({ path: join(SHOT_DIR, 'vercel-mobile-menu-open-390.png') });
    await page.keyboard.press('Escape');
    const closed = (await toggle.getAttribute('aria-expanded')) === 'false';
    const focusBack = await page.evaluate(() =>
      document.activeElement?.hasAttribute('data-menu-toggle'),
    );
    await toggle.click();
    await page.locator('#mobil-menu a', { hasText: 'Árak' }).click();
    await page.waitForLoadState('networkidle');
    nav = { opened, closed, focusBack, navigatedTo: new URL(page.url()).pathname };
    if (!(opened && closed && focusBack && nav.navigatedTo === '/arak/'))
      fail.push('Mobilmenü / navigáció hibás');
  } else {
    await page.locator('.site-nav a', { hasText: 'Kapcsolat' }).click();
    await page.waitForLoadState('networkidle');
    nav = { navigatedTo: new URL(page.url()).pathname };
    if (nav.navigatedTo !== '/elerhetoseg/') fail.push('Asztali navigáció hibás');
  }

  report.checks.browser.push({
    width,
    ...info,
    consoleErrors,
    failedRequests,
    axeViolations: violations,
    nav,
  });
  if (info.overflow > 0) fail.push(`${width}px: vízszintes túlcsordulás`);
  if (consoleErrors.length) fail.push(`${width}px: konzolhiba`);
  if (failedRequests.length) fail.push(`${width}px: hibás kérés`);
  if (violations.length) fail.push(`${width}px: axe ${violations.join(', ')}`);
  await page.close();
}
await browser.close();

report.finishedAt = new Date().toISOString();
report.failures = fail;
writeFileSync(REPORT, JSON.stringify(report, null, 2));
console.log(`Oldalak: ${pageList.length}, assetek: ${assets.size}`);
console.log(`Jelentés: ${REPORT}`);
if (fail.length) {
  console.log('\nHIBÁK:\n- ' + fail.join('\n- '));
  process.exit(1);
}
console.log('Minden deployment utáni ellenőrzés sikeres.');
