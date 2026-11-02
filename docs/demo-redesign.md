# Bemutatóverzió – vizuális újratervezés

**Ág:** `design/demo-redesign` (a `phase-1/foundation`-ből) · **Állapot:** bemutatható, noindex, nofollow.

## Koncepció

- **Védjegyelem – a szomorúfűz.** Finom vonalas, csüngő ágú fa (`src/components/brand/Willow.astro`), build időben, rögzített „magból” generálva.
  - A heróban egyszer, lassan „leereszkedik”; `prefers-reduced-motion` esetén statikus.
  - Halványan visszatér az aloldal-fejlécekben, a záró sávban és a láblécben.
  - Nem logó, és nem ábrázol valós helyszínt.
- **Tipográfia.**
  - Newsreader, könnyű (300) súllyal; a címek második sora dőlt, bronz kiemelés („Nincs egyedül / _a nehéz pillanatokban._”).
  - Inter a funkcionális szövegekhez.
  - Az irodák kerületszámai (VI., XII., XIV., XVII., XX.) nagy serif római számként jelennek meg.
- **Kompozíció.** Kártyarácsok helyett szerkesztői elrendezés: hajszálvonalak, kétoszlopos (címsor bal, tartalom jobb) szekciók, egy sötét szénszürke „ügyintézés” sáv, sötét záró CTA.
- **Számozás csak valódi sorrendnél.** Teendők lépései, ügyintézés menete.
- **Formák.** 2–4 px lekerekítés, nincs színátmenet és nincs dekoratív kártyaárnyék.
- **Fotó nincs.** Jogtiszta, saját fotó nem állt rendelkezésre, generált képet szándékosan nem használunk.

## Oldalak

| Oldal                             | URL                        | Állapot                                                                                                                    |
| --------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Főoldal                           | `/`                        | újratervezve: hero + 3 segítség-út, első órák, a búcsú formái, ügyintézés, költségek, bemutatkozás, irodák, GYIK, záró CTA |
| Teendők haláleset esetén          | `/teendok-halaleset-utan/` | új: lépések, helyzetek (jóváhagyásra váró útmutatóval), hívás előtti teendők                                               |
| Szolgáltatások                    | `/szolgaltatasok/`         | új                                                                                                                         |
| Hamvasztás                        | `/hamvasztasos-temetes/`   | új (közös szolgáltatásoldal-sablon)                                                                                        |
| Hagyományos temetés               | `/koporsos-temetes/`       | új (közös sablon)                                                                                                          |
| Kapcsolat                         | `/elerhetoseg/`            | új: telefonos segítség (jóváhagyásra vár), irodák                                                                          |
| Többi (Árak, Irodák, Rólunk stb.) |                            | egységes „Hamarosan” oldal, linkekkel a kész oldalakra                                                                     |

## Jóváhagyandó tartalom elkülönítése

- **Bemutatóverzió-sáv.** Minden oldal tetején, nem éles környezetben: „A szövegek tervezetek; a telefonszám, a címek és az árak jóváhagyás után kerülnek fel.”
- **Ellenőrizetlen adat strict módban nem jelenik meg.** Ide tartozik a telefonszám, a cím, a nyitvatartás és az ár; helyettük finom „Jóváhagyásra vár” blokk látszik. A review módban (`PUBLIC_CONTENT_MODE=review`) jelölve láthatók.
- **Megjelölt tervezetek.** A GYIK mintatartalomként jelölt; a helyzetenkénti teendőlista „Szakmai jóváhagyás alatt” jelölést kapott.
- **Kitalált adat nincs.** A szövegekben nincs évszám, díj, vélemény, 0–24 vagy garancia.

## Ellenőrzések (ténylegesen lefuttatva)

| Ellenőrzés                                                                    | Eredmény                                                                                   |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `npm run verify` (astro check, ESLint + a11y, Prettier, build)                | ✅ 0 hiba, 22 oldal                                                                        |
| Böngészős QA, 320 / 375 / 390 / 768 / 1024 / 1440 px                          | ✅ nincs túlcsordulás, min. betű 12 px, nincs 24 px alatti érintési cél, 0 konzolhiba      |
| axe-core (WCAG 2.0/2.1/2.2 A+AA), 9 oldal × 2 szélesség, strict és review mód | ✅ 0 sértés (`color-contrast` „incomplete” – kézzel számolt kontrasztok: design-system.md) |
| Mobilmenü billentyűzettel                                                     | ✅ nyit, Escape zár, fókusz vissza                                                         |
| Belső linkek és horgonyok                                                     | ✅ 0 törött; ismeretlen útvonal → 404                                                      |
| Indexelés                                                                     | ✅ meta `noindex, nofollow`, robots.txt `Disallow: /`, nincs sitemap                       |
| Lighthouse 12.8.2, helyi gzip-szerver                                         | mobil: 93 / 100 / 100 / 63* · LCP 3,2 s · CLS 0 — asztali: 100 / 100 / 100 / 63*           |

\* Az SEO-pontszám a szándékos `noindex` miatt alacsony.

Képernyőképek: `docs/screenshots/demo/` (`npm run qa:screenshots`).

## Nyitott pontok

- **Mobil LCP.** 3,2 s lassú 4G-szimulációban (cél ≤ 2,5 s): a négy webfont betöltése a szűk keresztmetszet. Valódi CDN-en újramérendő; lehetőség a betűkészlet szűkítése.
- **Jóváhagyandó tartalom.** Telefonszám, címek, nyitvatartás, árak, cégadatok, a szövegtervezetek és a GYIK → [open-questions.md](open-questions.md).
- **Végleges logó.** Továbbra is ideiglenes szöveges logó.
- **Nem tesztelt.** Safari és Firefox (a fa maszkanimációja), valódi mobileszköz, képernyőolvasó.
- **Vercel preview.** Nem készült: a Vercel-projekt nem létezik, és a munkamenetnek nincs írási jogosultsága → [deployment.md](deployment.md).
