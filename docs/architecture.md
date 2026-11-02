# Architektúra

## Technológiai döntések

| Elem          | Választás                                                                       | Indok                                                                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keretrendszer | **Astro 7** (statikus kimenet)                                                  | Alapból nulla kliensoldali JS, gyors első betöltés mobilon; komponensalapú; jó Sanity- és Vercel-támogatás.                                                                             |
| Nyelv         | **TypeScript 6, `strictest`**                                                   | Típusos tartalommodell → a CMS-re váltáskor a fordító jelzi az eltéréseket. A TS 7 (natív) még nem támogatott az `@astrojs/check` és a `typescript-eslint` által.                       |
| CSS           | **Natív CSS + design tokenek** (CSS-változók), komponensenként scoped `<style>` | Nincs build-függőség és osztálynév-zaj; a tokenek egy helyen vannak; a kis CSS a HTML-be ágyazva (nincs renderblokkoló kérés). Tailwind nem indokolt ekkora, tartalomközpontú oldalnál. |
| Betűk         | Inter + Newsreader, **saját tárhelyről**, csak latin + latin-ext                | Nincs Google Fonts-hívás (adatvédelem), kevesebb letöltés; a két fő fájl előtöltve.                                                                                                     |
| Ikonok        | Lucide (ISC), build időben generált szűk készlet                                | Egységes vonalikonok, csak a használt 14 ikon kerül a kódba.                                                                                                                            |
| Kliens JS     | Egyetlen kis szkript (mobilmenü)                                                | Minden más (GYIK-harmonika is) natív HTML. JS nélkül is használható az oldal.                                                                                                           |
| Hosting       | **Vercel** (tervezett, még nincs bekötve)                                       | `vercel.json` előkészítve: biztonsági fejlécek, gyorsítótár, perjeles URL-ek.                                                                                                           |
| CMS           | **Sanity** (tervezett, 3. fázis)                                                | Lásd lent: fenntartásokkal.                                                                                                                                                             |

### Sanity – előzetes értékelés (döntés a 3. fázis előtt)

- **Mellette:** strukturált tartalom, testreszabható magyar nyelvű szerkesztőfelület (Studio), valós idejű előnézet, nincs saját admin.
- **Kockázat – jogosultságok és költség:** a Sanity nyilvános árlapja szerint az ingyenes csomag 20 felhasználót, de csak **2 szerepkört** (adminisztrátor, megtekintő) ad. Korlátozott „szerkesztő” szerepkörhöz a fizetős Growth csomag kell (harmadik feles források szerint kb. 15 USD / fő / hó). Élesítés előtt a [sanity.io/pricing](https://www.sanity.io/pricing) oldalon ellenőrizendő.
- **Megjegyzés:** az audit stratégiai anyaga (`strategy/EXECUTIVE-DECISION.md`) WordPresst javasolt, ha a munkatársak maguk szerkesztenek. A Sanity Studio ezt az igényt is kiszolgálja, de a szerkesztők száma, a szerepkörök és a havi költség alapján a 3. fázis elején dönteni kell. → [open-questions.md](open-questions.md)
- A magyar Studio-lokalizáció elérhetősége ellenőrizendő.

## Mappastruktúra

```
src/
  config/site.ts          környezet, indexelés, tartalmi mód (strict/review)
  content/
    types.ts              tartalomtípusok (a Sanity-sémák előképe)
    data/*.ts             ideiglenes, típusos tartalom (CMS helyett)
    data/placeholder-pages.json   még el nem készült oldalak listája
  lib/
    content.ts            tartalom-hozzáférési réteg (később: Sanity-lekérdezések)
    facts.ts              ellenőrzött/ellenőrizetlen adat megjelenítési szabálya
    format.ts             telefonszám, cím, nyitvatartás, ár formázása
    seo.ts                title, canonical, JSON-LD
  components/
    ui/                   általános építőelemek (Button, Card, Section, Accordion, Icon, TextField…)
    layout/               Header (mobilmenü), Footer, SkipLink, MobileCallBar, Breadcrumbs
    home/                 főoldali szekciók
    seo/                  Seo (meta), JsonLd
  layouts/BaseLayout.astro
  pages/                  index, [...slug] (helyőrzők), 404, robots.txt, stilus (stílusútmutató)
  styles/                 tokens.css, fonts.css, global.css
public/                   favicon, fonts/
scripts/
  qa/browser-qa.mjs       böngészős minőségellenőrzés
  generate-icons.mjs      ikonkészlet generálása
  copy-fonts.mjs          betűfájlok frissítése
docs/                     dokumentáció, képernyőképek, QA-jelentések
```

## Adatfolyam

```
src/content/data/*.ts ──► lib/content.ts (async getterek) ──► pages / komponensek
                                     ▲
                       3. fázis: Sanity GROQ-lekérdezés ugyanazzal a típussal
```

A komponensek soha nem importálnak közvetlenül adatfájlt – csak a `lib/content.ts` függvényeit. Így a CMS-re váltás egy rétegben történik.

## „Nincs kitalált adat” mechanizmus

- `Fact<T>`: érték + `status` + `source` + `note`.
- `publishable(fact)` (`lib/facts.ts`): `verified` → megjelenik; `unverified` → strict módban `null`, review módban jelölve.
- `verifiedOnly(fact)`: JSON-LD-hez és `tel:` linkhez – review módban sem enged ellenőrizetlen értéket.
- A hívássáv (`MobileCallBar`) és a fejléc hívásgombja csak ellenőrzött számmal jelenik meg.

## Indexelés és környezetek

| `PUBLIC_SITE_ENV`     | robots.txt           | meta robots                    | review mód     |
| --------------------- | -------------------- | ------------------------------ | -------------- |
| development / preview | `Disallow: /`        | `noindex` minden oldalon       | engedélyezhető |
| production            | engedélyez + sitemap | `index` (helyőrzők: `noindex`) | tiltott        |

Vercelen a `PUBLIC_SITE_ENV=production` értéket **csak** a Production környezetben szabad beállítani.

## Ismert technikai megjegyzések

- `npm audit`: 13 közepes súlyosságú figyelmeztetés, mind a fejlesztői lint-eszközláncban (`minimatch` az ESLint-függőségekben). A buildbe és a kiszolgált oldalba nem kerülnek. Rendszeres frissítéssel kezelendő.
- `eslint-plugin-jsx-a11y` helyett az ESLint 10-zel kompatibilis `eslint-plugin-jsx-a11y-x` villa fut (az `eslint-plugin-astro` hivatalosan támogatja).
- Content Security Policy még nincs (az inline JSON-LD és a no-JS osztálycsere miatt hash-alapú CSP kell) → 5. fázis.
