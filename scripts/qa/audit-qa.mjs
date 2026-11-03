/* global axe -- a böngészőbe injektált axe-core */
// Audit SZF-015: mobil- és akadálymentességi QA a 9 kiemelt oldalon, 4 szélességen.
// Képernyőkép minden kombinációról + automatikus ellenőrzések. Helyi emulátor, nincs külső kérés.
// Használat: npm run build && node scripts/qa/audit-qa.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

import { startServer } from './vercel-local.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const PAGES = [
  ['fooldal', '/'],
  ['teendok', '/teendok-halaleset-utan/'],
  ['arajanlat', '/arajanlat-keres-itt/'],
  ['elerhetoseg', '/elerhetoseg/'],
  ['arak', '/arak/'],
  ['urnak', '/urnak/'],
  ['ravatalozo', '/ravatalozo-terem/'],
  ['szolgaltatasok', '/szolgaltatasok/'],
  ['tudnivalok', '/tudnivalok/'],
];
const WIDTHS = [320, 390, 768, 1440];
const SHOTS = resolve('docs/screenshots/audit-2026-11');
mkdirSync(SHOTS, { recursive: true });

const { server, base } = await startServer();
const browser = await chromium.launch();
const report = { pages: [], checks: [], startedAt: new Date().toISOString() };
const fail = [];
const check = (name, ok, detail = '') => {
  report.checks.push({ name, ok, detail });
  if (!ok) fail.push(`${name}${detail ? ` – ${detail}` : ''}`);
};

for (const [name, path] of PAGES) {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 900 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const visible = (el) => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return s.visibility !== 'hidden' && s.display !== 'none' && r.width > 0 && r.height > 0;
      };
      // Önálló (nem szövegközi) interaktív elemek mérete
      const controls = [
        ...document.querySelectorAll(
          'button, input:not([type=hidden]), select, textarea, .btn, nav a, .callbar a, [role=button]',
        ),
      ].filter((el) => visible(el) && !el.closest('.form__hp'));
      const small24 = controls.filter((el) => {
        const r = el.getBoundingClientRect();
        // jelölőnégyzet/rádió: a teljes címke a célterület
        const box = el.matches('input[type=checkbox], input[type=radio]')
          ? (el.closest('label')?.getBoundingClientRect() ?? r)
          : r;
        return box.width < 24 || box.height < 24;
      }).length;
      const under48 = controls
        .filter((el) => {
          const r = el.matches('input[type=checkbox], input[type=radio]')
            ? (el.closest('label')?.getBoundingClientRect() ?? el.getBoundingClientRect())
            : el.getBoundingClientRect();
          return r.height < 44;
        })
        .map((el) => (el.textContent || el.getAttribute('name') || el.tagName).trim().slice(0, 30));
      const h1 = document.querySelectorAll('h1').length;
      const callbar = document.querySelector('.callbar');
      return {
        overflow: doc.scrollWidth - doc.clientWidth,
        small24,
        under48: under48.slice(0, 8),
        under48Count: under48.length,
        h1,
        lang: doc.lang,
        robots: document.querySelector('meta[name=robots]')?.getAttribute('content'),
        canonical: Boolean(document.querySelector('link[rel=canonical]')),
        viewport: document.querySelector('meta[name=viewport]')?.getAttribute('content'),
        callbarVisible: callbar ? visible(callbar) : false,
        headerSticky: getComputedStyle(document.querySelector('.site-header') ?? document.body)
          .position,
      };
    });
    check(`${name}@${width}: nincs vízszintes túlcsordulás`, m.overflow <= 0, String(m.overflow));
    check(`${name}@${width}: egy H1`, m.h1 === 1, String(m.h1));
    check(`${name}@${width}: 24×24 alatti célpont nincs`, m.small24 === 0, String(m.small24));
    check(
      `${name}@${width}: noindex, nofollow`,
      m.robots === 'noindex, nofollow',
      String(m.robots),
    );
    check(
      `${name}@${width}: lang=hu, viewport, nincs canonical`,
      m.lang === 'hu' && /width=device-width/.test(m.viewport ?? '') && !m.canonical,
    );
    check(
      `${name}@${width}: hívósáv csak mobilon`,
      width < 768 ? m.callbarVisible : !m.callbarVisible,
      String(m.callbarVisible),
    );
    check(`${name}@${width}: konzolhiba nincs`, errors.length === 0, errors.join(' | '));

    await page.addScriptTag({ content: axeSource });
    const ax = await page.evaluate(() =>
      axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      }),
    );
    const v = ax.violations.map((x) => `${x.id}(${x.nodes.length})`);
    check(`${name}@${width}: axe WCAG 2.2 AA`, v.length === 0, v.join(', '));

    await page.screenshot({
      path: `${SHOTS}/${name}-${width}.jpg`,
      fullPage: true,
      type: 'jpeg',
      quality: 60,
    });
    report.pages.push({ name, path, width, ...m });
    await page.close();
  }
}

// ---------- Mobilmenü, ragadós fejléc, horgonyok, billentyűzet ----------
{
  // Csökkentett mozgás: a horgonyugrás azonnali (sima görgetés nélkül), így mérhető.
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  const page = await mctx.newPage();
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  const toggle = page.locator('[data-menu-toggle]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  check('mobilmenü: Enter nyitja', (await toggle.getAttribute('aria-expanded')) === 'true');
  await page.screenshot({ path: `${SHOTS}/mobilmenu-nyitva-390.jpg`, type: 'jpeg', quality: 70 });
  await page.keyboard.press('Escape');
  check('mobilmenü: Escape zárja', (await toggle.getAttribute('aria-expanded')) === 'false');
  check(
    'mobilmenü: fókusz vissza a gombra',
    await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle')),
  );

  // Horgony a ragadós fejléc alatt: a cél teteje a fejléc alja alatt legyen
  for (const [path, hash] of [
    ['/teendok-halaleset-utan/', '#kulfold'],
    ['/elerhetoseg/', '#zugloi-iroda'],
    ['/urnak/', '#csend-0102004'],
    ['/hamvasztas-menete/', '#dokumentumok'],
  ]) {
    await page.goto(`${base}${path}${hash}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);
    const r = await page.evaluate((h) => {
      const t = document.querySelector(h)?.getBoundingClientRect();
      const hd = document.querySelector('.site-header')?.getBoundingClientRect();
      return { top: t?.top ?? -1, header: hd?.bottom ?? 0 };
    }, hash);
    check(
      `horgony ${path}${hash} a fejléc alatt látszik`,
      r.top >= r.header - 1 && r.top < 400,
      JSON.stringify(r),
    );
  }
  // Helyzetválasztó a Teendők oldalon
  await page.goto(`${base}/teendok-halaleset-utan/`, { waitUntil: 'networkidle' });
  const links = await page
    .locator('.b-jump a')
    .evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  check(
    'helyzetválasztó: 4 opció',
    JSON.stringify(links) === JSON.stringify(['#korhaz', '#lakas', '#kozterulet', '#kulfold']),
    JSON.stringify(links),
  );
  // Lábléc irodalinkjei a megfelelő kártyára mutatnak
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  const footer = await page
    .locator('footer a[href^="/elerhetoseg/#"]')
    .evaluateAll((as) => as.map((a) => a.getAttribute('href')));
  const contact = await (await fetch(`${base}/elerhetoseg/`)).text();
  const missing = footer.filter((h) => !contact.includes(`id="${h.split('#')[1]}"`));
  check(
    'lábléc irodalinkek: mind létező kártya',
    footer.length >= 5 && missing.length === 0,
    `${footer.length} link, hiányzó: ${missing.join(',')}`,
  );
  // Geolokáció: nincs engedélykérés
  const geo = await page.evaluate(() => /geolocation/.test(document.documentElement.outerHTML));
  check('nincs helyhozzáférés-kérés', !geo);
  await mctx.close();
}

// ---------- 200% nagyítás (≈ 640 CSS px), csökkentett mozgás, fókuszjelzés ----------
{
  const page = await browser.newPage({ viewport: { width: 640, height: 450 } });
  for (const path of ['/', '/arajanlat-keres-itt/', '/elerhetoseg/']) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const of = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    check(`200% nagyítás ${path}: nincs túlcsordulás`, of <= 0, String(of));
  }
  await page.screenshot({
    path: `${SHOTS}/nagyitas-200-elerhetoseg.jpg`,
    type: 'jpeg',
    quality: 70,
  });
  await page.close();

  const ctx = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 1440, height: 900 },
  });
  const p2 = await ctx.newPage();
  await p2.goto(`${base}/`, { waitUntil: 'networkidle' });
  const anim = await p2.evaluate(
    () =>
      document
        .getAnimations()
        .filter(
          (a) => a.playState === 'running' && (a.effect?.getComputedTiming().duration ?? 0) > 50,
        ).length,
  );
  check('csökkentett mozgás: nincs futó animáció', anim === 0, String(anim));
  // Fókuszjelzés: Tab után látható outline
  await p2.keyboard.press('Tab');
  const outline = await p2.evaluate(() => {
    const el = document.activeElement;
    const s = el ? getComputedStyle(el) : null;
    return s ? `${s.outlineStyle} ${s.outlineWidth}` : '';
  });
  check('billentyűzet: látható fókuszjelzés', !/none|0px/.test(outline), outline);
  await ctx.close();
}

await browser.close();
server.close();
report.finishedAt = new Date().toISOString();
report.failures = fail;
mkdirSync(resolve('docs/qa'), { recursive: true });
writeFileSync(resolve('docs/qa/audit-qa.json'), JSON.stringify(report, null, 2));
console.log(
  `${report.checks.length} ellenőrzés, ${fail.length} hiba; ${PAGES.length * WIDTHS.length} képernyőkép`,
);
if (fail.length) {
  console.log('HIBÁK:\n- ' + fail.join('\n- '));
  process.exit(1);
}
