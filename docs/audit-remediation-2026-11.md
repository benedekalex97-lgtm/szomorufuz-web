# Audit-javítás – 2026. november (SZF-001 … SZF-015)

Ág: `fix/audit-remediation-2026-11` · Alap: `fix/content-reconstruction` @ `438119d` · Dátum: 2026-11-02

> A production (`szomorufuz-web.vercel.app`) a 438119d tartalmát szolgálja ki (a csonka
> „A 2013.” kártyák és a `/hamvasztas-urnakiadas/` oldal csak ezen az ágon léteznek), ezért ez a
> biztonságos alap. A PR #2 (`fix/content-reconstruction` → `phase-1/foundation`) még nincs
> merge-elve; ez az ág arra épül, a PR célja ezért a `fix/content-reconstruction`.
> Production-deploy, merge, DNS- vagy production környezetiváltozó-módosítás **nem történt**.

## 1. Összefoglaló – mi változott

- **Árak (SZF-001):** központi árnyilvántartás forrással, ÁFA-adattal, feltétellel, ellenőrzési
  dátummal és jóváhagyási állapottal. A ravatalozó 65 000 Ft-os ára kiemelt helyen (főoldal,
  meta, GYIK) nem jelenik meg, helyette egyedi árajánlat; a részletes oldalakon csak a forrás
  szerinti feltétellel. Polgári búcsúztatásnál nincs ÁFA-állítás.
- **Űrlapok (SZF-002/003):** 8 űrlap az élő oldal eredeti kérdéseivel, akadálymentes felülettel,
  közös kliens/szerver validációval és védett szerveroldali végponttal (`POST /api/urlap/`).
  Kézbesítés: production-ben **kikapcsolva**, preview-ban **tesztüzem** (semmit nem küld).
- **Adatkezelés (SZF-006):** a tényleges adatfolyamot leíró tervezet; jogalap, megőrzési idő,
  adatfeldolgozók az adatkezelő jóváhagyására várnak (nincsenek kitalálva).
- **Képek és termékek (SZF-004/005):** 44 kép nyilvántartása eredeti URL-lel és jogi státusszal;
  akadálymentes galéria; 7 Sephia termékkártya, urnaterítők, urnaleeresztők, sírjelzők. Igazolt
  jog nélkül **egyetlen kép sem** jelenik meg, és nem kerül a (nyilvános) repóba.
- **Régi URL-ek (SZF-007/012):** a 17 korábban 404-es URL 301-gyel a konkrét termék-, kategória-
  vagy jogszabályhorgonyra mutat; semmi nem irányít a főoldalra.
- **Tartalom és UX (SZF-008–014):** teljes mondatos kártyaszövegek, helyzetválasztó, tartalomjegyzék,
  irodahorgonyok, pontosított árgarancia és iratszöveg, kevesebb ismétlődő kapcsolatblokk.
- **QA (SZF-015):** 38 egységteszt, 45 űrlap-E2E, 16 galéria-, 48 URL- és 303 mobil/a11y-ellenőrzés,
  36 képernyőkép (9 oldal × 4 szélesség), Lighthouse 9 oldalon.

## 2. SZF-státusztábla

| Ticket  | Tárgy                                | Állapot                               | Megjegyzés                                                                                                        |
| ------- | ------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| SZF-001 | Árnyilvántartás, ravatalozó-ár       | **Javítva és tesztelve**              | A „három szolgáltatás” tartalma üzleti tisztázásra vár (lásd 13.)                                                 |
| SZF-002 | Valódi árajánlat-űrlap, backend      | **Implementálva, de aktiválásra vár** | SMTP + jóváhagyott tájékoztató kell (lásd 14.)                                                                    |
| SZF-003 | Szolgáltatásspecifikus űrlapok       | **Implementálva, de aktiválásra vár** | Ugyanaz a végpont; CTA → `?szolgaltatas=`                                                                         |
| SZF-004 | Ravatalozó galéria                   | **Üzleti döntésre vár**               | Galéria kész és tesztelt; a 6 fotó jogát igazolni kell                                                            |
| SZF-005 | Urnák, textíliák, sírjelzők          | **Részben kész**                      | Termékadatok kész; képek jogigazolásra várnak                                                                     |
| SZF-006 | Adatkezelési tájékoztató             | **Implementálva, de aktiválásra vár** | Tervezet; adatkezelői jóváhagyás kell                                                                             |
| SZF-007 | 17 régi 404-es URL                   | **Javítva és tesztelve**              | Helyi emulátorral; éles ellenőrzés deploy után                                                                    |
| SZF-008 | Csonka kártyaszövegek                | **Javítva és tesztelve**              | Gyökérok: mondatbontó (`src/lib/excerpt.ts`)                                                                      |
| SZF-009 | Helyzetválasztó, tartalomjegyzék     | **Javítva és tesztelve**              |                                                                                                                   |
| SZF-010 | Irodahorgonyok                       | **Javítva és tesztelve**              | Lábléc-linkek most a kártyára mutatnak                                                                            |
| SZF-011 | Árgarancia-összefoglaló              | **Javítva és tesztelve**              |                                                                                                                   |
| SZF-012 | Visszajelző kérdőív                  | **Üzleti döntésre vár**               | A régi URL 301 → kapcsolatfelvételi űrlap                                                                         |
| SZF-013 | Iratokkal kapcsolatos rövid szövegek | **Javítva és tesztelve**              | Forrás: `/szukseges-iratok/`                                                                                      |
| SZF-014 | Ismétlődő kapcsolatblokkok           | **Javítva és tesztelve**              | Mobilon 3–4 → 1–2 (hívósáv marad)                                                                                 |
| SZF-015 | Mobil és a11y QA                     | **Részben kész**                      | Automatikus tesztek zöldek; LCP labor 2,7–2,9 s (cél 2,5 s); valódi eszközös és képernyőolvasós teszt nem történt |

## 3. Fájlok és commitok

| Commit    | Tartalom                                                                |
| --------- | ----------------------------------------------------------------------- |
| `af11f14` | SZF-001 árnyilvántartás                                                 |
| `0268df2` | SZF-002/003 űrlaprendszer, végpont, adapter, tesztek                    |
| `df2b3bc` | SZF-006 adatkezelési tervezet                                           |
| `5170f65` | Vercel preview engedélyezése ezen az ágon                               |
| `ba25d11` | SZF-004/005/007/012 képnyilvántartás, katalógus, galéria, átirányítások |
| `1cd5e2b` | SZF-008 kivonatok                                                       |
| `c7c0246` | SZF-009/011/013/014                                                     |
| `c5b14a7` | SZF-010/015 QA-javítások és -szkriptek                                  |
| `c6df3c0` | Telefonszám-tesztek                                                     |

Fő új fájlok: `src/content/data/prices.ts`, `src/lib/prices.ts`, `src/forms/*`
(definíciók, validáció, biztonság, kézbesítés, kezelő, üzenetek, mód), `src/pages/api/urlap.ts`,
`src/components/forms/{Form,QuoteForms}.astro`, `src/scripts/forms.ts`,
`src/content/data/{image-register,products}.ts`, `src/components/media/{Gallery,ProductCatalog}.astro`,
`src/lib/excerpt.ts`, `scripts/build/vercel-headers.mjs`, `scripts/qa/{vercel-local,forms-e2e,gallery-e2e,url-migration,audit-qa}.mjs`,
`tests/*.test.ts`, `vitest.config.ts`.

## 4. Árforrás-nyilvántartás (`src/content/data/prices.ts`)

| Tétel                          | Összeg     | -tól | ÁFA             | Feltétel                                                                                                                 | Forrás                  | Ellenőrizve | Jóváhagyás | Kiemelhető                      |
| ------------------------------ | ---------- | ---- | --------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ----------- | ---------- | ------------------------------- |
| Koporsós temetési díj          | 232 288 Ft | igen | 27% benne       | –                                                                                                                        | `/koporsos-temetes/`    | 2026-11-02  | vár        | igen                            |
| Ravatalozó terem díja          | 65 000 Ft  | igen | 27% benne       | „A fenti árak a három szolgáltatás egy időben történő megrendelésekor és egyszerre történő igénybevételekor érvényesek!” | `/ravatalozo-terem/`    | 2026-11-02  | vár        | **nem** (feltétel tisztázatlan) |
| Polgári búcsúztatás díja       | 35 000 Ft  | igen | **nem igazolt** | –                                                                                                                        | `/polgari-bucsuztatas/` | 2026-11-02  | vár        | igen (ÁFA nélkül)               |
| Sephia fém díszurna (7 termék) | 23 900 Ft  | nem  | 27% benne       | –                                                                                                                        | `/termek-adatlapok/…`   | 2026-11-02  | vár        | igen                            |

Megjelenés: főoldali árkártya „Egyedi árajánlat” (ravatalozó); `/arak/` és `/ravatalozo-terem/`:
összeg + kiemelt feltételdoboz; a ravatalozó meta-címe/leírása és a GYIK-válasz ár nélkül.
Hamvasztásos csomagár **nincs** (nem volt publikált ár). Teszt: `tests/prices.test.ts`.

## 5. Űrlapmező-térkép

Minden kérdés és válaszlehetőség szó szerint az élő oldalról (2026-11-02; elírások javítva:
„Budapesten¸” → „Budapesten,”, „Közterülten” → „Közterületen”, „meg vannak” → „megvannak”).
(*) = kötelező, ahogy az eredetiben.

| Űrlap (új azonosító) | Régi azonosító / oldal                                                      | Mezők                                                                                                                                                                                                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `arajanlat`          | form_1465 · /arajanlat-keres-itt/                                           | Temetés típusa* (Hamvasztásos/Koporsós); Hol kívánja nyugalomra helyezni (5 opció); hely megnevezése; Van-e sírhely (4); Sírhely típusa (6); Hol történt a haláleset* (4); Hol fekszik az elhunyt* (5); Közelebbi megnevezése*; Elhunyt neve*; Megjegyzés; Milyen formában kéri* (e-mail/visszahívás); Név*, E-mail*, Telefon* |
| `hamvasztasos`       | form_1483 · hamvasztásos, urnakiadás, hazavitel, hamvak temetése, szociális | Hol kívánja elhelyezni a hamvakat* (5); Temető/templom neve; Sírhely (4); Sírhely típusa (5); Hol fekszik* (5); Kórház/temető neve*; Elhunyt neve; Megjegyzés; Ajánlat formája*; Név*, E-mail*, Telefon*                                                                                                                       |
| `koporsos`           | form_1528 · /koporsos-temetes/                                              | Végső nyugalom helye* (3); Temető neve; Sírhely (2); Sírkő (3); Hol fekszik* (5); Kórház/temető neve*; Elhunyt neve*; Megjegyzés; Árajánlat formája; Név*, E-mail*, Telefon*                                                                                                                                                   |
| `szoras`             | form_1641 · temetői szórás, dunai (hajós) szórás                            | Szórás helye* (5); Temető/templom neve; Haláleset helye (4); Hol fekszik* (5); Kórház/temető neve*; Elhunyt neve; Megjegyzés; Ajánlat formája; Név*, E-mail*, Telefon*                                                                                                                                                         |
| `ravatalozo`         | form_3358 · /ravatalozo-terem/                                              | Megtörtént-e a hamvasztás* (3); Haláleset helye (5); település; Hol fekszik (5); település; Szolgáltatások (4 jelölőnégyzet); Szertartás dátuma; Elhunyt neve*; Megjegyzés; Név*, E-mail*, Telefon*                                                                                                                            |
| `termek`             | interest_form · termékadatlapok                                             | Termék* (7 Sephia, név + kód); Üzenet*; Név; E-mail*; Telefon*                                                                                                                                                                                                                                                                 |
| `kapcsolat`          | form_3863 · /elerhetoseg/                                                   | Név*, E-mail*, Telefon, Kérdés vagy kérés, Elhunyt neve                                                                                                                                                                                                                                                                        |
| `visszahivas`        | form_1973 · /tajekoztatas-keres/                                            | Név*, Telefon*, Mikor hívjuk fel (szabad szöveg, kitalált idősáv nélkül), Téma                                                                                                                                                                                                                                                 |

Minden űrlapon kötelező: „Elolvastam az adatkezelési tájékoztatót” (tudomásulvétel – nem
hozzájárulás; a jogalapról lásd 7.). Szolgáltatás-azonosítók (`?szolgaltatas=`):
`hamvasztasos-temetes`, `hamvasztas-urnakiadas`, `hamvak-hazavitele` (előkitöltés: hazavitel),
`hamvak-temetese`, `szocialis-temetes`, `koporsos-temetes`, `hamvak-szorasa-temeto` (temető),
`hamvak-szorasa-dunaba` (hajóról a Dunába), `ravatalozo-terem` (ravatalozó terem), `termek` (+`&termek=<kód>`).

## 6. Backend-architektúra

- Astro statikus oldalak + **egyetlen** szerveroldali végpont: `src/pages/api/urlap.ts`
  (`prerender = false`, `@astrojs/vercel` → Vercel Function, Node 22).
- Feldolgozás (`src/forms/handler.ts`, keretrendszer-független, egységtesztelt):
  méretkorlát (32 KB) → Origin/Referer egyezés (CSRF; süti/munkamenet nincs) → tartalomtípus
  (urlencoded/JSON) → űrlap-azonosító → **rate limit** (5 / 10 perc / kliens, sózott IP-kivonat) →
  **robotszűrés** (honeypot, < 2,5 s kitöltés; robotnak látszólagos siker, küldés nélkül) →
  **idempotencia-kulcs** (dupla beküldés: egy e-mail; párhuzamos: 409) → mezőellenőrzés
  (opciólista, hossz, e-mail, telefon, vezérlőkarakter/sortörés-szűrés) → kézbesítés.
- Az Astro beépített Origin-ellenőrzése (`checkOrigin`) további réteg.
- **Siker csak akkor**, ha a kézbesítő elfogadta az üzenetet; „elfogadva” ≠ „kézbesítve”.
- Kézbesítési módok (`FORMS_DELIVERY`): `disabled` (production alapértelmezés, 503 +
  telefonos alternatíva, az űrlap letiltva és jelölve), `dry-run` (Vercel preview / helyi
  fejlesztés alapértelmezés: ellenőriz, semmit nem küld, jól látható „Tesztüzem” jelzés), `smtp`
  (nodemailer, kötelező TLS, időkorlátok).
- E-mail: fix címzett (`FORMS_RECIPIENT`) és feladó (`FORMS_FROM`), tárgyban nincs felhasználói
  adat, csak szöveges törzs, `Reply-To` csak ellenőrzött címmel.
- Naplózás: `{event, form, outcome, status, ms}` – név, elérhetőség, üzenet és IP nélkül.
- JavaScript nélkül: hagyományos POST, egyszerű, escape-elt HTML-válaszoldal.
- Környezeti változók (csak nevek): `FORMS_DELIVERY`, `FORMS_RECIPIENT`, `FORMS_FROM`,
  `FORMS_ALLOWED_ORIGINS`, `FORMS_RATE_SALT`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`,
  `SMTP_USER`, `SMTP_PASS`; Vercel által: `VERCEL_ENV`. Lásd `.env.example`.
- **Noindex-védelem:** az adapter saját routingot ír, ezért a `vercel.json` fejléceit
  (X-Robots-Tag: noindex, nofollow stb.) a `scripts/build/vercel-headers.mjs` a
  `.vercel/output/config.json`-ba is beírja; a build megszakad, ha a noindex szabály hiányzik.
  Az átirányítások egyetlen forrása az `astro.config.mjs` (`vercel.json`-ból kikerültek).
- Korlát: a rate limit és az idempotencia-tár példányonként memóriában él (serverless).
  Élesítés előtt javasolt megosztott tár (pl. Upstash Redis) vagy Vercel Firewall rate-limit szabály.

## 7. Adatkezelési döntési pontok

A `/adatkezeles/` tervezet csak ténylegesen igaz állításokat tartalmaz (adatkör, adatút,
naplózás, sütik hiánya, érintetti jogok, NAIH). **Az adatkezelő döntése kell:**

1. Az adatkezelő megnevezése – a régi tájékoztató más cégnevet és címet tartalmazott; a
   tervezet a Céginformációk szerinti Szomorúfűz Temetkezési Hálózat Kft.-t nevezi meg.
2. Jogalap(ok) űrlaponként (pl. szerződéskötést megelőző lépés / jogos érdek / hozzájárulás).
3. Megőrzési idő (beérkezett e-mailek, árajánlatok).
4. Adatfeldolgozók és címzettek (tárhely: Vercel; e-mail-szolgáltató; ügyfélszolgálati postafiók).
5. Az elhunytra vonatkozó adatok kezelése (név, haláleset helye).
6. A „tudomásulvétel” jelölőnégyzet maradjon-e, vagy hozzájárulás kell (jogalapfüggő).
7. A végleges szöveg jogi lektorálása.

## 8. Képjogosultsági nyilvántartás (`src/content/data/image-register.ts`)

Forrás: `szomorufuz-webaudit/assets/image-inventory.csv`. **Egyetlen kép jogosultsága sincs
igazolva**, ezért egyik sem jelenik meg, és képfájl nem került a nyilvános repóba. Generált vagy
stockkép nem pótolja a hiányzó eredetit. Aktiválás képenként: jogigazolás → fájl a „Új cél”
útvonalra (`public/` alá) → `rights: 'jovahagyott'`, `rightsEvidence` kitöltése.

| Kép-ID            | Csoport        | Név                                    | Kód     | Eredeti URL                                                                | Új cél                                  | Jogi státusz    |
| ----------------- | -------------- | -------------------------------------- | ------- | -------------------------------------------------------------------------- | --------------------------------------- | --------------- |
| IMG-342 … IMG-347 | ravatalozo     | Ravatalozó terem – 1–6. kép            | –       | `/pages/avszomfuzbud/contents/gallery/40/12405/…_pic_600x500.jpg`          | `/images/ravatalozo/ravatalozo-1…6.jpg` | nem ellenőrzött |
| IMG-233           | sephia         | Fejfa                                  | 0102001 | `/pages/avszomfuzbud/contents/datasheet/uploads/517/datasheet_600x500.jpg` | `/images/urnak/fejfa-0102001.jpg`       | nem ellenőrzött |
| IMG-227           | sephia         | Alkonyat                               | 0102002 | `…/datasheet/uploads/1312/datasheet_600x500.jpg`                           | `/images/urnak/alkonyat-0102002.jpg`    | nem ellenőrzött |
| IMG-228           | sephia         | Cédrus                                 | 0102003 | `…/datasheet/uploads/1313/datasheet_600x500.jpg`                           | `/images/urnak/cedrus-0102003.jpg`      | nem ellenőrzött |
| IMG-229           | sephia         | Csend                                  | 0102004 | `…/datasheet/uploads/1317/datasheet_600x500.jpg`                           | `/images/urnak/csend-0102004.jpg`       | nem ellenőrzött |
| IMG-230           | sephia         | Erdő                                   | 0102005 | `…/datasheet/uploads/1318/datasheet_600x500.jpg`                           | `/images/urnak/erdo-0102005.jpg`        | nem ellenőrzött |
| IMG-231           | sephia         | Liliom                                 | 0102006 | `…/datasheet/uploads/1319/datasheet_600x500.jpg`                           | `/images/urnak/liliom-0102006.jpg`      | nem ellenőrzött |
| IMG-232           | sephia         | Vízpart                                | 0102007 | `…/datasheet/uploads/1320/datasheet_600x500.jpg`                           | `/images/urnak/vizpart-0102007.jpg`     | nem ellenőrzött |
| IMG-348 … IMG-356 | sirjelzok      | 9 sírjelző (pl. Art urnakereszt natúr) | –       | `…/gallery/75/37870/…`                                                     | `/images/sirjelzok/<név>.jpg`           | nem ellenőrzött |
| IMG-357 … IMG-369 | urnateritok    | 13 urnaterítő (pl. Légcsipke 1)        | –       | `…/gallery/76/37871/…`                                                     | `/images/textiliak/<név>.jpg`           | nem ellenőrzött |
| IMG-370 … IMG-378 | urnaleeresztok | 9 urnaleeresztő (pl. Tüll fehér)       | –       | `…/gallery/76/37872/…`                                                     | `/images/textiliak/<név>.jpg`           | nem ellenőrzött |

A Sephia-termékkép ↔ termékkód párosítás a régi adatlap-azonosító (517, 1312–1320) alapján
ellenőrzött. A teljes, soronkénti lista a forrásfájlban van (44 bejegyzés).

## 9. URL-migrációs tábla (17 korábban 404-es URL)

| Régi URL                                                                                      | Válasz | Új cél                                                          |
| --------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------- |
| `/sirjelzo/`                                                                                  | 301    | `/urnak/#sirjelzok`                                             |
| `/textiliak/`                                                                                 | 301    | `/urnak/#textiliak`                                             |
| `/visszajelzes-kuldese/`                                                                      | 301    | `/elerhetoseg/#uzenet` (SZF-012: a kérdőív üzleti döntésre vár) |
| `/termek-adatlapok/fejfa-sephia-kezzel-festett-femurna-0102001/517/`                          | 301    | `/urnak/#fejfa-0102001`                                         |
| `/termek-adatlapok/alkonyat-sephia-kezzel-festett-urna-0102002/1312/`                         | 301    | `/urnak/#alkonyat-0102002`                                      |
| `/termek-adatlapok/cedrus-sephia-kezzel-festett-femurna-0102003/1313/`                        | 301    | `/urnak/#cedrus-0102003`                                        |
| `/termek-adatlapok/csend-sephia-kezzel-festett-femurna-0102004/1317/`                         | 301    | `/urnak/#csend-0102004`                                         |
| `/termek-adatlapok/erdo-sephia-kezzel-festett-femurna-0102005/1318/`                          | 301    | `/urnak/#erdo-0102005`                                          |
| `/termek-adatlapok/liliom-sephia-kezzel-festett-femurna-0102006/1319/`                        | 301    | `/urnak/#liliom-0102006`                                        |
| `/termek-adatlapok/vizpart-sephia-kezzel-festett-femurna-0102007/1320/`                       | 301    | `/urnak/#vizpart-0102007`                                       |
| `/jogszabalyok/1999-evi-xliii-torveny-a-temetokrol-es-a-temetkezesrol/24177/`                 | 301    | `/jogszabalyok/#tv-1999-xliii`                                  |
| `/jogszabalyok/145-1999-x-1-korm-rendelet-a-temetokrol-es-a-temetkezesrol/24178/`             | 301    | `/jogszabalyok/#korm-145-1999`                                  |
| `/jogszabalyok/146-1999-x-1-korm-rendelet-a-nemzeti-kegyeleti-bizottsag-szervezeterol/24179/` | 301    | `/jogszabalyok/#korm-146-1999`                                  |
| `/jogszabalyok/2005-evi-xxi-torveny/24180/`                                                   | 301    | `/jogszabalyok/#tv-2005-xxi`                                    |
| `/jogszabalyok/34-1999-ix-24-bm-eum-im-egyuttes-rendelet/24181/`                              | 301    | `/jogszabalyok/#bm-eum-im-34-1999`                              |
| `/jogszabalyok/2013-evi-cxxxviii-torveny/24182/`                                              | 301    | `/jogszabalyok/#tv-2013-cxxxviii`                               |
| `/jogszabalyok/379-2013-x-25-korm-rendelet/24183/`                                            | 301    | `/jogszabalyok/#korm-379-2013`                                  |

Jogszabályok: a régi (elavulható) szövegek nem kerültek át; a `/jogszabalyok/` oldal a
hivatalos Nemzeti Jogszabálytárra (njt.hu) utal. Jogszabály-mélylinkeket nem tettünk be, mert
az njt.hu ebből a környezetből nem volt elérhető, így nem ellenőrizhetők.
Ellenőrzés: `npm run qa:urls` – 48 régi URL (31 korábbi + 17 új): mind 200 vagy egyetlen 301
létező oldalra, minden horgony létezik, semmi nem megy a főoldalra, a perjel nélküli változat
308, ismeretlen URL 404. Teljes tábla: `docs/qa/url-migration.md`.

## 10. Tesztelési eredmények

| Ellenőrzés                 | Parancs                                | Eredmény                                                                                                                                                                                                                                                                                                                                         |
| -------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Típusellenőrzés            | `npm run check`                        | 0 hiba                                                                                                                                                                                                                                                                                                                                           |
| Lint / formázás            | `npm run lint`, `npm run format:check` | 0 hiba                                                                                                                                                                                                                                                                                                                                           |
| Egységtesztek              | `npm test`                             | **38/38** (árak, űrlap-validáció, szolgáltatásspecifikus mezők, szerverhibák, dupla beküldés, e-mail-adapter, rate limit, napló személyes adat nélkül, kivonatok, telefonszámok)                                                                                                                                                                 |
| Űrlap-E2E (dry-run build)  | `npm run qa:forms`                     | **45/45** (hibaösszesítő + fókusz, aria-invalid, adatmegőrzés, siker csak szerverválasz után, dupla kattintás = 1 POST, 7 szolgáltatásváltozat + termékkód, szerver- és hálózati hiba, billentyűzet, axe hibaállapotban is, JS nélküli beküldés)                                                                                                 |
| Galéria-E2E                | `npm run qa:gallery`                   | **16/16** (Enter/Escape, fókusz-visszaadás, ←/→, fókusz a dialógusban, axe; éles oldalon igazolt kép nélkül nincs galéria)                                                                                                                                                                                                                       |
| URL-migráció               | `npm run qa:urls`                      | **48 URL, 0 hiba**                                                                                                                                                                                                                                                                                                                               |
| Mobil / a11y               | `npm run qa:audit`                     | **303/303** (9 oldal × 4 szélesség: túlcsordulás, 24 px alatti célpont nincs, 44 px alatti önálló célpont nincs, 1 H1, noindex, lang/viewport, nincs canonical, hívósáv csak mobilon, axe WCAG 2.2 AA 0 hiba; mobilmenü, horgonyok a ragadós fejléc alatt, lábléc-horgonyok, nincs helykérés, 200% nagyítás, csökkentett mozgás, látható fókusz) |
| Tartalmi QA                | `npm run qa:content`                   | sikeres (tel: linkek = megjelenített szám, nincs link nélküli szám, tiltott szavak nincsenek, irodaadatok egyeznek)                                                                                                                                                                                                                              |
| Böngészős QA (6 szélesség) | `npm run qa:browser`                   | sikeres                                                                                                                                                                                                                                                                                                                                          |

Valódi ügyféladat egyik tesztben sem szerepelt; e-mail nem ment ki (dry-run / memóriaadapter).
Nem tesztelt: valódi mobileszköz, képernyőolvasó (NVDA/VoiceOver) kézi tesztje, valódi SMTP-küldés.

## 11. Mobil képernyőképek

`docs/screenshots/audit-2026-11/` – `<oldal>-<szélesség>.jpg` teljes oldalas képek:
főoldal, teendők, árajánlat, elérhetőség, árak, urnák, ravatalozó, szolgáltatások, tudnivalók ×
320 / 390 / 768 / 1440 px (36 kép), továbbá `mobilmenu-nyitva-390.jpg`,
`nagyitas-200-elerhetoseg.jpg`. Űrlap- és galériaállapotok: `docs/screenshots/forms/`
(hibaösszesítő, siker, szerverhiba, ravatalozó-változat, nyitott galéria).

## 12. Teljesítmény

Lighthouse 12, mobil profil (szimulált lassú 4G, 4× CPU), a lefordított kimeneten, helyi
emulátorral gzip-tömörítéssel (`docs/qa/lighthouse.json`):

| Oldal                                                         | Teljesítmény | A11y | LCP   | CLS | TBT  |
| ------------------------------------------------------------- | ------------ | ---- | ----- | --- | ---- |
| `/`                                                           | 96           | 100  | 2,9 s | 0   | 0 ms |
| `/teendok-halaleset-utan/`                                    | 96           | 100  | 2,9 s | 0   | 0 ms |
| `/arajanlat-keres-itt/`                                       | 95           | 100  | 2,9 s | 0   | 0 ms |
| `/elerhetoseg/`                                               | 95           | 100  | 2,9 s | 0   | 0 ms |
| `/arak/`, `/urnak/`, `/ravatalozo-terem/`, `/szolgaltatasok/` | 96           | 100  | 2,9 s | 0   | 0 ms |
| `/tudnivalok/`                                                | 96           | 100  | 2,7 s | 0   | 0 ms |

- CLS ≤ 0,1: **teljesül** (0). LCP ≤ 2,5 s: laborban **nem teljesül** (2,7–2,9 s). Az LCP-elem a
  bevezető bekezdés; a négy előtöltött betűtípus (~258 KB) a szűk keresztmetszet. A dőlt
  betűtípus előtöltésének elhagyása mérhető javulást nem hozott, ezért visszaállítottuk.
  Javaslat: betűtípus-részhalmazolás (csak a használt karakterek), vagy `font-display: optional`
  a törzsszövegre – dizájndöntés. A Vercel CDN-en (HTTP/2, brotli) mért értékek ettől eltérhetnek.
- INP: valós felhasználói adat nincs, nem mértük (ahogy kérve).

## 13. Nyitott kockázatok

1. **Rate limit és idempotencia memóriában** – serverless példányok között nem osztott.
2. **Noindex** – a fejlécek a Build Output API configba is bekerülnek (build-ellenőrzéssel);
   a preview védett (Vercel Authentication), így ott kívülről nem volt mérhető.
3. **Vercel-hozzáférés** – az MCP-kapcsolat nem látja a projektet (404/403); a production
   ág beállítását és a preview-t nem tudtuk közvetlenül lekérdezni.
4. **LCP** laborban 2,7–2,9 s.
5. **A külföldi hazaszállítás** „garanciával vállaljuk … rövid időn belüli hazaszállítását”
   mondata az élő oldalról származik, de üzletileg megerősítendő.
6. **njt.hu mélylinkek** nincsenek (nem ellenőrizhetők innen).
7. **Kötelező mezők** az eredeti szerint (pl. e-mail visszahívás kérésekor is) – UX-szempontból
   felülvizsgálható.

## 14. Üzleti kérdések

1. Melyik a ravatalozó-ár feltételében szereplő „három szolgáltatás”? Kiemelhető-e az ár?
2. Tartalmazza-e a polgári búcsúztatás 35 000 Ft-os díja az ÁFA-t?
3. Jóváhagyják-e az árnyilvántartás tételeit (állapot: `jovahagyasra-var`)?
4. Melyik postafiókba érkezzenek az űrlapok, melyik SMTP-szolgáltatón át, mi a jóváhagyott tesztpostafiók?
5. Adatkezelési döntések (7. fejezet).
6. A ravatalozó 6 fotója a cég sajátja-e (írásos igazolás)? A Sephia termékképek felhasználását
   engedélyezte-e a gyártó? Vagy új fotózás készüljön?
7. Visszaálljon-e az anonim visszajelző kérdőív (SZF-012)? Eredeti kérdéscsoportok: temetés
   típusa; időben kapta-e az ajánlatot; kedvező volt-e az ár; részletes volt-e az ajánlat;
   egyezett-e a honlappal; miért nem rendelt (6 jelölőnégyzet); melyik cégnél rendelt; érvek;
   egyéb közlendő; opcionális név.
8. A +36 1 720 2710 (Céginformációk) még használt szám-e?
9. Zugló irányítószáma 1146 vagy 1147? Ravatalozó befogadóképessége 35+30 vagy 40+40–50 fő?
10. Megerősíthető-e a külföldi hazaszállításra vonatkozó garancia?
11. Melyik ág a Vercel production ága (a production jelenleg a `fix/content-reconstruction` tartalmát mutatja)?

## 15. Production-előfeltételek (aktiválási lista)

1. PR-sorrend: PR #2 → ez a PR; merge csak jóváhagyással, production-deploy külön jóváhagyással.
2. Jóváhagyott adatkezelési tájékoztató közzététele (`/adatkezeles/`, a „Tervezet” jelzés eltávolítása).
3. SMTP-fiók és környezeti változók beállítása a Vercelben (csak a nevek: lásd 6.); első próba
   kizárólag jóváhagyott tesztpostafiókkal, `FORMS_DELIVERY=smtp` csak ezután production-ben.
4. Megosztott rate-limit tár vagy Vercel Firewall szabály.
5. Éles domain felvétele a `FORMS_ALLOWED_ORIGINS`-be (ha az űrlap más originről is küld).
6. Képek: jogigazolás képenként, majd fájl + `rights: 'jovahagyott'`.
7. Az árnyilvántartás jóváhagyása; a ravatalozó-feltétel tisztázása.
8. Deploy után: `npm run qa:deploy -- --base <URL>` és a régi URL-ek ellenőrzése az éles hoston.
9. Indexelés bekapcsolása (`PUBLIC_SITE_ENV=production`) csak a SEO-migrációs terv szerint.
