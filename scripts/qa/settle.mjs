// Mozgás-tudatos QA-segéd: a kontraszt- és a11y-mérés nyugalmi állapotban történjen.
// 1. végiggörgeti az oldalt (a görgetési belépések mind megjelennek, így az axe a
//    lent lévő tartalmat is ellenőrzi), 2. visszagörget, 3. megvárja, hogy a véges,
//    időalapú animációk (hero-belépés, megnyugvás) véget érjenek.
export async function settle(page, { maxMs = 7000 } = {}) {
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(innerHeight * 0.6));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await page
    .waitForFunction(
      () =>
        document
          .getAnimations()
          .every(
            (a) => a.playState !== 'running' || a.timeline?.constructor.name !== 'DocumentTimeline',
          ),
      undefined,
      { timeout: maxMs },
    )
    .catch(() => {});
  // a belépő átmenetek (≤ 900 ms + lépcsőzés) lecsengése
  await page.waitForTimeout(1200);
}
