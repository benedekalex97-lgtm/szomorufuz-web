# Szomorúfűz Temetkezés – új weboldal

Az új weboldal forráskódja (Astro + TypeScript). A jelenlegi oldal: https://www.budapest-temetkezes.hu – ezt a repó **nem** módosítja.

**Állapot:** 1. fázis (alapok + főoldal-prototípus). Nincs élesítve, nincs CMS, nincs űrlap. Részletek: [docs/phase-1-report.md](docs/phase-1-report.md).

## Gyors indítás

```bash
nvm use               # Node 22.23.4+ (.nvmrc)
npm ci
cp .env.example .env  # nem kötelező – alapértékekkel is fut
npm run dev           # http://localhost:4321
```

## Parancsok

| Parancs              | Mit csinál                                                       |
| -------------------- | ---------------------------------------------------------------- |
| `npm run dev`        | Fejlesztői szerver                                               |
| `npm run build`      | Statikus build a `dist/` mappába                                 |
| `npm run preview`    | A build helyi kiszolgálása                                       |
| `npm run check`      | TypeScript / Astro típusellenőrzés (strict)                      |
| `npm run lint`       | ESLint (TypeScript + Astro + akadálymentességi szabályok)        |
| `npm run format`     | Prettier formázás                                                |
| `npm run verify`     | check + lint + formázás-ellenőrzés + build (commit előtt)        |
| `npm run qa:browser` | Playwright + axe-core: képernyőképek, túlcsordulás, menü, linkek |

Review-módú build (az ellenőrizetlen adatok jelölve látszanak, belső átnézéshez):

```bash
PUBLIC_CONTENT_MODE=review npx astro build --outDir dist-review
node scripts/qa/browser-qa.mjs --dir dist-review --tag review
```

## Környezeti változók

| Változó               | Értékek                                  | Alapérték     |
| --------------------- | ---------------------------------------- | ------------- |
| `PUBLIC_SITE_ENV`     | `development` · `preview` · `production` | `development` |
| `PUBLIC_CONTENT_MODE` | `strict` · `review`                      | `strict`      |

- Indexelés (robots.txt, meta robots) **csak** `production` esetén engedélyezett.
- `production` környezetben a review mód automatikusan kikapcsol.
- Titok soha nem kerül a repóba; a `.env` fájl git-ignorált. Lásd [.env.example](.env.example).

## Legfontosabb szabály: nincs kitalált adat

Minden üzleti tény (telefonszám, cím, nyitvatartás, ár, céges állítás) `Fact<T>` típusú, `verified` / `unverified` státusszal. Nyilvánosan **csak ellenőrzött** adat jelenik meg; `tel:` link csak ellenőrzött számra készül. Az ellenőrizendő adatok listája: [docs/open-questions.md](docs/open-questions.md).

Egy adat jóváhagyása: a `src/content/data/*.ts` fájlban `status: 'verified'`, valamint `verifiedAt` és `verifiedBy` kitöltése.

## Dokumentáció

- [Architektúra](docs/architecture.md)
- [Dizájnrendszer](docs/design-system.md)
- [Tartalommodell (CMS-előkészítés)](docs/content-model.md)
- [SEO-migrációs terv](docs/seo-migration-plan.md)
- [1. fázis jelentés](docs/phase-1-report.md)
- [Nyitott kérdések, hiányzó adatok](docs/open-questions.md)
- [Vercel felülvizsgálati deployment](docs/deployment.md)
- [Bemutatóverzió – vizuális újratervezés](docs/demo-redesign.md)
- Élő stílusútmutató: `/stilus/` (noindex)

## Munkafolyamat

- Fejlesztés külön ágon (`phase-N/...`), a `main` ágra csak átnézett PR-rel.
- Commit előtt: `npm run verify`.
- Nincs automatikus élesítés, DNS-módosítás vagy fizetős szolgáltatás jóváhagyás nélkül.
