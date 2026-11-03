// Motion design QA (feat/premium-motion-experience) a lefordított kimeneten, helyi emulátorral.
// - Vizuális anyag: kezdő / közbenső / nyugalmi állapot, görgetési átmenet, mobil,
//   csökkentett mozgás → docs/screenshots/motion/utana/
// - Ellenőrzések: 5 s után nincs futó időalapú animáció (WCAG 2.2.2), csökkentett mozgásnál
//   a korona azonnal teljes, JS nélkül minden tartalom látszik, CLS, natív görgetés,
//   képkocka-időzítés 4× CPU-lassítással.
// Használat: npm run build && node scripts/qa/motion-qa.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

import { startServer } from './vercel-local.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const OUT = resolve('docs/screenshots/motion/utana');
mkdirSync(OUT, { recursive: true });

const { server, base } = await startServer();
const browser = await chromium.launch();
const results = [];
const fail = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  if (!ok) fail.push(`${name}${detail ? ` – ${detail}` : ''}`);
};
const shot = (page, name) =>
  page.screenshot({ path: `${OUT}/${name}.jpg`, type: 'jpeg', quality: 72 });

// ---------- 1. Hero képsorozat + CLS + animációk vége ----------
for (const [w, h] of [
  [320, 700],
  [390, 844],
  [768, 1024],
  [1440, 900],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  await ctx.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  const page = await ctx.newPage();
  const t0 = Date.now();
  await page.goto(`${base}/`, { waitUntil: 'commit' });
  const frames = w === 390 || w === 1440 ? [200, 800, 1500] : [];
  for (const t of frames) {
    await page.waitForTimeout(Math.max(0, t - (Date.now() - t0)));
    await shot(page, `hero-${w}-${t}ms`);
  }
  await page.waitForTimeout(Math.max(0, 5200 - (Date.now() - t0)));
  await shot(page, `hero-${w}-nyugalom`);
  const running = await page.evaluate(() =>
    document
      .getAnimations()
      .filter(
        (a) =>
          a.playState === 'running' &&
          a.timeline &&
          a.timeline.constructor.name === 'DocumentTimeline',
      )
      .map((a) => a.animationName ?? 'waapi'),
  );
  check(
    `${w}px: 5 s után nincs futó időalapú animáció (WCAG 2.2.2)`,
    running.length === 0,
    running.join(','),
  );
  const cls = await page.evaluate(() => /** @type {any} */ (window).__cls);
  check(`${w}px: CLS ≤ 0,1`, cls <= 0.1, cls.toFixed(4));
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  check(`${w}px: nincs vízszintes túlcsordulás`, overflow <= 0, String(overflow));

  // Görgetési átmenet: natív görgetés, a tartalom belép
  const y = await page.evaluate(
    () => document.querySelector('#szolgaltatasok').getBoundingClientRect().top + scrollY - 140,
  );
  await page.mouse.wheel(0, y);
  await page.waitForTimeout(250);
  const scrolled = await page.evaluate(() => scrollY);
  check(
    `${w}px: natív görgetés (nincs scroll-jacking)`,
    Math.abs(scrolled - y) < 40,
    `${scrolled} / ${Math.round(y)}`,
  );
  if (w === 390 || w === 1440) await shot(page, `gorgetes-${w}-belepes`);
  await page.waitForTimeout(1400);
  if (w === 390 || w === 1440) await shot(page, `gorgetes-${w}-nyugalom`);
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll('#szolgaltatasok .section__header > *')].filter(
        (e) => getComputedStyle(e).opacity !== '1',
      ).length,
  );
  check(`${w}px: a belépő szekció fejléce teljesen látszik`, hidden === 0, String(hidden));
  await ctx.close();
}

// ---------- 2. Csökkentett mozgás: azonnal teljes kép ----------
for (const [w, h] of [
  [390, 844],
  [1440, 900],
]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(`${base}/`, { waitUntil: 'load' });
  await page.waitForTimeout(150);
  await shot(page, `csokkentett-${w}`);
  const st = await page.evaluate(() => {
    const stem = document.querySelector('.hero__valance .strand__stem');
    const leaves = document.querySelector('.hero__valance .strand__leaves');
    const line = document.querySelector('.hero__line-in');
    return {
      dash: stem ? getComputedStyle(stem).strokeDashoffset : 'n/a',
      clip: leaves ? getComputedStyle(leaves).clipPath : 'n/a',
      line: line ? getComputedStyle(line).transform : 'n/a',
      running: document
        .getAnimations()
        .filter(
          (a) => a.playState === 'running' && a.timeline?.constructor.name === 'DocumentTimeline',
        ).length,
    };
  });
  check(
    `${w}px csökkentett mozgás: a lombkorona és a cím azonnal teljes`,
    (st.dash === '0px' || st.dash === 'n/a') &&
      (st.clip === 'none' || st.clip === 'n/a') &&
      st.line === 'none',
    JSON.stringify(st),
  );
  check(`${w}px csökkentett mozgás: nincs futó animáció`, st.running === 0, String(st.running));
  // a görgetési belépés csak halványodás (elmozdulás nélkül)
  const y = await page.evaluate(
    () => document.querySelector('#arak').getBoundingClientRect().top + scrollY - 140,
  );
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(80);
  const tr = await page.evaluate(
    () => getComputedStyle(document.querySelector('#arak .prices > li')).transform,
  );
  check(`${w}px csökkentett mozgás: belépéskor nincs elmozdulás`, tr === 'none', tr);
  await ctx.close();
}

// ---------- 3. JavaScript nélkül: minden tartalom látszik ----------
{
  const ctx = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await ctx.newPage();
  await page.goto(`${base}/`);
  await page.waitForTimeout(2600);
  const invisible = await page.evaluate(
    () =>
      [
        ...document.querySelectorAll(
          'main .section__header > *, main .situations > li, main .prices > li, main .offices > li, .hero__lead, .hero__line-in',
        ),
      ].filter((e) => getComputedStyle(e).opacity !== '1').length,
  );
  check('JS nélkül: nincs rejtve maradó tartalom', invisible === 0, String(invisible));
  await ctx.close();
}

// ---------- 4. Asztali korona csak asztali nézetben töltődik le ----------
for (const [w, expect] of [
  [390, false],
  [1440, true],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  const req = [];
  page.on('request', (r) => r.url().includes('/media/canopy-hero') && req.push(r.url()));
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  check(
    `${w}px: asztali korona-fájl ${expect ? 'letöltődik' : 'nem töltődik le'}`,
    req.length > 0 === expect,
    String(req.length),
  );
  await page.close();
}

// ---------- 5. Képkocka-időzítés 4× CPU-lassítással (belépés + megnyugvás) ----------
const timing = [];
for (const [w, h] of [
  [390, 844],
  [1440, 900],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => {
    window.__f = [];
    const tick = (t) => {
      window.__f.push(t);
      if (t < 5000) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto(`${base}/`, { waitUntil: 'load' });
  await page.waitForTimeout(5200);
  const r = await page.evaluate(() => {
    const f = window.__f;
    const d = f
      .slice(1)
      .map((t, i) => [f[i], t - f[i]])
      .filter(([t]) => t > 300 && t < 4800);
    const s = d.map(([, v]) => v).sort((a, b) => a - b);
    return {
      frames: d.length,
      p95: Math.round(s[Math.floor(s.length * 0.95)] ?? 0),
      dropped: d.filter(([, v]) => v > 33.4).length,
    };
  });
  timing.push({ width: w, ...r });
  check(`${w}px: képkocka p95 ≤ 17 ms (4× CPU)`, r.p95 <= 17, JSON.stringify(r));
  await ctx.close();
}

await browser.close();
server.close();
mkdirSync(resolve('docs/qa'), { recursive: true });
writeFileSync(
  resolve('docs/qa/motion-qa.json'),
  JSON.stringify({ results, timing, failures: fail }, null, 2),
);
console.log(`${results.length} ellenőrzés, ${fail.length} hiba`);
if (fail.length) {
  console.log('HIBÁK:\n- ' + fail.join('\n- '));
  process.exit(1);
}
console.log('Minden motion-ellenőrzés sikeres.');
