# Tartalommodell (CMS-előkészítés)

A típusok forrása: `src/content/types.ts`. Az ideiglenes adatok: `src/content/data/`. A 3. fázisban ezekből lesznek a Sanity-sémák; a `lib/content.ts` függvényei változatlan visszatérési típussal Sanity-lekérdezésre cserélődnek.

## Alapelvek

1. **Tény ≠ szöveg.** Üzleti tény (`Fact<T>`): érték + `status` (`verified`/`unverified`) + `source` + `note` + `verifiedAt`/`verifiedBy`. Szöveg: `copyStatus` (`draft`/`approved`/`demo`).
2. **Egyszerűség a szerkesztőnek.** Kevés, magyarul elnevezett mező; a szerkezet (pl. JSON-LD) a kódból generálódik.
3. **Egy helyen egy adat.** Telefonszám, cím, nyitvatartás csak az irodánál / a beállításoknál van – minden oldal onnan olvassa (megszünteti a NAP-ellentmondásokat, audit SEO-04).

## Tartalomtípusok

| Típus             | Fajta                 | Fő mezők                                                                                              | 1. fázis állapota                                   |
| ----------------- | --------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `siteSettings`    | singleton             | cégnév, szlogen, jogi név*, adószám*, e-mail*, elsődleges telefon*, elérhetőség (pl. 0–24)*, alap SEO | `site-settings.ts` – minden * ellenőrizetlen        |
| `homepage`        | singleton             | hero (cím, alcím, CTA-k), első lépések, szekciócímek és bevezetők, bizalmi pontok*                    | `homepage.ts`                                       |
| `service`         | dokumentum            | cím, rövid leírás, slug/URL, kategória, `copyStatus`                                                  | `services.ts` (4 db, vázlat)                        |
| `serviceCategory` | dokumentum            | cím                                                                                                   | `services.ts`                                       |
| `office`          | dokumentum            | név, slug, cím*, telefonok*, nyitvatartás*, térképlink*, koordináta*                                  | `offices.ts` (5 db, mind ellenőrizetlen)            |
| `pricingCategory` | dokumentum            | cím, tételek                                                                                          | `pricing.ts`                                        |
| `pricingItem`     | beágyazott            | név, kapcsolódó szolgáltatás, ár* (összeg, HUF, „-tól”/fix), tartalom                                 | `pricing.ts` (1 ellenőrizetlen tétel)               |
| `faq`             | dokumentum            | kérdés, válasz, `copyStatus`                                                                          | `faq.ts` (4 db, **demo**)                           |
| `contentPage`     | dokumentum            | slug, cím, SEO, törzs (Portable Text), szülő (morzsamenü)                                             | csak helyőrzők (`placeholder-pages.json`)           |
| `navigation`      | singleton             | fő menü, lábléc „fontos oldalak”, jogi linkek                                                         | `navigation.ts`                                     |
| `redirect`        | dokumentum            | régi URL, új URL, státusz (301/308/410), indoklás                                                     | típus kész; adat a 4. fázisban (`redirect-map.csv`) |
| `seoMetadata`     | objektum (beágyazott) | title (≤ 60), description (≤ 155), noindex, canonical, OG-kép                                         | minden oldaltípusban                                |

`*` = `Fact<T>` – ellenőrzési státusszal.

## Sanity-leképezés (javaslat, 3. fázis)

- `Fact<T>` → objektumtípus: `value` + `status` (lista: „Ellenőrzött” / „Ellenőrzésre vár”) + `source` + `note`. A Studióban a státusz szerkesztőnként szűrhető lista („Ellenőrzésre váró adatok”).
- Validáció: title ≤ 60, description ≤ 155 karakter; telefonszám E.164 formátum; ár > 0.
- Szerepkörök: _Szerkesztő_ (tartalom), _Jóváhagyó_ (status → verified). Megvalósíthatóság a csomagtól függ → [open-questions.md](open-questions.md).
- Képek: csak jóváhagyott, jogtiszta forrás; kötelező alt-szöveg mező.
- A `redirect` dokumentumokból build időben Vercel-átirányítás generálható.

## Egy adat jóváhagyása most (CMS nélkül)

```ts
primaryPhone: {
  value: { display: '+36 1 …', e164: '+361…' },
  status: 'verified',
  source: 'Szomorúfűz e-mail, 2026-11-xx',
  verifiedAt: '2026-11-xx',
  verifiedBy: 'Név',
},
```

Ezután a szám automatikusan megjelenik a hero gombban, a fejlécben, a mobil hívássávban, a Kapcsolat szekcióban és a JSON-LD-ben.
