# SEO-migrációs terv – fejlesztési oldal

A részletes stratégia az audit repóban van (csak olvasva, nem módosítva):
`Szomorufuz-webaudit/strategy/seo-migration-plan.md` és `strategy/redirect-map.csv`. Ez a dokumentum azt rögzíti, **mit valósít meg ebből a kódbázis**, és mi a teendő a 4. fázisban.

## URL-számok egyeztetése

| Forrás                          | Szám                        | Megjegyzés                                                 |
| ------------------------------- | --------------------------- | ---------------------------------------------------------- |
| Brief                           | „107 nyilvános oldal”       | = a 200-as státuszú lekért URL-ek                          |
| Audit crawl (`data/crawl.json`) | **113** lekért URL          | 107 × 200, 6 × 404                                         |
| Élő sitemap                     | 95 URL                      | mind 200-as                                                |
| `redirect-map.csv`              | 121 sor                     | **91 megtart** + **22 × 301** + **8 új** (91 + 22 = 113 ✔) |
| Nem letöltött duplikátumok      | 106 `?mobile=no` belső link | szabállyal kezelendő (`?mobile=*` → paraméter nélkül)      |

A számok egymással konzisztensek; a 107 és a 113 közti különbség a 6 hibás (404) URL.

## Elvek (az auditból átvéve)

1. Minden indexelendő, 200-as URL **változatlan útvonalon** él tovább, perjellel a végén.
2. Csak hibás / duplikált URL kap 301-et; tömeges, automatikus átirányítás nincs.
3. Új oldal csak új URL-en jön létre.
4. Tartalmi összevonás (pl. a három hamvasztásos oldal) csak Search Console-adat alapján.

## Az 1. fázisban megvalósítva

| Elem                          | Megvalósítás                                                                                                                                                                                                                                                            |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Perjeles URL-ek               | `trailingSlash: 'always'`, `build.format: 'directory'`, Vercel `trailingSlash: true`                                                                                                                                                                                    |
| Meglévő URL-ek a navigációban | `/teendok-halaleset-utan/`, `/elerhetoseg/` (Kapcsolat), `/szukseges-iratok/`, `/gyakori-kerdesek/`, `/koporsos-temetes/`, `/hamvasztasos-temetes/`, `/hamvak-szorasa-temeto/`, `/hamvak-szorasa-dunaba/`, `/adatkezeles/`, `/ceginformaciok/` (Impresszum), `/a-sz-f/` |
| Új URL-ek                     | az audit szerint: `/arak/`, `/irodak/`, `/rolunk/`; **ezen felül** (nincs az audit térképében): `/szolgaltatasok/`, `/tudnivalok/`, `/suti-tajekoztato/` – jóváhagyandó                                                                                                 |
| Canonical                     | abszolút, `https://www.budapest-temetkezes.hu/...`, perjellel, önhivatkozó (`lib/seo.ts`)                                                                                                                                                                               |
| Title / description           | oldalanként egyedi; márka-utótag csak ha ≤ 60 karakter fér                                                                                                                                                                                                              |
| Indexelés                     | csak `PUBLIC_SITE_ENV=production`; minden más környezet `noindex` + `Disallow: /`                                                                                                                                                                                       |
| Sitemap                       | `@astrojs/sitemap`; a helyőrző és belső oldalak kizárva                                                                                                                                                                                                                 |
| Strukturált adat              | `Organization` + `WebSite` (csak ellenőrzött mezőkkel); `BreadcrumbList` a helyőrző oldalakon                                                                                                                                                                           |
| Open Graph                    | `og:title`, `og:description`, `og:url`, `og:locale=hu_HU` (OG-kép a jóváhagyott arculat után)                                                                                                                                                                           |
| Nyelv                         | `<html lang="hu">`                                                                                                                                                                                                                                                      |
| 404                           | saját 404-oldal, valódi 404-es státusszal (QA-ellenőrzés)                                                                                                                                                                                                               |
| Címsorok                      | oldalanként pontosan egy H1, logikus H2/H3 hierarchia                                                                                                                                                                                                                   |

A helyőrző oldalak **nem élesíthetők**: a meglévő SEO-értékes URL-ek helyén csak a 2. fázis végleges tartalmával mehet ki az oldal.

## 4. fázis teendői

1. A `redirect-map.csv` átvétele `redirect` tartalomtípusba → Vercel-átirányítások generálása (egylépéses, szerveroldali 301).
2. Szabályalapú átirányítások: `?mobile=*`, `http://`, nem-www, `index.php`, perjel nélküli változatok.
3. Automatizált teszt a CSV minden sorára (státusz + cél, nincs lánc).
4. `FuneralHome` séma irodánként, `Service`/`Offer`, `FAQPage` – csak ellenőrzött NAP-adatokkal.
5. Régi ↔ új crawl-összevetés stagingen (`Szomorufuz-webaudit/scripts/crawl.py`).
6. A hírek (36 db, 2013–2014) kezelése: URL marad, `noindex` csak backlink-ellenőrzés után.

## Előfeltételek (most kell elindítani)

- Search Console-tulajdonjog a **jelenlegi** domainen, hogy legyen kiinduló adat (4–8 hét).
- Domain-jogosult és DNS-hozzáférés tisztázása (audit: a szolgáltatói függés nyitott kérdés).
