import { company } from '@/content/data/contact';

import type { Article } from '../types';

const LIVE = 'https://www.budapest-temetkezes.hu';

/** Forrás: a főoldal „Tisztelt Hozzátartozó!” bemutatkozása, /ravatalozo-galeria/, /fiumei-uti-temeto/. */
export const rolunk: Article = {
  slug: 'rolunk',
  source: [`${LIVE}/`, `${LIVE}/ravatalozo-galeria/`, `${LIVE}/fiumei-uti-temeto/`],
  section: 'ceg',
  eyebrow: 'Rólunk',
  title: 'Szomorúfűz',
  titleEmphasis: 'Temetkezés',
  lead: 'Honlapunk célja, hogy tájékoztatást adjon azoknak a hozzátartozóknak és családoknak, akik temetkezési vagy hamvasztási szolgáltatás ügyében fordulnak hozzánk segítségért.',
  seo: {
    title: 'Rólunk – Szomorúfűz Temetkezés Budapest',
    description:
      'Teljes körű temetkezési ügyintézés öt budapesti irodában. Árgarancia, saját ravatalozó terem, a NÖRI regisztrált partnere a Fiumei úti sírkertben.',
  },
  blocks: [
    {
      type: 'p',
      text: 'Megpróbáljuk részletesen ismertetni azokat a fontos körülményeket és kegyeleti szolgáltatásokat, amelyek nélkülözhetetlenek egy méltó koporsós temetés vagy hamvasztásos szertartás megszervezéséhez. Nap mint nap sokan keresik fel honlapunkat temetési árajánlat kérése céljából, hiszen a temetkezéssel, hamvasztással kapcsolatos gyakorlati teendők bonyolult rendszerét nem mindenki ismeri.',
    },
    {
      type: 'callout',
      title: 'Erre a feladatra cégünk nyújt megoldást',
      text: 'Önnek nem szükséges ismernie a temetés vagy hamvasztás megszervezésével kapcsolatos hivatali és temetkezési tennivalókat – elintézzük Ön helyett. Biztosak vagyunk benne, hogy minden felvetődő kérdésére megfelelő választ tudunk adni, és minden elképzelését meg tudjuk valósítani.',
    },
    { type: 'h2', text: 'Árainkról', id: 'arak' },
    {
      type: 'p',
      text: 'Cégünknél nincs egyedi kedvezményrendszer, mert azt az elvet valljuk, hogy minden leendő és meglévő ügyfelünknek a lehető legkedvezőbb áron nyújtjuk szolgáltatásainkat. Publikált áraink az [Árak](/arak/) oldalon, árgarancia-szolgáltatásunk feltételei az [Árgarancia](/argarancia/) oldalon olvashatók.',
    },
    { type: 'h2', text: 'Röviden rólunk', id: 'tenyek' },
    {
      type: 'facts',
      items: [
        { label: 'Irodáink', value: 'Öt budapesti iroda: VI., XII., XIV., XVII. és XX. kerület' },
        {
          label: 'Ravatalozó terem',
          value: 'Exkluzívan berendezett terem a IX. kerületben, Ernő utcában',
        },
        { label: 'Fiumei úti sírkert', value: 'A sírkertet üzemeltető NÖRI regisztrált partnere' },
        { label: 'Ügyfélfogadás', value: 'Hétfőtől péntekig 8:00–16:00' },
      ],
    },
    {
      type: 'p',
      text: 'Cégadatainkat a [Céginformációk](/ceginformaciok/) oldalon találja.',
    },
    { type: 'contact' },
  ],
  related: ['ceginformaciok', 'argarancia', 'ravatalozo-terem'],
};

/** Forrás: /ceginformaciok/ */
export const ceginformaciok: Article = {
  slug: 'ceginformaciok',
  source: [`${LIVE}/ceginformaciok/`],
  section: 'ceg',
  eyebrow: 'Impresszum',
  title: 'Céginformációk',
  lead: 'A honlap üzemeltetője a Szomorúfűz Temetkezési Hálózat Kft.',
  seo: {
    title: 'Céginformációk – Szomorúfűz Temetkezési Hálózat Kft.',
    description:
      'Szomorúfűz Temetkezési Hálózat Kft. – székhely: 1064 Budapest, Izabella utca 65. Adószám, cégjegyzékszám, engedély, bankszámla.',
  },
  blocks: [
    {
      type: 'facts',
      items: [
        { label: 'Cégnév', value: 'Szomorúfűz Temetkezési Hálózat Kft.' },
        { label: 'Székhely', value: '1064 Budapest, Izabella utca 65.' },
        {
          label: 'Telephely',
          value: '4029 Debrecen, Csapó utca 53.; 4400 Nyíregyháza, Dózsa György utca 70.',
        },
        { label: 'Telefon', value: '+36 1 720 2710' },
        { label: 'E-mail', value: '[budapest@temetkezes.hu](mailto:budapest@temetkezes.hu)' },
        { label: 'Adószám', value: '26704450-2-42' },
        { label: 'Cégjegyzékszám', value: '01-09-340188' },
        { label: 'Bankszámlaszám', value: '16200106-11641388-00000000' },
        { label: 'IBAN', value: 'HU06 1620 0106 1164 1388 0000 0000' },
        { label: 'SWIFT', value: 'HBWEHUHB' },
        { label: 'Bank', value: 'MagNet Bank' },
        { label: 'Engedélyező hatóság', value: 'Budapest VI. Kerületi Kormányhivatala' },
        { label: 'Engedély száma', value: 'Tem/1/2023.' },
      ],
    },
    { type: 'contact' },
  ],
  related: ['rolunk', 'jogi-nyilatkozat', 'adatkezeles'],
};

/** Forrás: /jogi-nyilatkozat/ – változtatás nélkül, helyesírás javítva. */
export const jogiNyilatkozat: Article = {
  slug: 'jogi-nyilatkozat',
  source: [`${LIVE}/jogi-nyilatkozat/`],
  section: 'jogi',
  eyebrow: 'Jogi információk',
  title: 'Jogi',
  titleEmphasis: 'nyilatkozat',
  lead: 'A Szomorúfűz Temetkezés tájékoztatja Önt, hogy weboldalai böngészése egyúttal az alábbi feltételek elfogadását is jelenti.',
  seo: {
    title: 'Jogi nyilatkozat',
    description:
      'A Szomorúfűz Temetkezés weboldalainak felhasználási feltételei és szerzői jogi nyilatkozata.',
  },
  blocks: [
    {
      type: 'p',
      text: 'A Szomorúfűz Temetkezés weboldalai, illetve azok tartalma vagy bármely részlete szerzői jogvédelem alá esnek. Az ehhez fűződő jogok gyakorlására kizárólag a Szomorúfűz Temetkezés tulajdonosa jogosult.',
    },
    {
      type: 'p',
      text: 'A tulajdonos előzetes írásbeli engedélye nélkül tilos a weboldalak tartalmának egészét vagy részeit bármilyen formában felhasználni, reprodukálni, átruházni, terjeszteni, átdolgozni vagy tárolni. A tulajdonos azonban beleegyezik abba, hogy – saját, személyes használatra, a szabad felhasználás körében – Ön ezen oldalak tartalmát vagy kivonatait számítógépén tárolja vagy kinyomtassa.',
    },
    {
      type: 'p',
      text: 'A Szomorúfűz Temetkezés weboldalainak tartalma az eredetileg megfogalmazottak szerint, változtatás nélkül értendő. Előfordulhat, hogy a weboldalakon a tulajdonos akaratától és ráhatásától független változtatás történik, ezért – ha jogszabály másként nem rendelkezik – a Szomorúfűz Temetkezés semmilyen felelősséget nem vállal az Ön előtt megjelenő weboldalai pontosságára, megbízhatóságára, aktualitására vagy tartalmára vonatkozóan, a honlapon elérhető információk, dokumentációk vagy más írott anyagok tekintetében.',
    },
    {
      type: 'p',
      text: 'A Szomorúfűz Temetkezés fenntartja a jogot, hogy weboldalait bármikor módosítsa vagy átdolgozza, elérhetőségüket korlátozza vagy megszüntesse, és nem garantálja, hogy a weboldalakhoz való hozzáférés folyamatos vagy hibamentes lesz. A honlap, illetve az ott elérhető információk, dokumentációk vagy más írott anyagok hozzáféréséből, közvetett vagy közvetlen felhasználásából, a honlap használatra alkalmatlan állapotából, nem megfelelő működéséből, hiányosságából, esetleges üzemzavarából vagy félreérthetőségéből eredő károkért és/vagy veszteségért való felelősséget a Szomorúfűz Temetkezés kifejezetten kizárja.',
    },
    {
      type: 'p',
      text: 'A weboldal tulajdonosa nem vállal felelősséget olyan, harmadik fél által létrehozott, továbbított, tárolt, hozzáférhetővé tett vagy publikált tartalmakért, amelyekhez weboldalai kapcsolódnak, vagy amelyekre hivatkoznak.',
    },
    {
      type: 'p',
      text: 'A Szomorúfűz Temetkezés egyes weboldalai a jelen előírásoktól a hatályos jogszabályokkal összhangban eltérő rendelkezéseket is előírhatnak, így a mindenkor aktuális előírások, illetve felhasználási feltételek megismerése és elfogadása feltétele az egyes szolgáltatások igénybevételének, használatának.',
    },
    { type: 'p', text: 'Minden jog fenntartva! Szomorúfűz Temetkezés, 2023. ©' },
  ],
  related: ['ceginformaciok', 'adatkezeles'],
};

/**
 * Adatkezelés – az ÚJ weboldal tényleges működésének leírása.
 * Az élő oldal adatkezelési tájékoztatója a régi platform sütijeit, Google Analyticsét és űrlapjait
 * írja le, és más cégnevet/székhelyet tartalmaz – változatlan átvétele félrevezető lenne
 * (lásd docs/content-migration.md). A teljes dokumentum jogi frissítése szükséges.
 */
export const adatkezeles: Article = {
  slug: 'adatkezeles',
  // A régi honlap adatkezelési tájékoztatója más cégnevet és címet tartalmazott, ezért
  // annak szövegét NEM vettük át (audit SZF-006). Ez a szöveg a tényleges adatfolyamot írja le.
  source: [`${LIVE}/adatkezeles/`],
  section: 'jogi',
  eyebrow: 'Jogi információk',
  title: 'Adatkezelés',
  titleEmphasis: 'és sütik',
  lead: 'Milyen adatokat kezel ez a weboldal, mi történik az űrlapokon megadott adatokkal – és mit nem gyűjtünk.',
  seo: {
    title: 'Adatkezelés és sütik',
    description:
      'A weboldal űrlapjain megadott adatok útja, a sütik és a látogatottságmérés hiánya, valamint az érintetti jogok.',
  },
  blocks: [
    {
      type: 'callout',
      title: 'Tervezet',
      text: 'Ez a tájékoztató az adatkezelő jóváhagyására vár. Az online űrlapokon keresztüli küldés csak a végleges, jóváhagyott tájékoztató közzététele után aktiválható.',
    },
    { type: 'h2', text: 'Az adatkezelő', id: 'adatkezelo' },
    {
      type: 'facts',
      items: [
        { label: 'Név', value: company.legalName },
        { label: 'Székhely', value: company.seat },
        { label: 'E-mail', value: company.email },
        { label: 'Cégjegyzékszám', value: company.registrationNo },
      ],
    },
    { type: 'h2', text: 'Ez a weboldal', id: 'weboldal' },
    {
      type: 'list',
      items: [
        'nem használ sütiket (cookie-kat), és a böngészőben sem tárol adatot,',
        'nem végez látogatottságmérést, és nem tartalmaz hirdetési vagy közösségimédia-követőkódot,',
        'a betűtípusokat saját tárhelyről tölti be, külső szolgáltató bevonása nélkül,',
        'helyadatot nem kér és nem használ.',
      ],
    },
    { type: 'h2', text: 'Az online űrlapok', id: 'urlapok' },
    {
      type: 'p',
      text: 'A weboldalon árajánlatot, telefonos visszahívást vagy tájékoztatást kérhet, illetve üzenetet küldhet. Az űrlapokon megadott adatokat kizárólag a megkeresés megválaszolásához kérjük.',
    },
    {
      type: 'defs',
      items: [
        {
          term: 'Milyen adatokat kérünk',
          text: 'Az Ön nevét, e-mail címét és telefonszámát; árajánlatkérésnél az elhunyt nevét, a haláleset és a temetés körülményeire vonatkozó válaszokat (például a temetés típusa, a sírhely, az elhunyt jelenlegi helye), valamint az Ön által írt megjegyzést. A kötelező mezőket az űrlap jelöli.',
        },
        {
          term: 'Mi történik az adatokkal',
          text: 'Az adatok titkosított (HTTPS) kapcsolaton jutnak el a weboldal szerveréhez, amely ellenőrzi, majd e-mailként továbbítja őket az adatkezelő ügyfélszolgálati postafiókjába. A weboldal az űrlapok tartalmát adatbázisban nem tárolja.',
        },
        {
          term: 'Naplózás',
          text: 'A szerver csak technikai eseményt naplóz (melyik űrlap, sikeres volt-e a küldés, mennyi ideig tartott) – az űrlap tartalmát, az Ön nevét, elérhetőségét vagy IP-címét nem. A visszaélések (tömeges küldés) kiszűréséhez az IP-cím egyirányú, visszafejthetetlen kivonatát legfeljebb 10 percig a szerver memóriájában tartjuk.',
        },
        {
          term: 'Az adatkezelés jogalapja',
          text: 'Az adatkezelő jóváhagyására vár.',
        },
        {
          term: 'Megőrzési idő',
          text: 'Az adatkezelő jóváhagyására vár.',
        },
        {
          term: 'Adatfeldolgozók és címzettek',
          text: 'Az adatkezelő jóváhagyására vár (a weboldal tárhelyszolgáltatója és az e-mail-továbbítás szolgáltatója).',
        },
      ],
    },
    { type: 'h2', text: 'Az Ön jogai', id: 'jogok' },
    {
      type: 'p',
      text: 'Az általános adatvédelmi rendelet (GDPR) alapján kérhet tájékoztatást a kezelt adatairól, kérheti azok helyesbítését, törlését vagy kezelésük korlátozását, tiltakozhat az adatkezelés ellen, és kérheti adatai hordozását. Kérését a [budapest@temetkezes.hu](mailto:budapest@temetkezes.hu) címre küldheti.',
    },
    {
      type: 'p',
      text: 'Ha úgy érzi, hogy adatai kezelése sérti a jogait, panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál ([naih.hu](https://naih.hu/)), illetve bírósághoz fordulhat.',
    },
    { type: 'h2', text: 'Telefonos és e-mailes megkeresés', id: 'telefon' },
    {
      type: 'p',
      text: 'Ha telefonon vagy e-mailben keres meg minket, az Ön által megadott adatokat a Szomorúfűz Temetkezés kezeli. Az „Útvonaltervezés” hivatkozások a Google Térkép oldalát nyitják meg új lapon; az ott történő adatkezelésre a Google adatkezelési tájékoztatója irányadó.',
    },
    { type: 'h2', text: 'Sütik', id: 'sutik' },
    {
      type: 'p',
      text: 'Ez a weboldal nem helyez el sütit az Ön eszközén, ezért sütihozzájárulást sem kér.',
    },
    { type: 'h2', text: 'Kapcsolat adatkezelési kérdésekben', id: 'kapcsolat' },
    {
      type: 'p',
      text: 'Adatkezeléssel kapcsolatos kérdéseit a [budapest@temetkezes.hu](mailto:budapest@temetkezes.hu) címre küldheti. A cég adatait a [Céginformációk](/ceginformaciok/) oldal tartalmazza.',
    },
  ],
  related: ['ceginformaciok', 'jogi-nyilatkozat'],
};

/** Forrás: /urnak/, /termek-adatlapok/ (7 Sephia adatlap), /textiliak/, /sirjelzo/ (terméknevek a régi galéria képcímeiből). Képek: image-register.ts. */
export const urnak: Article = {
  slug: 'urnak',
  source: [
    `${LIVE}/urnak/`,
    `${LIVE}/termek-adatlapok/`,
    `${LIVE}/textiliak/`,
    `${LIVE}/sirjelzo/`,
  ],
  section: 'szolgaltatas',
  eyebrow: 'Kegyeleti kellékek',
  title: 'Urnák',
  titleEmphasis: 'és kegyeleti kellékek',
  lead: 'Díszurnák a vízi temetéshez készült lebomló urnáktól a kézzel festett fémurnákig, valamint urnatextíliák és sírjelzők.',
  seo: {
    title: 'Díszurnák és kegyeleti kellékek',
    description:
      'Lebomló urnák vízi temetéshez, fa, kerámia és fém díszurnák, mini emlékurnák, urnakoporsó. Sephia kézzel festett fémurnák 23 900 Ft-ért.',
  },
  blocks: [
    { type: 'h2', text: 'Urnaválasztékunk', id: 'urnak' },
    {
      type: 'list',
      items: [
        'Lebomló díszurnák vízi temetéshez',
        'Fa díszurnák',
        'Kerámia urnák',
        'Fém urnák',
        'Mini emlékurnák',
        'Urnakoporsó',
      ],
    },
    { type: 'h2', text: 'Sephia kézzel festett fémurnák', id: 'sephia' },
    {
      type: 'p',
      text: 'Teljesen egyedi gyártású, kézzel festett, fém alapanyagú, kerek, normál méretű díszurnák. Nincs két ugyanolyan alkotás: valamilyen részletben mindig eltérnek egymástól.',
    },
    { type: 'catalog', group: 'sephia' },
    { type: 'h2', text: 'Textíliák', id: 'textiliak' },
    { type: 'h3', text: 'Urnaterítők', id: 'urnateritok' },
    { type: 'catalog', group: 'urnateritok' },
    { type: 'h3', text: 'Urnaleeresztők', id: 'urnaleeresztok' },
    { type: 'catalog', group: 'urnaleeresztok' },
    { type: 'h2', text: 'Sírjelzők', id: 'sirjelzok' },
    { type: 'catalog', group: 'sirjelzok' },
    {
      type: 'p',
      text: 'A textíliák és sírjelzők választékáról és áráról munkatársaink telefonon tájékoztatják: +36 30 847 1915.',
    },
    { type: 'contact' },
  ],
  related: ['hamvasztas-urnakiadas', 'hamvak-hazavitele', 'hamvak-szorasa-dunaba'],
};

/** Forrás: /jogszabalyok/ – a jogszabályok listája (teljes szövegek: Nemzeti Jogszabálytár). */
export const jogszabalyok: Article = {
  slug: 'jogszabalyok',
  source: [`${LIVE}/jogszabalyok/`, `${LIVE}/hasznos-linkek/`],
  section: 'tudnivalo',
  eyebrow: 'Tudnivalók',
  title: 'Jogszabályok',
  lead: 'A temetőkről és a temetkezésről szóló legfontosabb jogszabályok, amelyekre tájékoztató oldalaink hivatkoznak.',
  seo: {
    title: 'Temetkezési jogszabályok',
    description:
      'Az 1999. évi XLIII. törvény a temetőkről és a temetkezésről, a 145/1999. Korm. rendelet és módosításaik – a temetkezés legfontosabb jogszabályai.',
  },
  blocks: [
    {
      type: 'defs',
      items: [
        {
          id: 'tv-1999-xliii',
          term: '1999. évi XLIII. törvény a temetőkről és a temetkezésről',
          text: 'Az elhunyt személyek emlékének méltó megőrzése és ápolása, a temetkezés közegészségügyi és kegyeleti rendeltetésének érvényesítése, valamint a temető és temetkezési kultúra fejlesztése érdekében alkotott törvény.',
        },
        {
          id: 'korm-145-1999',
          term: '145/1999. (X. 1.) Korm. rendelet',
          text: 'A temetőkről és a temetkezésről szóló törvény végrehajtásáról.',
        },
        {
          id: 'korm-146-1999',
          term: '146/1999. (X. 1.) Korm. rendelet',
          text: 'A Nemzeti Kegyeleti Bizottság szervezetéről.',
        },
        {
          id: 'bm-eum-im-34-1999',
          term: '34/1999. (IX. 24.) BM-EüM-IM együttes rendelet',
          text: 'Az egészségügyről szóló 1997. évi CLIV. törvénynek a halottakkal kapcsolatos rendelkezései végrehajtásáról, valamint a rendkívüli halál esetén követendő eljárásról.',
        },
        {
          id: 'tv-2005-xxi',
          term: '2005. évi XXI. törvény',
          text: 'A temetőkről és a temetkezésről szóló 1999. évi XLIII. törvény módosításáról.',
        },
        {
          id: 'tv-2013-cxxxviii',
          term: '2013. évi CXXXVIII. törvény',
          text: 'A temetőkről és a temetkezésről szóló 1999. évi XLIII. törvény módosításáról (többek között a hamvak hazavitele és a szociális temetés szabályai).',
        },
        {
          id: 'korm-379-2013',
          term: '379/2013. (X. 25.) Korm. rendelet',
          text: 'A 145/1999. (X. 1.) Korm. rendelet, valamint a 43/1999. (III. 3.) Korm. rendelet módosításáról.',
        },
        {
          id: 'korm-237-2001',
          term: '237/2001. (XII. 10.) Korm. rendelet',
          text: 'A nemzeti gyászról.',
        },
      ],
    },
    {
      type: 'p',
      text: 'A jogszabályok mindenkor hatályos, hivatalos szövege a Nemzeti Jogszabálytárban ([njt.hu](https://njt.hu)) érhető el – a jogszabály számára (például „1999. évi XLIII. törvény”) keresve. Korábbi honlapunk a jogszabályok egykori szövegét is közölte; ezeket elavulásuk veszélye miatt nem tesszük közzé.',
    },
  ],
  related: ['hamvak-hazavitele', 'szocialis-temetes', 'hamvasztas-menete'],
};

/** GYIK – az élő oldal GYIK-oldala üres; a válaszok a fenti eredeti tartalmakból származnak. */
export const gyik: Article = {
  slug: 'gyakori-kerdesek',
  source: [
    `${LIVE}/teendok-halaleset-utan/`,
    `${LIVE}/szukseges-iratok/`,
    `${LIVE}/hamvak-hazavitele/`,
    `${LIVE}/elerhetoseg/`,
    `${LIVE}/argarancia/`,
  ],
  section: 'tudnivalo',
  eyebrow: 'Tudnivalók',
  title: 'Gyakori',
  titleEmphasis: 'kérdések',
  lead: 'Rövid válaszok a leggyakoribb kérdésekre – a részleteket a hivatkozott tájékoztató oldalakon találja.',
  seo: {
    title: 'Gyakori kérdések temetésről és hamvasztásról',
    description:
      'Mi a teendő haláleset után? Kell-e anyakönyvi kivonat a temetéshez? Hazavihetők-e a hamvak? Mennyibe kerül? Válaszok egy helyen.',
  },
  blocks: [
    { type: 'h2', text: 'Kérdések és válaszok', id: 'kerdesek' },
    {
      type: 'faq',
      items: [
        {
          q: 'Mi az első teendőm haláleset után?',
          a: 'Önnek egyetlen lényeges dolga van: mielőbb felvenni munkatársunkkal a kapcsolatot (Információ: +36 30 847 1915, 6:00–22:00 között). A kórházi ügyintézéstől a temetési időpont foglalásáig a többit elintézzük Ön helyett. Részletek: [Teendők haláleset után](/teendok-halaleset-utan/).',
        },
        {
          q: 'Kit hívjak, ha a haláleset lakáson történt?',
          a: 'Ügyeleti halottszállításunk telefonszáma: +36 30 849 3538. Lakásról történő szállításnál két díjtételt alkalmazunk: a lakásról történő elhunytszállítási díjat és a naponkénti hűtési díjat. Ha az orvos kórboncolást rendel el, ő intézkedik a szállításról, és ennek díja nem Önt terheli.',
        },
        {
          q: 'Szükség van a halotti anyakönyvi kivonatra a temetéshez?',
          a: 'Nem. Az anyakönyvvezető a Halottvizsgálati Bizonyítványon bélyegzővel igazolja a haláleset bejelentését, és ezzel a lebélyegzett bizonyítvánnyal már megtörténhet a temetés. Részletek: [Szükséges iratok](/szukseges-iratok/).',
        },
        {
          q: 'Milyen iratokat kérnek az irodában?',
          a: 'Eredetiben csak a Halottvizsgálati Bizonyítványt, az elhunyt személyi igazolványát és – ha volt – a lakcímkártyáját, valamint pontos adatokat az elhunyt családi állapotáról. A többi okmány bemutatása jelentősen gyorsítja az ügyintézést.',
        },
        {
          q: 'Hazavihetem az elhunyt hamvait?',
          a: 'Igen. A 2013. november 1-jén hatályba lépett szabályozás szerint – a feltételek teljesítése mellett – bárki hazaviheti szeretett halottja hamvait a lakásába, amennyiben annak tulajdonosa vagy jogszerű használója. Az urna hazavitelének megszervezését vállaljuk. Részletek: [Hamvak hazavitele](/hamvak-hazavitele/).',
        },
        {
          q: 'Hol szórhatók szét a hamvak Budapesten?',
          a: 'Többek között az Új köztemető, az Óbudai temető, a Pesterzsébeti temető és a Fiumei úti sírkert szóróparcellájában, vagy hajóról a Dunában. Részletek: [Hamvak szórása temetőben](/hamvak-szorasa-temeto/) és [Hajós temetés](/hamvak-szorasa-dunaba/).',
        },
        {
          q: 'Mennyibe kerül egy koporsós temetés?',
          a: 'Koporsós temetési díjunk 232 288 Ft-tól kezdődik (az ár tartalmazza a 27%-os ÁFA-t). A konkrét temetésre díjmentes, kötelezettség nélküli árajánlatot adunk. Részletek: [Árak](/arak/).',
        },
        {
          q: 'Mit jelent az árgarancia?',
          a: 'Ha azonos szolgáltatást és kegyeleti kellékeket máshol kedvezőbb áron talál, és a kapott írásos ajánlatot eljuttatja hozzánk, mindent megteszünk, hogy még kedvezőbb ajánlatot készítsünk. Garantáljuk továbbá, hogy az ajánlatban szereplő áron végezzük el a leírt szolgáltatást. Részletek: [Árgarancia](/argarancia/).',
        },
        {
          q: 'Mikor van nyitva az iroda?',
          a: 'Ügyfélfogadás irodáinkban hétfőtől péntekig 8:00–16:00 óra között, szombaton és vasárnap zárva. Információs telefonszámunk (+36 30 847 1915) 6:00 és 22:00 óra között hívható.',
        },
        {
          q: 'Van saját ravatalozójuk?',
          a: 'Igen, exkluzívan berendezett, légkondicionált ravatalozó termünk a IX. kerületben, az Ernő utcában található. A díjra egyedi árajánlatot adunk; szombaton is vállaljuk a ravatali szertartást. Részletek: [Ravatalozó terem](/ravatalozo-terem/).',
        },
      ],
    },
    { type: 'contact' },
  ],
  related: ['teendok-halaleset-utan', 'szukseges-iratok', 'arak'],
};
