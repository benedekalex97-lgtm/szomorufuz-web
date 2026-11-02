# 1. fázis – jelentés

**Dátum:** 2026. november 2. · **Ág:** `phase-1/foundation` · **Állapot:** kész, jóváhagyásra vár. A 2. fázis nem indult el.

## Kiinduló helyzet

- `szomorufuz-web`: üres repó (nem volt commit, `main` ág sem). Más projekt nem lett felülírva.
- `Szomorufuz-webaudit`: elérhető, **csak olvasva** (nyilvános repó, git-klón). Felhasznált anyagok: vezetői összefoglaló, SEO-, UX-, konverziós audit, hibajegyzék, `strategy/seo-migration-plan.md`, `strategy/redirect-map.csv`, `data/crawl.json`. Hiányzó auditanyag nem volt.
- Környezet: Node 22.23.4, npm 10.9.9; Playwright + Chromium előtelepítve.
- Az éles oldalt nem érte kérés a fejlesztés során (minden adat az auditból származik).

## Mi készült el?

1. **Astro 7 + TypeScript (strictest)** projekt, statikus kimenettel. → [architecture.md](architecture.md)
2. **Dizájnrendszer kódként:** tokenek, alapstílusok, 10 UI-komponens, élő stílusútmutató (`/stilus/`). → [design-system.md](design-system.md)
3. **Fejléc + mobilmenü:** rögzített fejléc, akadálymentes lenyíló menü (billentyűzet, Escape, fókusz-visszaadás), JS nélkül is használható.
4. **Teljes főoldal-prototípus** a 10 előírt szekcióval: fejléc, hero, teendők, szolgáltatások, árak, „Miért a Szomorúfűz?”, irodák, GYIK, kapcsolat, lábléc.
5. **Típusos, CMS-kompatibilis tartalomréteg** `Fact<T>` ellenőrzési modellel: ellenőrizetlen adat nem jelenik meg nyilvánosan; `tel:` link csak ellenőrzött számra. → [content-model.md](content-model.md)
6. **Review mód** (`PUBLIC_CONTENT_MODE=review`): a jelölt adatok „Ellenőrizetlen” címkével láthatók – a tulajdonossal való átnézéshez.
7. **SEO-alapok:** canonical, egyedi title/description, OG, `Organization`/`WebSite`/`BreadcrumbList` JSON-LD, sitemap, környezetfüggő robots.txt, 404, perjeles URL-ek, meglévő URL-ek megtartása. → [seo-migration-plan.md](seo-migration-plan.md)
8. **Helyőrző oldalak** a navigáció 17 céljához (noindex, sitemapen kívül) – nincs törött link.
9. **Minőségellenőrző szkript** (`scripts/qa/browser-qa.mjs`) és `npm run verify`.
10. **Vercel-konfiguráció** (`vercel.json`: biztonsági fejlécek, gyorsítótár) – **nincs** deployment.

## Ellenőrzések (ténylegesen lefuttatva)

| Ellenőrzés                                                                        | Eszköz                                                                                             | Eredmény                                                                                                                                                                |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Típusellenőrzés                                                                   | `astro check` (TS 6.0.3, strictest)                                                                | ✅ 0 hiba, 0 figyelmeztetés                                                                                                                                             |
| Lint                                                                              | ESLint 10 + typescript-eslint strict + astro + jsx-a11y (strict)                                   | ✅ 0 hiba                                                                                                                                                               |
| Formázás                                                                          | Prettier                                                                                           | ✅                                                                                                                                                                      |
| Build                                                                             | `astro build`                                                                                      | ✅ 20 oldal                                                                                                                                                             |
| Reszponzív                                                                        | Playwright, 320 / 375 / 390 / 768 / 1024 / 1440 px                                                 | ✅ nincs vízszintes túlcsordulás; legkisebb betű 12 px; nincs 24 px-nél kisebb érintési célpont                                                                         |
| Konzolhibák                                                                       | Playwright (console + pageerror)                                                                   | ✅ 0, minden szélességen                                                                                                                                                |
| Akadálymentesség (automatikus)                                                    | axe-core 4.14 (WCAG 2.0/2.1/2.2 A+AA + best practice), 4 oldal × 2 szélesség, strict és review mód | ✅ 0 sértés · ⚠️ `color-contrast` „incomplete” (az áttetsző fejléc miatt az axe nem tudja eldönteni) → kézzel számolt kontrasztok: [design-system.md](design-system.md) |
| Mobilmenü                                                                         | Playwright billentyűzettel                                                                         | ✅ Enter nyit, Tab a menübe lép, Escape zár, a fókusz visszakerül a gombra                                                                                              |
| Linkek                                                                            | minden belső link + horgony a buildben (27)                                                        | ✅ 0 törött; ismeretlen útvonal → 404                                                                                                                                   |
| Indexelés                                                                         | robots.txt / meta robots dev és production buildben                                                | ✅ dev: `Disallow: /` + noindex; prod: engedélyez + sitemap                                                                                                             |
| Lighthouse 12.8.2 (helyi, production módú build, tömörítés nélküli helyi szerver) | mobil                                                                                              | Performance **96**, Accessibility **100**, Best Practices **100**, SEO **100** · FCP 1,8 s · LCP 2,6 s · CLS 0 · TBT 0 ms                                               |
|                                                                                   | asztali                                                                                            | **100 / 100 / 100 / 100** · LCP 0,6 s · CLS 0                                                                                                                           |

Jelentések: `docs/qa/browser-qa-strict.json`, `docs/qa/browser-qa-review.json`, `docs/qa/lighthouse/*.html`.

## Képernyőképek

`docs/screenshots/phase-1/` – két változatban:

- `strict-*`: amit a nyilvános oldal mutatna most (ellenőrizetlen adatok nélkül).
- `review-*`: a jelölt adatokkal, „Ellenőrizetlen” címkékkel.

Fájlok: `*-home-{320,375,390,768,1024,1440}-full.png` (teljes oldal), `*-home-{390,1440}-fold.png` (első képernyő), `*-mobile-menu-open-390.png`, `*-focus-visible-390.png`. A képeket átnéztem; az átnézés alapján javítva: igazítás, lábléc-szóköz, menügomb-szélesség, logóalcím mérete.

## Mi nem működik / nem ellenőrzött?

- **Nincs ellenőrzött üzleti adat** → strict módban nincs telefonszám, cím, nyitvatartás, ár és céges tény; a hero „Telefonos segítség” gombja a Kapcsolat szekcióra visz, a mobil hívássáv nem jelenik meg. Ez szándékos. → [open-questions.md](open-questions.md)
- **Mobil LCP 2,6 s** a laborban (cél ≤ 2,5 s). Tömörítés és CDN nélküli helyi szerveren mérve; Vercelen újramérendő.
- **GYIK**: demonstrációs tartalom, egyértelműen jelölve.
- **Aloldalak**: csak helyőrzők; élesíteni így nem szabad (SEO-értékes URL-ek).
- **Jogi dokumentumok**: nincsenek (szándékosan nem generáltuk).
- Nem tesztelt: valódi képernyőolvasó, valódi iOS/Android eszköz, Firefox, Safari; terepi Core Web Vitals.
- Content Security Policy még nincs.
- `npm audit`: 13 közepes figyelmeztetés, csak fejlesztői lint-függőségekben.

## Javaslat a 2. fázisra

1. **Előfeltétel:** az A1–A12 adatok megerősítése (különösen a kiemelt telefonszám és a 0–24 elérhetőség) – review módú képernyőképekkel egyszerűen átnézhető.
2. Végleges információs architektúra a 113 URL alapján (hamvasztási pillér-oldal döntése, új URL-ek jóváhagyása).
3. Sorrend (konverziós hatás szerint): Teendők haláleset esetén → Kapcsolat/Irodák (5 irodaoldal) → Árak → Szolgáltatásoldalak → GYIK → Szükséges iratok → Rólunk → jogi oldalak (jogászi szöveggel).
4. Új komponensek: lépéssor, ártáblázat, irodaoldal-sablon, morzsamenüs tartalomoldal-sablon.
5. Párhuzamosan: Search Console-tulajdonjog a mostani domainen (kiinduló SEO-adat), CMS-döntés (C1), domain/DNS tisztázása (C8).
