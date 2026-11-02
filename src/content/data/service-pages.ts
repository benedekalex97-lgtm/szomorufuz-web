import type { ServicePage } from '../types';

/**
 * Szolgáltatás-aloldalak – szerkesztői TERVEZET (copyStatus: 'draft').
 * Általános, ellenőrizhető leírások; nincs ár, határidő vagy garancia.
 */
export const servicePages: ServicePage[] = [
  {
    slug: 'hamvasztasos-temetes',
    seo: {
      title: 'Hamvasztásos temetés Budapesten',
      description:
        'A hamvasztásos búcsúztatás menete és a hamvak elhelyezésének lehetőségei: urnás temetés, szórás, búcsú a Dunán, az urna hazavitele.',
    },
    eyebrow: 'Szolgáltatás',
    title: 'Hamvasztásos',
    titleEmphasis: 'búcsúztatás',
    lead: 'A hamvasztás után a család dönt arról, hol és hogyan kapnak végső helyet a hamvak. Bemutatjuk a lehetőségeket, és megszervezzük a búcsút.',
    overview: {
      title: 'Röviden',
      points: [
        'Urnás temetés temetőben vagy urnafalban',
        'Hamvak szórása szóróparcellában',
        'Búcsú a Dunán, hajóról',
        'Az urna hazavitele',
      ],
    },
    intro: {
      title: 'Mit jelent a hamvasztásos temetés?',
      paragraphs: [
        'A hamvasztásos temetés során az elhunyt földi maradványait elhamvasztják, majd a hamvakat urnában helyezik el vagy szórják szét. A búcsú ugyanolyan személyes lehet, mint egy hagyományos temetésnél.',
        'Sokan azért választják, mert több lehetőséget ad a hamvak elhelyezésére és a búcsú idejének megválasztására. Ha bizonytalan, szívesen segítünk mérlegelni.',
      ],
    },
    steps: {
      title: 'A szervezés menete',
      intro: 'Minden lépésnél elmondjuk, mi következik, és mire van szükség Öntől.',
      items: [
        {
          title: 'Első beszélgetés',
          body: 'Telefonon vagy személyesen meghallgatjuk, mi történt, és elmondjuk a következő lépéseket.',
        },
        {
          title: 'Az elhelyezés kiválasztása',
          body: 'Közösen döntünk a hamvak elhelyezéséről és a búcsúztatás formájáról.',
        },
        {
          title: 'Ügyintézés és hamvasztás',
          body: 'Elvégezzük a szükséges ügyintézést, és jelezzük, ha valamire szükségünk van Öntől.',
        },
        {
          title: 'Búcsúztatás',
          body: 'A búcsú a megbeszélt helyen és időben, a család kívánsága szerint zajlik.',
        },
      ],
    },
    options: {
      title: 'Hová kerülhetnek a hamvak?',
      intro:
        'A lehetőségekről és a vonatkozó szabályokról személyesen is részletesen tájékoztatjuk.',
      items: [
        {
          title: 'Urnasír vagy urnafal',
          body: 'Állandó emlékhely a temetőben, ahová a család visszajárhat.',
        },
        {
          title: 'Szóróparcella',
          body: 'A hamvak a temető erre kijelölt területén kerülnek szórásra.',
        },
        {
          title: 'Búcsú a Dunán',
          body: 'Csendes búcsú hajóról; a hamvak a folyóba kerülnek.',
        },
        {
          title: 'Otthon',
          body: 'Az urna hazavihető. A vonatkozó szabályokról előre tájékoztatjuk.',
        },
      ],
    },
    related: [
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
        title: 'Hagyományos temetés',
        body: 'Koporsós búcsúztatás temetőben.',
        href: '/koporsos-temetes/',
      },
    ],
    faqIds: ['koltsegek', 'iratok', 'iroda'],
    copyStatus: 'draft',
  },
  {
    slug: 'koporsos-temetes',
    seo: {
      title: 'Hagyományos, koporsós temetés Budapesten',
      description:
        'A hagyományos, koporsós temetés menete: ravatalozás, egyházi vagy polgári szertartás, koporsó és kellékek, időpont-egyeztetés a temetővel.',
    },
    eyebrow: 'Szolgáltatás',
    title: 'Hagyományos',
    titleEmphasis: 'temetés',
    lead: 'Koporsós búcsúztatás temetőben, a család kívánsága szerinti szertartással. Segítünk a döntésekben, és összehangoljuk a részleteket.',
    overview: {
      title: 'Röviden',
      points: [
        'Ravatalozás és búcsúztatás',
        'Egyházi vagy polgári szertartás',
        'Koporsó és kellékek kiválasztása',
        'Az időpont egyeztetése a temetővel',
      ],
    },
    intro: {
      title: 'Mit jelent a hagyományos temetés?',
      paragraphs: [
        'A hagyományos, koporsós temetésnél a búcsúztatás után az elhunytat koporsóban helyezik végső nyugalomra a temetőben.',
        'A szertartás lehet egyházi vagy polgári, és a család kívánsága szerint alakítható: a zenétől a búcsúbeszédig minden részletet közösen beszélünk meg.',
      ],
    },
    steps: {
      title: 'A szervezés menete',
      intro: 'Végigkísérjük a folyamatot, hogy Önnek a búcsúra legyen ideje.',
      items: [
        {
          title: 'Első beszélgetés',
          body: 'Meghallgatjuk, mi történt, és elmondjuk, mire lesz szükség.',
        },
        {
          title: 'Helyszín és időpont',
          body: 'Egyeztetjük a temetőt, a ravatalozást és a szertartás időpontját.',
        },
        {
          title: 'Kellékek és szertartás',
          body: 'Segítünk kiválasztani a koporsót, a virágokat és a szertartás formáját.',
        },
        {
          title: 'A búcsú napja',
          body: 'A szertartás a megbeszéltek szerint zajlik, hogy Ön a búcsúra figyelhessen.',
        },
      ],
    },
    options: {
      title: 'A szertartás formái',
      intro: 'A búcsú hangulatát a család döntései határozzák meg.',
      items: [
        {
          title: 'Egyházi szertartás',
          body: 'A felekezet szokásai szerint, lelkész vagy pap közreműködésével.',
        },
        {
          title: 'Polgári búcsúztatás',
          body: 'Személyes búcsúbeszéddel, vallási elemek nélkül.',
        },
        {
          title: 'Zene és virágok',
          body: 'Élő vagy felvett zene, koszorúk és csokrok a család választása szerint.',
        },
      ],
    },
    related: [
      {
        title: 'Hamvasztás',
        body: 'A hamvak elhelyezésének lehetőségei.',
        href: '/hamvasztasos-temetes/',
      },
      {
        title: 'Polgári búcsúztatás',
        body: 'Személyes, nem egyházi szertartás.',
        href: '/polgari-bucsuztatas/',
      },
      { title: 'Ravatalozó', body: 'Méltó helyszín a búcsúhoz.', href: '/ravatalozo-terem/' },
    ],
    faqIds: ['koltsegek', 'iratok', 'iroda'],
    copyStatus: 'draft',
  },
];
