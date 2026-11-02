// Űrlapok böngészős E2E-tesztje (audit SZF-002/003/015) a lefordított kimeneten.
// Előfeltétel: FORMS_DELIVERY=dry-run npm run build   (semmit nem küld ki)
// Használat:   node scripts/qa/forms-e2e.mjs
// Csak szintetikus tesztadat; valódi személyes adat nem kerül az űrlapokba.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

import { startServer } from './vercel-local.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const SHOTS = resolve('docs/screenshots/forms');
mkdirSync(SHOTS, { recursive: true });
const { server, base } = await startServer();
const browser = await chromium.launch();
const results = [];
const fail = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  if (!ok) fail.push(`${name}${detail ? ` – ${detail}` : ''}`);
};

const SYNTH = { nev: 'Teszt Elek', email: 'teszt@example.com', telefon: '+36 30 000 0000' };

async function newPage(width = 390) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  page.errors = [];
  page.posts = 0;
  page.on('pageerror', (e) => page.errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && page.errors.push(m.text()));
  page.on(
    'request',
    (r) => r.method() === 'POST' && r.url().includes('/api/urlap/') && page.posts++,
  );
  return page;
}

async function axe(page, label) {
  await page.addScriptTag({ content: axeSource });
  const r = await page.evaluate(() =>
    axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
    }),
  );
  const v = r.violations.map((x) => `${x.id} (${x.nodes.length})`);
  check(`axe: ${label}`, v.length === 0, v.join(', '));
}

// Várjunk a minimális kitöltési időre (robotszűrő), mint egy valódi felhasználó.
const humanDelay = (page) => page.waitForTimeout(2600);

// ---------- 1. Általános árajánlat: hibák, összesítő, fókusz, adatmegőrzés, siker ----------
{
  const page = await newPage();
  await page.goto(`${base}/arajanlat-keres-itt/`, { waitUntil: 'networkidle' });
  const form = page.locator('section[data-form-variant="arajanlat"] form');
  check('általános űrlap látható', await form.isVisible());
  const hiddenVariants = await page.locator('section[data-form-variant]:not([hidden])').count();
  check('csak egy változat látszik', hiddenVariants === 1, String(hiddenVariants));

  await form.locator('[data-form-submit]').click();
  const summary = form.locator('[data-form-summary]');
  check('üres beküldés: hibaösszesítő megjelenik', await summary.isVisible());
  check(
    'üres beküldés: fókusz az összesítőn',
    await page.evaluate(() => document.activeElement?.hasAttribute('data-form-summary')),
  );
  const errCount = await form.locator('[data-form-summary-list] li').count();
  check('üres beküldés: kötelező mezők hibái (≥ 10)', errCount >= 10, String(errCount));
  check('üres beküldés: nem ment kérés a szerverre', page.posts === 0, String(page.posts));
  await page.screenshot({ path: `${SHOTS}/arajanlat-hibak-390.png`, fullPage: true });

  // Összesítő hivatkozás → mező fókusz
  await form.locator('[data-form-summary-list] a').first().click();
  const focused = await page.evaluate(() => document.activeElement?.getAttribute('name'));
  check('összesítő link a mezőre fókuszál', focused === 'temetes_tipusa', String(focused));

  // Kitöltés (szintetikus adatok)
  await form.getByLabel('Hamvasztásos').check();
  await form.getByLabel('Kórházban').first().check();
  await form.locator('input[name="elhunyt_helye"][value="Kórházban"]').check();
  await form.getByLabel(/Közelebbi megnevezése/).fill('Teszt Kórház');
  await form.getByLabel(/Elhunyt neve/).fill('Teszt Elhunyt');
  await form.getByLabel('E-mailben küldjék el').check();
  await form.getByLabel(/Az Ön neve/).fill(SYNTH.nev);
  await form.getByLabel(/e-mail címe/).fill('rossz-cim');
  await form.getByLabel(/telefonszáma/).fill(SYNTH.telefon);
  await form.getByLabel(/adatkezelési tájékoztatót/).check();
  await form.locator('[data-form-submit]').click();
  const emailErr = await form.locator('[data-field="email"] [data-field-error]').textContent();
  check('hibás e-mail jelzése', /érvényes e-mail/.test(emailErr ?? ''), emailErr ?? '');
  check(
    'hibás mező aria-invalid',
    (await form.getByLabel(/e-mail címe/).getAttribute('aria-invalid')) === 'true',
  );
  check(
    'adatok megmaradnak hiba után',
    (await form.getByLabel(/Az Ön neve/).inputValue()) === SYNTH.nev,
  );

  await form.getByLabel(/e-mail címe/).fill(SYNTH.email);
  await humanDelay(page);
  // Dupla kattintás: csak egy kérés mehet ki
  // Két kattintás ugyanabban a pillanatban (gyors dupla kattintás)
  await form.locator('[data-form-submit]').evaluate((b) => {
    b.click();
    b.click();
  });
  const success = page.locator('section[data-form-variant="arajanlat"] [data-form-success]');
  await success.waitFor({ state: 'visible', timeout: 5000 });
  check('sikeres beküldés: visszaigazolás', await success.isVisible());
  check(
    'sikeres beküldés: fókusz a visszaigazoláson',
    await page.evaluate(() => document.activeElement?.hasAttribute('data-form-success')),
  );
  check('dupla kattintás: egyetlen POST', page.posts === 1, String(page.posts));
  const text = await success.textContent();
  check('dry-run jelzés a visszaigazolásban', /NEM továbbítottuk/.test(text ?? ''), text ?? '');
  await page.screenshot({ path: `${SHOTS}/arajanlat-siker-390.png` });
  check('konzolhiba nélkül', page.errors.length === 0, page.errors.join(' | '));
  await page.close();
}

// ---------- 2. Szolgáltatásspecifikus változatok a CTA paraméterével ----------
for (const [service, variant, prefillName, prefillValue] of [
  ['hamvasztasos-temetes', 'hamvasztasos', null, null],
  ['hamvasztas-urnakiadas', 'hamvasztasos', null, null],
  ['hamvak-hazavitele', 'hamvasztasos', 'hamvak_helye', 'Hazaviszem az otthonomba'],
  ['koporsos-temetes', 'koporsos', null, null],
  ['hamvak-szorasa-temeto', 'szoras', 'szoras_helye', 'Temetőben, Budapesten'],
  ['hamvak-szorasa-dunaba', 'szoras', 'szoras_helye', 'Hajóról a Duna folyóba'],
  ['ravatalozo-terem', 'ravatalozo', 'szolgaltatasok', 'Ravatalozó terem'],
]) {
  const page = await newPage();
  await page.goto(`${base}/arajanlat-keres-itt/?szolgaltatas=${service}#urlap`, {
    waitUntil: 'networkidle',
  });
  const section = page.locator(`section[data-form-variant="${variant}"]`);
  const visible = await section.isVisible();
  const others = await page.locator('section[data-form-variant]:not([hidden])').count();
  const hidden = await section.locator('[data-form-service]').inputValue();
  let prefillOk = true;
  if (prefillName) {
    prefillOk = await section
      .locator(`input[name="${prefillName}"][value="${prefillValue}"]`)
      .isChecked();
  }
  check(
    `változat: ${service}`,
    visible && others === 1 && hidden === service && prefillOk,
    `látható=${visible} db=${others} rejtett=${hidden} előkitöltés=${prefillOk}`,
  );
  if (service === 'ravatalozo-terem') {
    await page.screenshot({ path: `${SHOTS}/ravatalozo-valtozat-390.png`, fullPage: true });
  }
  await page.close();
}

// Termékérdeklődés a termékkóddal
{
  const page = await newPage();
  await page.goto(`${base}/arajanlat-keres-itt/?szolgaltatas=termek&termek=0102003#urlap`, {
    waitUntil: 'networkidle',
  });
  const value = await page
    .locator('section[data-form-variant="termek"] select[name="termek"]')
    .inputValue();
  check('termék előkiválasztása kóddal', /Cédrus.*0102003/.test(value), value);
  await page.close();
}

// ---------- 3. Szerverhiba: üzenet, adatmegőrzés, újraküldhetőség ----------
{
  const page = await newPage();
  await page.route('**/api/urlap/', (route) =>
    route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: JSON.stringify({ ok: false, message: 'Az üzenetet most nem tudtuk továbbítani.' }),
    }),
  );
  await page.goto(`${base}/elerhetoseg/`, { waitUntil: 'networkidle' });
  const form = page.locator('section[data-form-variant="kapcsolat"] form');
  await form.getByLabel(/Az Ön neve/).fill(SYNTH.nev);
  await form.getByLabel(/e-mail címe/).fill(SYNTH.email);
  await form.getByLabel(/adatkezelési tájékoztatót/).check();
  await humanDelay(page);
  await form.locator('[data-form-submit]').click();
  await page.waitForTimeout(300);
  const status = await form.locator('[data-form-status]').textContent();
  check('szerverhiba: üzenet a státuszrégióban', /nem tudtuk/.test(status ?? ''), status ?? '');
  check(
    'szerverhiba: nincs sikerüzenet',
    !(await page.locator('section[data-form-variant="kapcsolat"] [data-form-success]').isVisible()),
  );
  check(
    'szerverhiba: adatok megmaradtak',
    (await form.getByLabel(/e-mail címe/).inputValue()) === SYNTH.email,
  );
  check('szerverhiba: gomb újra aktív', await form.locator('[data-form-submit]').isEnabled());
  await page.screenshot({ path: `${SHOTS}/kapcsolat-szerverhiba-390.png` });
  await page.close();
}

// Hálózati hiba
{
  const page = await newPage();
  await page.route('**/api/urlap/', (route) => route.abort('failed'));
  await page.goto(`${base}/tajekoztatas-keres/`, { waitUntil: 'networkidle' });
  const form = page.locator('section[data-form-variant="visszahivas"] form');
  await form.getByLabel(/Az Ön neve/).fill(SYNTH.nev);
  await form.getByLabel(/telefonszáma/).fill(SYNTH.telefon);
  await form.getByLabel(/adatkezelési tájékoztatót/).check();
  await humanDelay(page);
  await form.locator('[data-form-submit]').click();
  await page.waitForTimeout(300);
  const status = await form.locator('[data-form-status]').textContent();
  check('hálózati hiba: üzenet', /Nem sikerült kapcsolódni/.test(status ?? ''), status ?? '');
  await page.close();
}

// ---------- 4. Valódi végpont: visszahívás és kapcsolat (dry-run) ----------
for (const [path, variant, fill] of [
  [
    '/tajekoztatas-keres/',
    'visszahivas',
    {
      'Az Ön neve': SYNTH.nev,
      'Az Ön telefonszáma': SYNTH.telefon,
      'Mikor hívjuk fel Önt?': 'Délután',
    },
  ],
  [
    '/elerhetoseg/',
    'kapcsolat',
    {
      'Az Ön neve': SYNTH.nev,
      'Az Ön e-mail címe': SYNTH.email,
      'Kérdés vagy kérés': 'Tesztüzenet',
    },
  ],
]) {
  const page = await newPage();
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  const section = page.locator(`section[data-form-variant="${variant}"]`);
  for (const [label, value] of Object.entries(fill))
    await section.getByLabel(new RegExp(label)).fill(value);
  await section.getByLabel(/adatkezelési tájékoztatót/).check();
  await humanDelay(page);
  await section.locator('[data-form-submit]').click();
  await section.locator('[data-form-success]').waitFor({ state: 'visible', timeout: 5000 });
  check(`${variant}: sikeres (dry-run) beküldés`, true);
  await page.close();
}

// ---------- 5. Billentyűzet és akadálymentesség ----------
{
  const page = await newPage(1440);
  await page.goto(`${base}/tajekoztatas-keres/`, { waitUntil: 'networkidle' });
  const form = page.locator('section[data-form-variant="visszahivas"] form');
  await form.getByLabel(/Az Ön neve/).focus();
  await page.keyboard.press('Tab');
  const next = await page.evaluate(() => document.activeElement?.getAttribute('name'));
  check('billentyűzet: Tab a következő mezőre', next === 'telefon', String(next));
  // Űrlap elküldése Enterrel, üresen → hibaösszesítő
  await form.getByLabel(/Az Ön neve/).focus();
  await page.keyboard.press('Enter');
  check('billentyűzet: Enter → ellenőrzés', await form.locator('[data-form-summary]').isVisible());
  await page.close();
}
for (const path of ['/arajanlat-keres-itt/', '/elerhetoseg/', '/tajekoztatas-keres/']) {
  for (const width of [390, 1440]) {
    const page = await newPage(width);
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    await axe(page, `${path} @${width}`);
    // hibás állapot is legyen akadálymentes
    await page.locator('form[data-form]:visible [data-form-submit]').first().click();
    await axe(page, `${path} @${width} (hibaállapot)`);
    await page.close();
  }
}

// ---------- 6. JavaScript nélküli beküldés ----------
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${base}/tajekoztatas-keres/`);
  const form = page.locator('section[data-form-variant="visszahivas"] form');
  await form.getByLabel(/Az Ön neve/).fill(SYNTH.nev);
  await form.getByLabel(/telefonszáma/).fill(SYNTH.telefon);
  await form.getByLabel(/adatkezelési tájékoztatót/).check({ force: true });
  await Promise.all([
    page.waitForNavigation(),
    form.locator('[data-form-submit]').click({ force: true }),
  ]);
  const body = await page.textContent('body');
  check(
    'JS nélkül: szerveroldali válaszoldal',
    /Köszönjük|Tesztüzem/.test(body ?? ''),
    (body ?? '').slice(0, 120),
  );
  await ctx.close();
}

await browser.close();
server.close();
mkdirSync(resolve('docs/qa'), { recursive: true });
writeFileSync(
  resolve('docs/qa/forms-e2e.json'),
  JSON.stringify({ base: 'helyi emulátor', results, failures: fail }, null, 2),
);
console.log(`${results.length} ellenőrzés, ${fail.length} hiba`);
if (fail.length) {
  console.log('\nHIBÁK:\n- ' + fail.join('\n- '));
  process.exit(1);
}
console.log('Minden űrlap-ellenőrzés sikeres.');
