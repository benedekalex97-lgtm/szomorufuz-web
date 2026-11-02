# Vercel – felülvizsgálati production deployment

**Állapot (2026-11-02): BLOKKOLT – nincs írási jogosultság a Vercelhez.** Deployment nem készült.

## Cél

Az 1. fázis belső felülvizsgálata valós URL-en (`*.vercel.app`). Ez **nem** a végleges élesítés:

- nincs saját domain;
- nincs DNS-módosítás;
- a budapest-temetkezes.hu változatlan;
- a keresőindexelés tiltott.

## Ellenőrzött kiinduló állapot

| Elem                     | Érték                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| Repository / ág          | `benedekalex97-lgtm/szomorufuz-web` · `phase-1/foundation`                                 |
| Deployolandó commit      | `d27224ccf4033c79dee39cfadb93a16ae059278f`                                                 |
| Vercel-fiók              | `benedekalex97-lgtm` (Hobby csomag), team: `team_ZY2tAwqhE5YVlhLauornCiko`                 |
| Meglévő Vercel-projektek | nincs (névütközés nincs)                                                                   |
| Build                    | `npm ci` → `npm run build` → statikus `dist/` (20 oldal)                                   |
| Helyi ellenőrzés         | `npm ci` ✅ · `npm run verify` ✅ (check, lint, formázás, build) · `npm run qa:browser` ✅ |

## Mi blokkolt?

A Claude-munkamenet Vercel-összekötőjén keresztül:

- `POST /v11/projects` (projekt létrehozása) → **403 forbidden**;
- `POST /v13/deployments` (production deployment GitHub-commitból) → **403 forbidden** („You don't have permission to create a project”).

A munkamenetben nincs Vercel CLI-token. A hitelesítést nem kerültük meg.

## Szükséges felhasználói művelet (egyik)

1. **Ajánlott:** Vercel-token beállítása a felhőkörnyezetben `VERCEL_TOKEN` néven (a munkamenet címsorában a környezet menüje → Edit → Network secrets / API credentials vagy környezeti változó). A token kerüljön a csak ehhez a teamhez szűkített hozzáférésbe, és lejárati idővel. **Ne illeszd be a chatbe.** Egy új munkamenet már látja.
2. A Vercel-összekötő jogosultságainak ellenőrzése a claude.ai connector-beállításokban (írási jog a projektekhez és deploymentekhez).

## Tervezett eljárás (a hozzáférés után)

```bash
npm ci && npm run verify
npx vercel@latest link --yes --project szomorufuz-web --scope benedekalex97-lgtm
npx vercel@latest env add PUBLIC_SITE_ENV production      # érték: preview
npx vercel@latest env add PUBLIC_CONTENT_MODE production  # érték: strict
npx vercel@latest deploy --prod --skip-domain
npm run qa:deploy -- --base https://<deployment-url>
```

- `--skip-domain`: a production build nem kap automatikusan domain-aliast; csak a generált deployment URL él.
- A projekt **nincs Git-hez kötve**. A `vercel.json` `git.deploymentEnabled: false` beállítása akkor is tiltja az automatikus deployt, ha valaki később összeköti.

## Indexelés elleni védelem (a kódban kész)

| Réteg                      | Beállítás                                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| HTTP-fejléc                | `X-Robots-Tag: noindex, nofollow` minden válaszon (`vercel.json`)                                    |
| HTML                       | `<meta name="robots" content="noindex, nofollow">` minden oldalon (`PUBLIC_SITE_ENV` ≠ `production`) |
| robots.txt                 | `User-agent: * / Disallow: /`                                                                        |
| Sitemap                    | nem készül                                                                                           |
| Canonical, og:url, JSON-LD | nem jelenik meg, így nincs hivatkozás az éles domainre                                               |

A noindex **nem hozzáférés-védelem**: aki ismeri az URL-t, megnyithatja.

**Javaslat:** Vercel Deployment Protection → Vercel Authentication (Standard Protection) bekapcsolása. Ez minden csomagban elérhető, és a generált deployment URL-eket bejelentkezéshez köti. Külső átnézőnek időkorlátos megosztási link adható. A „minden deployment” védelem és a jelszavas védelem fizetős (Pro) – csak külön jóváhagyással.

## Deployment utáni QA

A `scripts/qa/deploy-qa.mjs` a valódi URL-en ellenőrzi:

- HTTP-státuszok és az összes belső oldal bejárása;
- `X-Robots-Tag` fejléc, meta robots;
- canonical és JSON-LD hiánya;
- robots.txt, sitemap hiánya, 404-oldal;
- assetek (CSS, JS, fontok);
- konzolhibák és hibás kérések;
- mobilmenü és navigáció;
- axe-core;
- képernyőképek (390 és 1440 px, `docs/screenshots/deploy/`).

## Teendő a valódi élesítéskor (6. fázis)

- `X-Robots-Tag` eltávolítása a `vercel.json`-ból.
- `PUBLIC_SITE_ENV=production` beállítása csak az éles környezetben.
- Saját domain bekötése.
- Az automatikus deploy szabályainak újragondolása.
