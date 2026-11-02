import { priceBlock } from '@/lib/prices';

import type { Article } from '../types';

const LIVE = 'https://www.budapest-temetkezes.hu';

/**
 * Árak – az élő oldalon publikált árak összegyűjtve, forrásoldaluk szerint.
 * Az élő oldal „Árlista/Árjegyzék” hivatkozása 404 (audit CNV-01) – teljes árjegyzék nem érhető el.
 */
export const arak: Article = {
  slug: 'arak',
  source: [
    `${LIVE}/koporsos-temetes/`,
    `${LIVE}/ravatalozo-terem/`,
    `${LIVE}/polgari-bucsuztatas/`,
    `${LIVE}/termek-adatlapok/`,
    `${LIVE}/argarancia/`,
  ],
  section: 'arak',
  eyebrow: 'Árak és költségek',
  title: 'Árak',
  titleEmphasis: 'és árajánlat',
  lead: 'Honlapunkon publikált áraink egy helyen. A konkrét temetésre vonatkozó, tételes árajánlatot díjmentesen, minden kötelezettség nélkül küldünk – telefonon vagy e-mailben, akár 2 órán belül.',
  seo: {
    title: 'Temetési árak – koporsós temetés, ravatalozó',
    description:
      'Koporsós temetés 232 288 Ft-tól (27% ÁFA-val), polgári búcsúztatás 35 000 Ft-tól. Ravatalozó teremre és hamvasztásra egyedi árajánlat. Árgarancia, díjmentes ajánlat.',
  },
  blocks: [
    { type: 'h2', text: 'Publikált áraink', id: 'arak' },
    priceBlock('koporsos-temetes', {
      extraNote: 'Részletek: [Koporsós temetés](/koporsos-temetes/)',
    }),
    priceBlock('ravatalozo-terem', {
      extraNote: 'Részletek: [Ravatalozó terem](/ravatalozo-terem/)',
    }),
    priceBlock('polgari-bucsuztatas', {
      label: 'Polgári búcsúztatás',
      extraNote: 'Részletek: [Polgári búcsúztatás](/polgari-bucsuztatas/)',
    }),
    priceBlock('sephia-urna', {
      label: 'Sephia kézzel festett fém díszurnák',
      extraNote: 'A választék: [Urnák és kegyeleti kellékek](/urnak/)',
    }),
    { type: 'h2', text: 'Hamvasztásos temetés', id: 'hamvasztas' },
    {
      type: 'p',
      text: 'A hamvasztásos temetés díja a választott elhelyezési módtól (hazavitel, urnás elhelyezés, szórás, hajós temetés) függ, ezért erre személyre szabott árajánlatot adunk. Szolgáltatásunk tételes elemei – ügyintézési díj, hamvasztási díj, hamvasztási kegyeleti kellékek, szállítási díj – a [Hamvasztásos temetés](/hamvasztasos-temetes/) oldalon olvashatók. Cégünknél nincs egyedi kedvezményrendszer: minden ügyfelünknek a lehető legkedvezőbb áron nyújtjuk szolgáltatásainkat.',
    },
    { type: 'h2', text: 'Árgarancia', id: 'argarancia' },
    {
      type: 'p',
      text: 'Ha azonos szolgáltatást és kegyeleti kellékeket más temetkezési vállalkozásnál vagy bármelyik temetőnél kedvezőbb áron talál, mindent megteszünk, hogy még kedvezőbb ajánlatot készítsünk Önnek. Feltétele, hogy ezt jelezze munkatársunknak, és a kapott **írásos ajánlatot** eljuttassa cégünknek. Garantáljuk továbbá, hogy az ajánlatban szereplő áron végezzük el a leírt szolgáltatást. Részletek: [Árgarancia](/argarancia/).',
    },
    { type: 'quote-request' },
  ],
  related: ['argarancia', 'arajanlat-keres-itt', 'hamvasztasos-temetes', 'koporsos-temetes'],
};

/** Forrás: /argarancia/ – a feltételek pontosan, általánosítás nélkül. */
export const argarancia: Article = {
  slug: 'argarancia',
  source: [`${LIVE}/argarancia/`],
  section: 'arak',
  eyebrow: 'Árak és költségek',
  title: 'Árgarancia',
  lead: 'Társaságunk garantálni kívánja Önnek a legkedvezőbb szolgáltatási árat – az alábbi feltételekkel.',
  seo: {
    title: 'Árgarancia – írásos temetési árajánlat',
    description:
      'Árgarancia feltételei: ha azonos szolgáltatást kedvezőbb áron talál, és az írásos ajánlatot eljuttatja hozzánk, még kedvezőbb ajánlatot készítünk.',
  },
  blocks: [
    { type: 'h2', text: 'A garancia feltételei', id: 'feltetelek' },
    {
      type: 'p',
      text: 'Abban a nem várt esetben, ha Ön azonos szolgáltatást és kegyeleti kellékeket más temetkezési vállalkozásnál vagy bármelyik temetőnél kedvezőbb áron talál, mindent megteszünk, hogy még kedvezőbb árfekvésű temetési ajánlatot készítsünk az Ön számára.',
    },
    {
      type: 'callout',
      title: 'Feltétel',
      text: 'Jelezze ezt a tényt munkatársunknak, és a kapott **írásos ajánlatot** juttassa el cégünknek. A többi a mi dolgunk.',
    },
    {
      type: 'p',
      text: 'Azért merünk ilyen írásbeli garanciát vállalni az általunk elvégzett temetkezési szolgáltatások áraira, mert tisztában vagyunk a temetőkben és más temetkezési szolgáltatóknál alkalmazott árképzéssel.',
    },
    { type: 'h2', text: 'Az ajánlatban szereplő ár', id: 'ajanlati-ar' },
    {
      type: 'p',
      text: 'Bizonyára Önt is bosszantaná, ha a kapott ajánlat pár nap elteltével már nem lenne érvényes, magasabb árat tartalmazna, vagy előre nem közölt költségek tevődnének rá. Nálunk ilyen nem fordulhat elő: garantáljuk, hogy az ajánlatban szereplő áron végezzük el a leírt temetkezési szolgáltatást, amennyiben Ön úgy dönt, hogy cégünket tiszteli meg bizalmával.',
    },
    {
      type: 'p',
      text: 'Az általunk adott árajánlatokra garanciát vállalunk arra is, hogy csak a kifejezetten szükséges szolgáltatásokat tartalmazzák.',
    },
    { type: 'quote-request' },
  ],
  related: ['arak', 'arajanlat-keres-itt'],
};

/** Forrás: /arajanlat-keres-itt/ (és a duplikált /arajanlatkeres/). Az eredeti űrlapok kérdéseivel. */
export const arajanlatKeres: Article = {
  slug: 'arajanlat-keres-itt',
  source: [`${LIVE}/arajanlat-keres-itt/`, `${LIVE}/arajanlatkeres/`],
  section: 'arak',
  eyebrow: 'Árajánlat',
  title: 'Árajánlat',
  titleEmphasis: 'kérés',
  lead: 'Kérjen tőlünk díjmentes, minden kötelezettségtől mentes árajánlatot hamvasztásos vagy koporsós temetésre – az alábbi űrlapon, telefonon vagy e-mailben, akár 2 órán belül.',
  seo: {
    title: 'Temetési árajánlat kérés – hamvasztás, koporsós',
    description:
      'Díjmentes temetési árajánlat telefonon (+36 30 847 1915) vagy e-mailben. Jelölje meg, hamvasztásos vagy koporsós temetésre kéri a költségkalkulációt.',
  },
  blocks: [
    {
      type: 'p',
      text: 'Az általunk adott árajánlatokra garanciát vállalunk, hogy csak a kifejezetten szükséges szolgáltatásokat tartalmazzák. Fontos: jelölje meg, hogy **hamvasztásos** vagy **koporsós** temetésre kéri a szertartási költségkalkulációt.',
    },
    { type: 'quote-forms' },
    { type: 'h2', text: 'Telefonon vagy e-mailben', id: 'telefon' },
    { type: 'contact' },
  ],
  related: ['arak', 'argarancia', 'hamvasztasos-temetes', 'koporsos-temetes'],
};

/** Forrás: /tajekoztatas-keres/ – telefonos visszahívás kérése (az eredeti form_1973 mezőivel). */
export const tajekoztatasKeres: Article = {
  slug: 'tajekoztatas-keres',
  source: [`${LIVE}/tajekoztatas-keres/`],
  section: 'arak',
  eyebrow: 'Tájékoztatás',
  title: 'Tájékoztatás',
  titleEmphasis: 'kérés',
  lead: 'Most nincs ideje átolvasni honlapunkat, vagy csak egy konkrét szolgáltatás érdekli? Munkatársaink telefonon tájékoztatják – legyen szó hamvasztásról, koporsós temetésről, más szolgáltatásról vagy kegyeleti kellékről.',
  seo: {
    title: 'Tájékoztatás kérés telefonon vagy e-mailben',
    description:
      'Telefonos tájékoztatás temetkezési szolgáltatásokról: +36 30 847 1915 (6–22 óra között). E-mail: budapest@temetkezes.hu.',
  },
  blocks: [
    {
      type: 'p',
      text: 'Adja meg elérhetőségét, és munkatársunk az Önnek megfelelő időben telefonon megkeresi. Ha inkább Ön hívna, az alábbi telefonszámokon is elér minket.',
    },
    { type: 'form', form: 'visszahivas' },
    { type: 'h2', text: 'Közvetlen elérhetőség', id: 'elerhetoseg' },
    { type: 'contact' },
  ],
  related: ['arajanlat-keres-itt', 'teendok-halaleset-utan'],
};
