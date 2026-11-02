import type { Fact, Homepage } from '../types';

const claim = (source: string, note?: string): Fact<true> => ({
  value: true,
  status: 'unverified',
  source,
  ...(note ? { note } : {}),
});

/**
 * Főoldal. A hero főüzenete és alcíme a briefből származik (jóváhagyott);
 * minden más szöveg szerkesztői TERVEZET (copyStatus: 'draft'), tényállítást
 * (évszám, ügyfélszám, díj, 0–24, ár, garancia) nem tartalmaz.
 */
export const homepage: Homepage = {
  seo: {
    title: 'Szomorúfűz Temetkezés – segítség a nehéz pillanatokban',
    description:
      'Segítünk eligazodni a haláleset utáni teendőkben, és támogatást nyújtunk a búcsúztatás megszervezésében. Hamvasztás, hagyományos temetés, budapesti irodák.',
  },
  hero: {
    eyebrow: 'Temetkezés · Budapest',
    title: 'Nincs egyedül',
    titleEmphasis: 'a nehéz pillanatokban.',
    lead: 'Segítünk eligazodni a szükséges teendőkben, és támogatást nyújtunk a búcsúztatás megszervezésében.',
    primaryCtaLabel: 'Telefonos segítség',
    secondaryCta: { label: 'Teendők haláleset esetén', href: '/teendok-halaleset-utan/' },
    paths: [
      {
        label: 'Ha most történt',
        title: 'Haláleset történt',
        body: 'Az első lépések nyugodt sorrendben.',
        href: '/teendok-halaleset-utan/',
      },
      {
        label: 'Szervezés',
        title: 'Temetést szervezne',
        body: 'Hamvasztás, hagyományos temetés, búcsúztatás.',
        href: '/szolgaltatasok/',
      },
      {
        label: 'Személyesen',
        title: 'Beszélne velünk',
        body: 'Telefonon vagy budapesti irodáinkban.',
        href: '/elerhetoseg/',
      },
    ],
  },
  firstSteps: {
    eyebrow: 'Ha most történt',
    title: 'Az első órákban',
    intro:
      'Egy haláleset után sok kérdés merül fel egyszerre. Nem kell mindenre azonnal választ tudnia – ez a három lépés elég a kezdéshez.',
    steps: [
      {
        title: 'Hívjon minket',
        body: 'Elmondjuk, mi a következő lépés az Ön helyzetében, és mire lesz szükség.',
      },
      {
        title: 'Készítse elő az iratokat',
        body: 'Az elhunyt személyes iratainak listáját részletes útmutatónkban találja.',
      },
      {
        title: 'Egyeztessünk',
        body: 'Irodánkban vagy telefonon, az Ön tempójában beszéljük meg a búcsú módját, helyét és idejét.',
      },
    ],
    cta: { label: 'A teljes útmutató', href: '/teendok-halaleset-utan/' },
    copyStatus: 'draft',
  },
  services: {
    eyebrow: 'Szolgáltatások',
    title: 'A búcsú formái',
    intro:
      'Minden család másként búcsúzik. Bemutatjuk a lehetőségeket, a döntés az Öné – és ha bizonytalan, segítünk mérlegelni.',
    featured: [
      {
        title: 'Hamvasztás',
        body: 'A hamvasztás után a hamvak elhelyezéséről a család dönt: temetőben, szórással vagy a Dunán is búcsúzhat.',
        href: '/hamvasztasos-temetes/',
        points: [
          'Urnás temetés temetőben',
          'Hamvak szórása',
          'Búcsú a Dunán',
          'Az urna hazavitele',
        ],
      },
      {
        title: 'Hagyományos temetés',
        body: 'Koporsós búcsúztatás temetőben, a család kívánsága szerinti szertartással.',
        href: '/koporsos-temetes/',
        points: [
          'Ravatalozás és búcsúztatás',
          'Egyházi vagy polgári szertartás',
          'Koporsó és kellékek kiválasztása',
          'Az időpont egyeztetése a temetővel',
        ],
      },
    ],
    others: [
      {
        title: 'Hamvak szórása',
        body: 'Búcsú a temető szóróparcellájában.',
        href: '/hamvak-szorasa-temeto/',
      },
      {
        title: 'Hajós temetés',
        body: 'A hamvak szórása a Dunán.',
        href: '/hamvak-szorasa-dunaba/',
      },
      {
        title: 'Polgári búcsúztatás',
        body: 'Személyes, nem egyházi szertartás.',
        href: '/polgari-bucsuztatas/',
      },
      {
        title: 'Ravatalozó',
        body: 'Méltó helyszín a búcsúhoz.',
        href: '/ravatalozo-terem/',
      },
    ],
    cta: { label: 'Minden szolgáltatás', href: '/szolgaltatasok/' },
    copyStatus: 'draft',
  },
  process: {
    eyebrow: 'Ügyintézés',
    title: 'Hogyan zajlik a közös munka?',
    intro:
      'Az első beszélgetéstől a búcsú napjáig végigkísérjük a folyamatot, és minden lépésnél elmondjuk, mi következik.',
    stages: [
      {
        title: 'Első beszélgetés',
        body: 'Meghallgatjuk, mi történt, és elmondjuk a következő lépéseket.',
      },
      {
        title: 'Személyes egyeztetés',
        body: 'Közösen kiválasztjuk a búcsú formáját, helyszínét és időpontját, és átbeszéljük a költségeket.',
      },
      {
        title: 'Ügyintézés',
        body: 'Elvégezzük a temetés megszervezéséhez szükséges lépéseket, és jelezzük, ha valamire szükségünk van Öntől.',
      },
      {
        title: 'A búcsú napja',
        body: 'A szertartás a megbeszéltek szerint zajlik, hogy Ön a búcsúra figyelhessen.',
      },
    ],
    copyStatus: 'draft',
  },
  pricing: {
    eyebrow: 'Költségek',
    title: 'Előre, érthetően',
    body: 'A költségekről a döntés előtt, tételesen tájékoztatjuk. A szolgáltatások árát és tartalmát bemutató árlista jóváhagyás után kerül az Árak oldalra.',
    cta: { label: 'Árak és költségek', href: '/arak/' },
    copyStatus: 'draft',
  },
  about: {
    eyebrow: 'A Szomorúfűzről',
    quote: 'A búcsú méltósága a figyelemben rejlik: abban, hogy meghallgatjuk, és időt hagyunk.',
    principles: [
      {
        title: 'Érthető tájékoztatás',
        body: 'A lehetőségeket és a költségeket előre, közérthetően mondjuk el.',
      },
      {
        title: 'Az Ön tempójában',
        body: 'Nem sürgetjük a döntéseket. Annyi időt adunk, amennyire szüksége van.',
      },
      {
        title: 'Személyes jelenlét',
        body: 'Telefonon és irodáinkban is munkatársainkkal beszél, nem automatával.',
      },
    ],
    facts: [
      {
        title: 'Öt budapesti iroda',
        body: 'A város több pontján személyesen is felkereshet minket.',
        fact: claim('Szomorufuz-webaudit: reports/seo-audit.md 6.1'),
      },
      {
        title: 'Saját ravatalozó terem',
        body: 'Méltó, nyugodt helyszín a búcsúhoz.',
        fact: claim(
          'Szomorufuz-webaudit: reports/seo-audit.md 3. (/ravatalozo-terem/)',
          'Jelenleg is működik? Hol található (IX. ker., Ernő u.)?',
        ),
      },
    ],
    copyStatus: 'draft',
  },
  offices: {
    eyebrow: 'Irodáink',
    title: 'Budapest öt pontján',
    intro:
      'Személyesen is felkereshet minket. A pontos címek és a nyitvatartás jóváhagyás után kerülnek fel.',
    cta: { label: 'Kapcsolat és irodák', href: '/elerhetoseg/' },
  },
  faq: {
    eyebrow: 'Kérdések',
    title: 'Gyakori kérdések',
    intro: 'Rövid válaszok azokra a kérdésekre, amelyek a legtöbbször felmerülnek.',
    cta: { label: 'Összes kérdés', href: '/gyakori-kerdesek/' },
  },
  contact: {
    title: 'Ha most szüksége van ránk',
    intro: 'Hívjon minket, vagy keresse fel valamelyik irodánkat. Türelemmel segítünk eligazodni.',
  },
};
