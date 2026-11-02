import { featuredPrice } from '@/lib/prices';

import type { Homepage } from '../types';

/**
 * Főoldal – a tartalom az élő oldalról (főoldal, Teendők, szolgáltatásoldalak, oldalsáv).
 * A hero főcíme és alcíme a briefből származik; minden más állítás forrásoldalhoz kötött.
 */
export const homepage: Homepage = {
  seo: {
    title: 'Szomorúfűz Temetkezés Budapest – hamvasztás, temetés',
    description:
      'Hamvasztásos és koporsós temetés teljes körű ügyintézéssel, öt budapesti irodában. Információ: +36 30 847 1915, ügyeleti halottszállítás: +36 30 849 3538.',
  },
  hero: {
    eyebrow: 'Szomorúfűz Temetkezés · Budapest',
    title: 'Nincs egyedül',
    titleEmphasis: 'a nehéz pillanatokban.',
    lead: 'Hamvasztásos és koporsós temetés teljes körű ügyintézéssel. Önnek nem szükséges ismernie a hivatali és temetkezési tennivalókat – elintézzük Ön helyett.',
    secondaryCta: { label: 'Teendők haláleset után', href: '/teendok-halaleset-utan/' },
    paths: [
      {
        label: 'Haláleset történt',
        title: 'Teendők haláleset után',
        body: 'Kórházban, lakáson, közterületen vagy külföldön.',
        href: '/teendok-halaleset-utan/',
      },
      {
        label: 'Árajánlat',
        title: 'Temetési árajánlatkérés',
        body: 'Telefonon vagy e-mailben, akár 2 órán belül.',
        href: '/arajanlat-keres-itt/',
      },
      {
        label: 'Irodáink',
        title: 'Öt budapesti iroda',
        body: 'Ügyfélfogadás hétfőtől péntekig 8–16 óráig.',
        href: '/elerhetoseg/',
      },
    ],
  },
  intro: {
    eyebrow: 'Tisztelt Hozzátartozó!',
    title: 'Erre a feladatra cégünk nyújt megoldást',
    paragraphs: [
      'A temetkezéssel, hamvasztással kapcsolatos gyakorlati teendők bonyolult rendszerét nem mindenki ismeri. Önnek nem szükséges ismernie a temetés vagy hamvasztás megszervezésével kapcsolatos hivatali és temetkezési tennivalókat – elintézzük Ön helyett.',
      'Biztosak vagyunk benne, hogy minden felvetődő kérdésére megfelelő választ tudunk adni, és minden elképzelését meg tudjuk valósítani.',
    ],
    points: [
      {
        title: 'Teljes körű ügyintézés',
        body: 'A kórházi ügyintézéstől a halotti anyakönyvi kivonat és a hamvasztási engedély beszerzésén át a temetési időpont foglalásáig.',
      },
      {
        title: 'Árgarancia',
        body: 'Ha azonos szolgáltatást máshol kedvezőbb áron talál, és az írásos ajánlatot eljuttatja hozzánk, még kedvezőbb ajánlatot készítünk.',
      },
      {
        title: 'Egyforma, kedvező árak',
        body: 'Nincs egyedi kedvezményrendszerünk: minden ügyfelünknek a lehető legkedvezőbb áron nyújtjuk szolgáltatásainkat.',
      },
    ],
  },
  services: {
    eyebrow: 'Szolgáltatásaink',
    title: 'Hamvasztásos és koporsós temetés',
    intro:
      'Hamvasztási szolgáltatás anyakönyv beszerzésével, a hamvak hazavitele, szórása és hajós temetés a Dunán – vagy hagyományos, koporsós temetés budapesti temetőben.',
    featured: [
      {
        title: 'Hamvasztásos temetés',
        body: 'Szállítás a hamvasztó üzembe, hamvasztás, a hamvak visszaszállítása irodánkba vagy a temetési helyre.',
        href: '/hamvasztasos-temetes/',
        points: [
          'A hamvak hazavitele',
          'Urnás elhelyezés temetőben vagy altemplomban',
          'Hamvak szórása szóróparcellában',
          'Hajós temetés a Dunán',
        ],
      },
      {
        title: 'Koporsós temetés',
        body: 'Hagyományos koporsós temetés budapesti temetőben – vállaljuk az elhunyt vidéki temetőbe szállítását is. Díja 232 288 Ft-tól.',
        href: '/koporsos-temetes/',
        points: [
          'Temetési időpont foglalása',
          'Sírhely-ügyintézés a temetőben',
          'Koporsók raktárról, akár hétvégén is',
          'Polgári vagy egyházi búcsúztatás',
        ],
      },
    ],
    others: [
      {
        title: 'Hamvasztás és urnakiadás',
        body: 'A hamvak kiadása díszurnában.',
        href: '/hamvasztas-urnakiadas/',
      },
      {
        title: 'Hamvak hazavitele',
        body: 'Törvényesen, jogi garanciával.',
        href: '/hamvak-hazavitele/',
      },
      {
        title: 'Hamvak szórása temetőben',
        body: 'Új köztemető, Óbuda, Pesterzsébet.',
        href: '/hamvak-szorasa-temeto/',
      },
      {
        title: 'Hajós temetés a Dunán',
        body: 'A hamvak szórása hajóról.',
        href: '/hamvak-szorasa-dunaba/',
      },
      {
        title: 'Hamvak temetése',
        body: 'Urnafülke, urnasír, templom.',
        href: '/hamvak-temetese/',
      },
      {
        title: 'Ravatalozó terem',
        body: 'IX. kerület, Ernő utca.',
        href: '/ravatalozo-terem/',
      },
      {
        title: 'Polgári búcsúztatás',
        body: 'Temetési beszéd 35 000 Ft-tól.',
        href: '/polgari-bucsuztatas/',
      },
      {
        title: 'Urnák, kegyeleti kellékek',
        body: 'Díszurnák, textíliák, sírjelzők.',
        href: '/urnak/',
      },
    ],
    cta: { label: 'Minden szolgáltatás', href: '/szolgaltatasok/' },
  },
  situations: {
    eyebrow: 'Teendők haláleset után',
    title: 'Önnek egyetlen lényeges dolga van',
    intro:
      'Mielőbb felvenni munkatársunkkal a kapcsolatot – hogy a feleslegesen felmerülő költségeket minimalizálni tudjuk. A teendők attól függnek, hol történt a haláleset:',
    items: [
      {
        title: 'Kórházban',
        body: 'Az osztályon kapja meg a személyes tárgyakat és a zárójelentést; a patológiára általában felesleges elfáradnia.',
        href: '/teendok-halaleset-utan/#korhaz',
      },
      {
        title: 'Lakáson',
        body: 'Ügyeleti halottszállításunkkal: csak a szállítási és a naponkénti hűtési díjat alkalmazzuk.',
        href: '/teendok-halaleset-utan/#lakas',
      },
      {
        title: 'Közterületen',
        body: 'A Rendőrség gondoskodik a szállításról; a szükséges temetési engedélyt is beszerezzük.',
        href: '/teendok-halaleset-utan/#kozterulet',
      },
      {
        title: 'Külföldön',
        body: 'Megszervezzük a hazaszállítást és a szükséges engedélyek beszerzését.',
        href: '/teendok-halaleset-utan/#kulfold',
      },
    ],
    cta: { label: 'A részletes teendők', href: '/teendok-halaleset-utan/' },
  },
  handled: {
    eyebrow: 'Ügyintézés',
    title: 'Amit elintézünk Ön helyett',
    intro: 'Cégünk teljes körűen elintézi a haláleset bekövetkezte utáni teendőket.',
    items: [
      'Kórházi ügyintézés',
      'A halotti anyakönyvi kivonat beszerzése',
      'A hamvasztási engedély beszerzése',
      'A meglévő sírhely előkészítése és az ügyintézés a temetőben',
      'Temetési időpont foglalása az Ön elvárásai szerint',
      'A síremlék bontása vagy a sírköves munkálatok, például a név és az évszámok bevésése',
    ],
  },
  prices: {
    eyebrow: 'Árak',
    title: 'Publikált áraink',
    intro:
      'A konkrét temetésre díjmentes, minden kötelezettségtől mentes, tételes árajánlatot adunk – és az ajánlatban szereplő áron végezzük el a szolgáltatást.',
    items: [
      {
        label: 'Koporsós temetés',
        ...featuredPrice('koporsos-temetes'),
        href: '/koporsos-temetes/',
      },
      {
        label: 'Ravatalozó terem',
        ...featuredPrice('ravatalozo-terem'),
        href: '/ravatalozo-terem/',
      },
      {
        label: 'Polgári búcsúztatás',
        ...featuredPrice('polgari-bucsuztatas'),
        note: 'temetési beszéd',
        href: '/polgari-bucsuztatas/',
      },
    ],
    cta: { label: 'Árak és árgarancia', href: '/arak/' },
  },
  offices: {
    eyebrow: 'Irodáink',
    title: 'Öt budapesti iroda',
    intro: 'Ügyfélfogadás hétfőtől péntekig 8:00–16:00 óra között; szombaton és vasárnap zárva.',
    cta: { label: 'Elérhetőségek és megközelítés', href: '/elerhetoseg/' },
  },
  faq: {
    eyebrow: 'Kérdések',
    title: 'Gyakori kérdések',
    intro: 'Rövid válaszok a leggyakoribb kérdésekre.',
    cta: { label: 'Összes kérdés', href: '/gyakori-kerdesek/' },
  },
  contact: {
    title: 'Hívjon minket bizalommal',
    intro:
      'Információ 6:00 és 22:00 óra között, ügyeleti halottszállítás, vagy személyesen öt budapesti irodánkban.',
  },
};
