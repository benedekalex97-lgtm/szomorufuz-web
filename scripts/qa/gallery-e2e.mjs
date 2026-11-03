/* global axe -- a böngészőbe injektált axe-core */
// Galéria akadálymentességi E2E (audit SZF-004) – a belső /stilus/ oldal tesztmintáin.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

import { startServer } from './vercel-local.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const { server, base } = await startServer();
const browser = await chromium.launch();
const fail = [];
const ok = (name, cond, d = '') => {
  console.log(`${cond ? ' ok ' : 'FAIL'} ${name} ${d}`);
  if (!cond) fail.push(name);
};

const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`${base}/stilus/`, { waitUntil: 'networkidle' });
const thumbs = page.locator('#stilus-galeria [data-gallery-open]');
ok('3 bélyegkép', (await thumbs.count()) === 3);
ok('lusta betöltés', (await thumbs.first().locator('img').getAttribute('loading')) === 'lazy');
ok('alt szöveg', (await thumbs.first().locator('img').getAttribute('alt')) === 'Tesztminta 1');
ok('width/height attribútum', Boolean(await thumbs.first().locator('img').getAttribute('width')));

await thumbs.nth(1).focus();
await page.keyboard.press('Enter');
const dialog = page.locator('#stilus-galeria [data-gallery-dialog]');
ok('Enter megnyitja', await dialog.evaluate((d) => d.open));
ok(
  'fókusz a Bezárás gombon',
  await page.evaluate(() => document.activeElement?.hasAttribute('data-gallery-close')),
);
ok('2. kép látszik', (await page.locator('[data-gallery-count]').textContent()) === '2 / 3');
await page.keyboard.press('ArrowRight');
ok('→ lapoz', (await page.locator('[data-gallery-count]').textContent()) === '3 / 3');
await page.keyboard.press('ArrowRight');
ok('körbefordul', (await page.locator('[data-gallery-count]').textContent()) === '1 / 3');
ok(
  'nagy kép alt',
  (await page.locator('[data-gallery-img]').getAttribute('alt')) === 'Tesztminta 1',
);
await page.addScriptTag({ content: axeSource });
const v = await page.evaluate(() =>
  axe.run(document.querySelector('[data-gallery-dialog]'), {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
  }),
);
ok(
  'axe (nyitott párbeszédablak)',
  v.violations.length === 0,
  v.violations.map((x) => x.id).join(','),
);
await page.screenshot({ path: 'docs/screenshots/forms/galeria-nyitott-390.png' });
await page.keyboard.press('Escape');
ok('Escape bezár', !(await dialog.evaluate((d) => d.open)));
ok(
  'fókusz visszatér a megnyitóra',
  await page.evaluate(() => document.activeElement?.getAttribute('data-gallery-open') === '1'),
);
// Tab-csapda: nyitott dialógusban a fókusz bent marad
await thumbs.first().click();
for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
ok(
  'fókusz a párbeszédablakban marad',
  await page.evaluate(() => Boolean(document.activeElement?.closest('dialog'))),
);
await page.locator('[data-gallery-close]').click();

// Éles oldal: igazolt kép nélkül nincs galéria és nincs képhivatkozás a régi domainre
await page.goto(`${base}/ravatalozo-terem/`, { waitUntil: 'networkidle' });
ok(
  'ravatalozó: jóváhagyott kép nélkül nincs galéria',
  (await page.locator('[data-gallery]').count()) === 0,
);
const html = await page.content();
ok('nincs képbetöltés a régi domainről', !/budapest-temetkezes\.hu\/pages\/.*\.jpg/.test(html));

await browser.close();
server.close();
if (fail.length) process.exit(1);
