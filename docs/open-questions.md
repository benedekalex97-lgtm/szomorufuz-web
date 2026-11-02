# Nyitott kérdések és hiányzó, ellenőrzendő adatok

Az alábbiak nélkül az oldal nem élesíthető. Minden adat jelölt értéke a `src/content/data/` fájlokban van, `status: 'unverified'` jelöléssel és forrásmegjelöléssel. Review módban (`PUBLIC_CONTENT_MODE=review`) ezek jelölve láthatók – ajánlott a tulajdonossal így átnézni.

## A. Kritikus üzleti adatok (a Szomorúfűz megerősítése szükséges)

| #   | Adat                                        | Jelölt érték (forrás: audit)                                        | Probléma                                                                                                                                            |
| --- | ------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | **Elsődleges, sürgős esetben hívható szám** | +36 1 720 2710                                                      | Az élő oldalon „Információ: +36 30 847-1915” is szerepel, a link pedig a +36 30 313-7920-at hívja (FUN-01). Melyik legyen az egyetlen kiemelt szám? |
| A2  | **Elérhetőség / 0–24 ügyelet**              | „Ügyelet 6:00–22:00”                                                | Van 0–24 halottszállítási ügyelet? Ha nem: mi a teendő 22 és 6 óra között? (UX-09)                                                                  |
| A3  | Izabella utcai iroda címe                   | Izabella u. 65., 1064                                               | A térképlink „Izabella u. 68”-at mutat                                                                                                              |
| A4  | Thököly úti iroda irányítószáma             | Thököly út 167.                                                     | 1146 vagy 1147?                                                                                                                                     |
| A5  | Irányítószámok                              | Nagyenyed u. 1., Pesti út 41/A., Szivacs u. 5.                      | Hiányoznak                                                                                                                                          |
| A6  | Irodánkénti telefonszámok                   | 2–2 szám irodánként                                                 | Mind aktív? Melyiket hívják sürgős esetben?                                                                                                         |
| A7  | Nyitvatartás                                | H–P 8–16 (egységesen)                                               | Irodánként eltér? Hétvége?                                                                                                                          |
| A8  | Irodák koordinátái / térképlink             | –                                                                   | A Google Cégprofilokkal egyeztetendő                                                                                                                |
| A9  | Cégadatok                                   | Szomorúfűz Temetkezési Hálózat Kft., adószám 26704450-2-42          | Megerősítés, székhely, cégjegyzékszám az impresszumhoz                                                                                              |
| A10 | E-mail-cím                                  | budapest@temetkezes.hu                                              | Aktív? Ki kezeli?                                                                                                                                   |
| A11 | Árak                                        | Koporsós temetés 232 288 Ft-tól (élő oldal)                         | Aktuális? Mit tartalmaz? Hamvasztási ár hiányzik (CNV-01)                                                                                           |
| A12 | „Miért a Szomorúfűz?” tények                | 5 iroda; minden temetési mód; saját ravatalozó (IX. ker., Ernő u.?) | Megerősítés. Működési évek, díjak, vélemények csak igazolt forrással                                                                                |

## B. Tartalmi jóváhagyás

| #   | Tétel                                                    | Állapot                                                                                          |
| --- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| B1  | Szolgáltatáskártyák rövid leírásai                       | vázlat (`copyStatus: 'draft'`)                                                                   |
| B2  | „Teendők” 3 lépése a főoldalon                           | vázlat – a cég folyamatát írja le, nem ad hatósági/egészségügyi útmutatást; szakmai átnézés kell |
| B3  | GYIK                                                     | **demonstrációs** tartalom – a valódi kérdés-válasz párokat a cégnek kell megadnia               |
| B4  | Árak szekció bevezető szövege                            | vázlat                                                                                           |
| B5  | Jogi dokumentumok (adatkezelés, sütik, impresszum, ÁSZF) | **nincsenek elkészítve**; jogászi jóváhagyás szükséges                                           |

## C. Döntést igénylő kérdések

| #   | Kérdés                                                                                                                                                     | Javaslat                                                                                                                            |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| C1  | **CMS:** Sanity (Growth csomag a szerkesztői szerepkörhöz, kb. 15 USD/fő/hó – ellenőrizendő) vagy más? Hány munkatárs szerkeszt? Kell-e jóváhagyási lépés? | 1–3 szerkesztőnél a Sanity ingyenes csomag adminisztrátor-szerepkörrel is működhet; ha korlátozott jogosultság kell, Growth csomag. |
| C2  | Hamvasztási pillér-oldal: `/hamvasztasos-temetes/`, `/hamvasztas-urnakiadas/` vagy `/hamvak-temetese/`?                                                    | Search Console-adat alapján (audit: kannibalizáció). Addig a kártya a `/hamvasztasos-temetes/`-re mutat.                            |
| C3  | Új URL-ek jóváhagyása: `/szolgaltatasok/`, `/tudnivalok/`, `/suti-tajekoztato/`                                                                            | Az audit térképében nem szerepelnek; nincs régi megfelelőjük, így SEO-kockázat nincs.                                               |
| C4  | Végleges logó (galamb + szomorúfűz, „Szomorúfűz / Temetkezési szolgáltatások”)                                                                             | Külön jóváhagyási pont; addig szöveges logó.                                                                                        |
| C5  | Fotók                                                                                                                                                      | Jogtiszta, saját fotók (irodák, ravatalozó, munkatársak) – külön döntés.                                                            |
| C6  | Visszahívás-kérés / ajánlatkérő űrlap                                                                                                                      | Csak adatkezelési tájékoztatóval, validációval és tárolási megoldással; ld. 2. fázis.                                               |
| C7  | Mérés (analitika, hívásmérés)                                                                                                                              | Csak sütihozzájárulással; az eszköz kiválasztása (pl. sütimentes megoldás) döntést igényel.                                         |
| C8  | Domain és DNS                                                                                                                                              | Ki a domain jogosultja (audit: szolgáltatói függés)? Ez határozza meg az élesítési tervet.                                          |
| C9  | Vercel-csomag                                                                                                                                              | Kereskedelmi célú oldalhoz a Vercel Hobby csomag nem használható; Pro csomag (fizetős) – jóváhagyás szükséges.                      |

## D. Nem ellenőrzött / korlátozottan ellenőrzött pontok

- Valódi képernyőolvasós teszt (NVDA, VoiceOver) nem készült.
- Valódi mobileszközös teszt (iOS Safari, Android Chrome) nem készült – csak Chromium-emuláció.
- Lighthouse csak helyi, szimulált mérés; terepi (CrUX) adat élesítés előtt nem létezik.
- Firefox / Safari renderelés nem ellenőrzött.
