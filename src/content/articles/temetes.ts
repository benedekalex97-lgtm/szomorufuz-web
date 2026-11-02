import { priceBlock } from '@/lib/prices';

import type { Article } from '../types';

const LIVE = 'https://www.budapest-temetkezes.hu';
const KREMATORIUM =
  'Cégünknél több hamvasztási hely közül is választhat. Igény szerint a 2015 szeptemberében megnyitott, modern krematóriumban is történhet a hamvasztás, amely az egyetlen Budapesten.';

/** Forrás: /koporsos-temetes/ */
export const koporsosTemetes: Article = {
  slug: 'koporsos-temetes',
  source: [`${LIVE}/koporsos-temetes/`],
  section: 'szolgaltatas',
  eyebrow: 'Szolgáltatás',
  title: 'Koporsós',
  titleEmphasis: 'temetés',
  lead: 'Hagyományos, koporsós temetési szertartás teljes körű megszervezésével állunk a gyászoló hozzátartozók rendelkezésére – főként budapesti temetőkben, de vállaljuk az elhunyt vidéki temetőbe szállítását is.',
  seo: {
    title: 'Koporsós temetés Budapesten 232 288 Ft-tól',
    description:
      'Hagyományos koporsós temetés teljes körű megszervezéssel budapesti és vidéki temetőben. Koporsós temetési díj 232 288 Ft-tól (27% ÁFA-val). Kérjen árajánlatot!',
  },
  blocks: [
    priceBlock('koporsos-temetes'),
    {
      type: 'p',
      text: 'Vidéki temetés esetén a felmerülő hivatali ügyintézést is elvégezzük, és ilyenkor is megvásárolhatja nálunk a koporsót és valamennyi kegyeleti kelléket. Budapesten az Ön igényeihez igazodva foglalunk temetési időpontot a kiválasztott temetőben, meglévő sírhely esetén pedig egyeztetjük a temetővel a sírhely megváltási idejét és állapotát.',
    },
    { type: 'h2', text: 'Koporsóválasztékunk', id: 'koporsok' },
    {
      type: 'p',
      text: 'Választékunkat úgy alakítottuk ki, hogy abból minden megbízónk igényeinek és elképzeléseinek megfelelően választhasson: az egyszerű, kedvező árfekvésű laminált koporsótól a tiszta fából készült hatszögletű koporsókon át a luxus kívánalmaknak is megfelelő, exkluzív megjelenésű szarkofágokig.',
    },
    {
      type: 'callout',
      title: 'Raktárról, azonnal',
      text: 'Az Ön igényeinek megfelelő exkluzív koporsókat raktárról azonnal tudunk biztosítani, akár hétvégén vagy ünnepnapokon is.',
    },
    { type: 'h2', text: 'A szertartás részletei', id: 'reszletek' },
    {
      type: 'defs',
      items: [
        {
          term: 'Sírjelző kereszt vagy fejfa',
          text: 'Mivel a meglévő sírhely fölül az esetleges sírkövet elbontják (új sírhelynél ez még nincs), gondoskodni kell a sír ideiglenes megjelöléséről – az elhunyt vallása szerint sírjelző kereszttel vagy fejfával, rajta az elhunyt nevével, születési és halálozási évével.',
        },
        {
          term: 'Koporsófelirat',
          text: 'A koporsó oldalára vagy lábrészére felírjuk az elhunyt nevét és leélt éveinek számát.',
        },
        {
          term: 'Koporsódísz',
          text: 'A koporsó tetejére a felekezeti hovatartozás szerinti vallási jelkép, vagy ízlésesen megkötött virágdísz kerülhet.',
        },
        {
          term: 'Rögfogó',
          text: 'Szükség esetén alkalmazható; a behantoláskor csillapítja a koporsóra hulló föld dobogását.',
        },
        {
          term: 'Szemfedő',
          text: 'Nyitott koporsós ravatalnál ezzel a textillepellel takarjuk le az elhunytat; így csak azok tekinthetik meg, akik a koporsóhoz lépve felemelik.',
        },
      ],
    },
    { type: 'h2', text: 'A temetés menete', id: 'menete' },
    {
      type: 'steps',
      items: [
        {
          title: 'Felravatalozás',
          body: 'A temetőben történik, nyitott vagy zárt koporsóval.',
        },
        {
          title: 'Búcsúszertartás és gyászmenet',
          body: 'A ravatalozóban megtartott búcsúszertartás után a koporsót halottaskocsiba helyezik, és a sírhelyhez kíséri a szertartást végző pap vagy polgári búcsúztató, valamint a gyászoló család.',
        },
        {
          title: 'Utolsó búcsú',
          body: 'A koporsót leengedik a sírba; a közeli családtagok jelképesen egy marék földdel vagy egy-egy szál virággal búcsúznak.',
        },
        {
          title: 'Behantolás',
          body: 'A temetői személyzet behantolja a sírt, megjelöli a sírjelzővel, és elhelyezi rajta a koszorúkat. A szertartás lezárásaként általában itt nyilvánítanak részvétet a családnak.',
        },
      ],
    },
    { type: 'contact' },
    { type: 'quote-cta', title: 'Koporsós temetési árajánlat' },
  ],
  related: ['ravatalozo-terem', 'polgari-bucsuztatas', 'arak', 'fiumei-uti-temeto'],
};

/** Forrás: /hamvak-szorasa-temeto/ */
export const hamvakSzorasaTemeto: Article = {
  slug: 'hamvak-szorasa-temeto',
  source: [`${LIVE}/hamvak-szorasa-temeto/`],
  section: 'szolgaltatas',
  eyebrow: 'Hamvak elhelyezése',
  title: 'Hamvak szórása',
  titleEmphasis: 'temetőben',
  lead: 'Szórásos temetésnél a temetés megrendelésekor kifizetett összeg a temetés teljes költségét jelenti: később nem kell sírkőállítással, magas koszorúszámlával vagy sírgondozási díjjal számolni.',
  seo: {
    title: 'Hamvak szórása temetőben – Új köztemető, Óbuda',
    description:
      'Hamvak szórása budapesti temetők szóróparcellájában: Új köztemető, Óbudai temető, Pesterzsébeti temető, Fiumei úti sírkert. Teljes körű ügyintézés.',
  },
  blocks: [
    {
      type: 'p',
      text: 'Egyre nagyobb igény van erre a szolgáltatásra. A szórásos szertartással az elhunyt végakarata vagy életében tett kijelentései érvényesülhetnek, de sokan anyagi megfontolásból is ezt a formát választják.',
    },
    { type: 'h2', text: 'Választható temetők', id: 'temetok' },
    {
      type: 'list',
      items: ['Új köztemető', 'Óbudai temető', 'Pesterzsébeti temető', 'Fiumei úti sírkert'],
    },
    { type: 'h2', text: 'Szolgáltatásunk menete', id: 'menete' },
    {
      type: 'steps',
      items: [
        {
          title: 'Dokumentumok',
          body: 'A rendelkezésünkre bocsátott dokumentációval beszerezzük az elhunyt halotti anyakönyvi kivonatát a halál helye szerinti polgármesteri hivatalban.',
        },
        {
          title: 'Hamvasztás',
          body: 'Munkatársaink elszállítják az elhunytat a halottasházból vagy a kórház patológiájáról a hamvasztó üzembe.',
        },
        {
          title: 'Kiszállítás',
          body: 'A hamvakat zárt urnabetétben kiszállítjuk a szórás helyszínéül szolgáló temetőbe, és átadjuk a temető munkatársainak.',
        },
        {
          title: 'Szórásos szertartás',
          body: 'A szóróparcellában megtörténik a hamvak szórásos szertartása.',
        },
      ],
    },
    { type: 'p', text: KREMATORIUM },
    {
      type: 'p',
      text: 'A temetőkben – eltérő formában – lehetőség van arra is, hogy az elhunyt nevét, születési és halálozási évét márványba vagy gránitba vésve megörökítsük; ennek ügyintézését is vállaljuk. Irodánkban megrendelheti a polgári vagy egyházi szertartást, és ha nálunk rendeli a koszorúkat, virágokat, díjmentesen szállítjuk a helyszínre.',
    },
    { type: 'contact' },
    { type: 'quote-cta', title: 'Szórásos temetési árajánlat' },
  ],
  related: ['hamvak-szorasa-dunaba', 'hamvasztasos-temetes', 'polgari-bucsuztatas'],
};

/** Forrás: /hamvak-szorasa-dunaba/ */
export const hamvakSzorasaDunaba: Article = {
  slug: 'hamvak-szorasa-dunaba',
  source: [`${LIVE}/hamvak-szorasa-dunaba/`],
  section: 'szolgaltatas',
  eyebrow: 'Hamvak elhelyezése',
  title: 'Hajós temetés',
  titleEmphasis: 'a Dunán',
  lead: 'Cégünk szervezésében lehetőség nyílik az elhunyt hamvainak hajóról, a Dunába történő szórására – a szertartás után akár halotti torral a hajón.',
  seo: {
    title: 'Hajós temetés – hamvak szórása a Dunába',
    description:
      'Hamvak szórása hajóról a Dunába: indulás a Dráva utcai kikötőből, búcsúztatás a Népsziget déli csücskénél, halotti tor a hajón. Kérjen árajánlatot!',
  },
  blocks: [
    { type: 'h2', text: 'A szertartás menete', id: 'menete' },
    {
      type: 'steps',
      items: [
        { title: 'Fogadás', body: 'A hajó személyzete fogadja a gyászolókat a hajón.' },
        {
          title: 'Indulás',
          body: 'A hajó a pesti oldalon, a Margitszigettel szemben, a Dráva utcától lassan, méltóságteljesen elindul a búcsúztatás helyszínére, a Népsziget déli csücskéhez.',
        },
        {
          title: 'Búcsúztatás',
          body: 'Az úton megtörténik az elhunyt polgári vagy egyházi szertartás szerinti búcsúztatása.',
        },
        {
          title: 'Az urna a Dunába',
          body: 'Az urnát a Dunába bocsátjuk; a gyászoló család virágokkal búcsúzik el szeretett halottjától.',
        },
        { title: 'Visszatérés', body: 'A hajó visszatér az indulási pontjához.' },
      ],
    },
    { type: 'p', text: KREMATORIUM },
    { type: 'h2', text: 'Halotti tor a hajón', id: 'tor' },
    {
      type: 'p',
      text: 'A temetési szertartás után a hajón vendégül láthatja a megjelent családtagokat, barátokat és ismerősöket. Nem kell utánajárnia, hol rendezze meg a fogadást – elég jeleznie igényét cégünk felé, munkatársaink mindent elintéznek Ön helyett. A részletekről irodánkban vagy telefonon kaphat pontos felvilágosítást.',
    },
    { type: 'h2', text: 'Megközelítés, parkolás', id: 'megkozelites' },
    {
      type: 'p',
      text: 'A pesti alsó rakpart utolsó kikötője, a Dráva utca és a Révész utca közötti szakaszon. Megközelíthető a 3-as metró Dózsa György úti megállójától (vagy a Jászai Mari téri végállomástól) a 75-ös trolibusszal a Dráva utcai megállóig, onnan néhány perc gyalog.',
    },
    { type: 'contact' },
    { type: 'quote-cta', title: 'Szórásos temetési árajánlat' },
  ],
  related: ['hamvak-szorasa-temeto', 'urnak', 'hamvasztasos-temetes'],
};

/** Forrás: /ravatalozo-terem/ és /ravatalozo-galeria/ (helyszín) */
export const ravatalozoTerem: Article = {
  slug: 'ravatalozo-terem',
  source: [`${LIVE}/ravatalozo-terem/`, `${LIVE}/ravatalozo-galeria/`],
  section: 'szolgaltatas',
  eyebrow: 'Búcsúztatás',
  title: 'Ravatalozó',
  titleEmphasis: 'terem',
  lead: 'Méltó, elegáns környezet a hamvasztás utáni búcsúztatáshoz: teljes egészében légkondicionált, színvonalasan berendezett terem, ahol nyáron nincs hőség, télen nem kell fagyoskodni.',
  seo: {
    title: 'Ravatalozó terem Budapesten – IX. kerület, Ernő utca',
    description:
      'Exkluzívan berendezett, légkondicionált ravatalozó terem a IX. kerületben, Ernő utcában. Szombaton is vállaljuk a ravatali szertartást. Kérjen egyedi árajánlatot!',
  },
  blocks: [
    priceBlock('ravatalozo-terem'),
    {
      type: 'facts',
      items: [
        { label: 'Helyszín', value: 'IX. kerület, Ernő utca' },
        { label: 'Befogadóképesség', value: '35 fő ülőhely, 30 fő állóhely' },
        { label: 'Alapszolgáltatás', value: '60 perc a szertartás lebonyolítására' },
        { label: 'Szombaton', value: 'is vállaljuk a ravatali szertartást' },
      ],
    },
    {
      type: 'p',
      text: 'A 60 perces alapidőben benne van a megközelítőleg 30 perces várakozási idő, valamint a búcsúbeszédre és részvétnyilvánításra számítható ugyanennyi idő. A szertartás előtt 15 perccel elhelyezzük az elhunyt urnáját a ravatalozó teremben, így biztosított az érkezők fogadása és a nyugodt várakozás, emlékezés. A búcsúszertartás után halotti tor megrendezésére is lehetőség nyílik – ennek pontos körülményeiről munkatársainktól kaphat felvilágosítást.',
    },
    { type: 'h2', text: 'A terem díszítése', id: 'diszites' },
    {
      type: 'list',
      items: [
        '1 db urnatartó állvány',
        '4 db óriás templomi gyertya, tartóban',
        '4 db üvegváza szálas virágoknak',
        '2 db álló selyemvirágdísz kaspóban',
        '1 db fekvő selyemvirágdísz',
        '1 db selyemvirág urnagirland',
        'teljes zenei aláfestés a várakozás és a búcsúztatás során',
        'igény szerint: fotóállvány 90 cm-es selyemvirág görög koszorúval, projektor fotó-slideshow vagy videó vetítéséhez',
      ],
    },
    { type: 'h2', text: 'Ravatalozási időpontok', id: 'idopontok' },
    {
      type: 'p',
      text: 'A szertartásra a legalkalmasabbak a délutáni órák lehetnek, mivel így a vidékről érkező hozzátartozók is kényelmesen, időben megérkezhetnek. Természetesen az Ön igényeit felmérve, ahhoz a legteljesebb mértékben igazodva rendezzük meg a búcsúztatást.',
    },
    { type: 'h2', text: 'Polgári vagy egyházi búcsúztatás', id: 'bucsuztatas' },
    {
      type: 'p',
      text: 'Egy ravatali szertartás elképzelhetetlen búcsúbeszéd nélkül. Általában a család által kiválasztott vers nyitja meg a búcsúzást, ezt követi az elhunyt életét röviden bemutató beszéd, végül a szónok részvétet nyilvánít a gyászoló családtagoknak. Részletek: [Polgári búcsúztatás](/polgari-bucsuztatas/).',
    },
    {
      type: 'p',
      text: 'Ha valamely egyház szertartása szerint kíván végső búcsút venni az elhunyttól, erre is lehetőséget biztosítunk; igény esetén katolikus vagy református pap közreműködésében is tudunk segíteni.',
    },
    { type: 'contact' },
    { type: 'quote-cta', title: 'Ravatalozó terem és búcsúszertartás – árajánlat' },
  ],
  related: ['polgari-bucsuztatas', 'hamvasztasos-temetes', 'arak'],
};

/** Forrás: /polgari-bucsuztatas/ */
export const polgariBucsuztatas: Article = {
  slug: 'polgari-bucsuztatas',
  source: [`${LIVE}/polgari-bucsuztatas/`],
  section: 'szolgaltatas',
  eyebrow: 'Búcsúztatás',
  title: 'Polgári',
  titleEmphasis: 'búcsúztatás',
  lead: 'Ki fogja mondani a temetésen a beszédet? Emiatt ne aggódjon: megszervezzük a polgári szertartás szerinti temetési beszédet, és az Ön igényeinek legmegfelelőbb búcsúztatót ajánljuk.',
  seo: {
    title: 'Polgári búcsúztatás – 35 000 Ft-tól',
    description:
      'Polgári temetési búcsúztatás megszervezése: búcsúbeszéd, versek, énekek, a gyászmenet kísérése. Szolgáltatásunk díja 35 000 Ft-tól.',
  },
  blocks: [
    priceBlock('polgari-bucsuztatas', { label: 'Szolgáltatásunk díja' }),
    { type: 'h2', text: 'A polgári búcsúztatás menete', id: 'menete' },
    {
      type: 'steps',
      items: [
        {
          title: 'Várakozó zene',
          body: 'A búcsúbeszéd előtt halk zene szól a ravatalozóban, szórásos temetésnél közvetlenül a szóróparcellánál.',
        },
        {
          title: 'A temetési beszéd',
          body: 'A búcsúztató megáll az elhunyt koporsójánál vagy urnájánál, és előadja a családdal előre egyeztetett búcsúzó szöveget, amelyben versek, énekek, esetleg imádságok is lehetnek.',
        },
        {
          title: 'A gyászmenet',
          body: 'A ravatalozóból a gyászmenet – élén a búcsúztatóval – a sírhelyhez kíséri az elhunytat. Itt a búcsúztató egy verssel köszön el, majd a család nevében, a családtagokat név szerint felsorolva vesz örök búcsút.',
        },
        {
          title: 'Részvétnyilvánítás',
          body: 'A koporsó behantolása vagy az urna sírba helyezése alatt énekszó enyhíti a család fájdalmát; végül a búcsúztató elsőként nyilvánít részvétet a közvetlen hozzátartozóknak.',
        },
      ],
    },
    { type: 'contact' },
    { type: 'quote-cta' },
  ],
  related: ['ravatalozo-terem', 'koporsos-temetes', 'hamvak-szorasa-temeto'],
};

/** Forrás: /fiumei-uti-temeto/ */
export const fiumeiUtiTemeto: Article = {
  slug: 'fiumei-uti-temeto',
  source: [`${LIVE}/fiumei-uti-temeto/`],
  section: 'tudnivalo',
  eyebrow: 'Tájékoztató',
  title: 'Fiumei úti',
  titleEmphasis: 'sírkert',
  lead: 'A Fiumei úti Sírkertben 2016. április 27-től új temetői rendelet lépett életbe, a temető üzemeltetését a Nemzeti Örökség Intézete (NÖRI) vette át.',
  seo: {
    title: 'Temetés a Fiumei úti sírkertben',
    description:
      'A Szomorúfűz Temetkezés a NÖRI regisztrált partnere: teljes körű ügyintézés szórásos, urnás és koporsós temetéshez a Fiumei úti sírkertben.',
  },
  blocks: [
    {
      type: 'p',
      text: 'A változással az ügyintézés meglehetősen bonyolulttá vált a szórásos, urnás és koporsós temetések esetében is. Fontos változás, hogy a temetések lebonyolítását már nem a Budapesti Temetkezési Intézet végzi, hanem temetkezési irodák – így nem mindegy, melyik céget választja, hiszen nem minden temetkezés rendelkezik megfelelő szakmai háttérrel és képzett személyzettel.',
    },
    {
      type: 'callout',
      title: 'A NÖRI regisztrált partnere',
      text: 'A Szomorúfűz Temetkezés a sírkertet üzemeltető NÖRI regisztrált partnere. Képzett, gyakorlott kollégáink közreműködésével garantáljuk a temetés méltó körülmények között történő lebonyolítását a Fiumei úti sírkertben is.',
    },
    {
      type: 'p',
      text: 'Teljes körű ügyintézést és lebonyolítást vállalunk szórásos, urnás és koporsós temetés esetén is. Kímélje meg magát a bürokratikus útvesztőktől, és forduljon hozzánk bizalommal – széles kegyelettárgy-kínálattal várjuk. Kérje árajánlatunkat akár telefonon is!',
    },
    { type: 'contact' },
    { type: 'quote-cta' },
  ],
  related: ['koporsos-temetes', 'hamvak-szorasa-temeto', 'hamvak-temetese'],
};

/**
 * Forrás: /szocialis-temetes/ – a jogszabályi összefoglaló és a cég ajánlata.
 * Kimaradt: a 2013. november 1-jei önkormányzati árlista (elavult, harmadik fél árai)
 * és a hosszú, kérdő formájú érvelés egy része – lásd docs/content-migration.md.
 */
export const szocialisTemetes: Article = {
  slug: 'szocialis-temetes',
  source: [`${LIVE}/szocialis-temetes/`],
  section: 'tudnivalo',
  eyebrow: 'Tájékoztató',
  title: 'Szociális',
  titleEmphasis: 'temetés',
  lead: 'A 2013. évi CXXXVIII. törvény 2014. január 1-jétől szabályozza a szociális temetés igénybevételének lehetőségeit és feltételeit. Összefoglaltuk, mit jelent ez a gyakorlatban.',
  seo: {
    title: 'Szociális temetés – feltételek és alternatívák',
    description:
      'Mit jelent a szociális temetés, és milyen személyes közreműködést ír elő a törvény? Kedvező hamvasztásos alternatívák szűk anyagi lehetőségek esetén.',
  },
  blocks: [
    { type: 'h2', text: 'Amit a törvény biztosít', id: 'elonyok' },
    {
      type: 'legal',
      source:
        '1999. évi XLIII. törvény 24/A. § – a 2013. évi CXXXVIII. törvény szerinti szövegezés',
      paragraphs: [
        '(3) Szociális temetés keretében az elhunyt hűtéséről, szállításáról, továbbá az eltemettető választása szerint a hamvasztásról az állam gondoskodik. A szociális temetéshez az állam sírhelyet, koporsót, urnát és sírjelet biztosít.',
        '(5) Szociális temetés választása esetén az eltemettetőt temetési költségek nem terhelik, és azok hagyatéki teherként sem érvényesíthetők. Ha az eltemettető a szociális temetésre vonatkozó jogszabályi előírásoktól eltér, köteles a temetéshez kapcsolódó előkészítés, öltöztetés, szállítás, hűtés, esetleges hamvasztás költségét, a sírhely megváltási díját, a felhasznált koporsó vagy urna és sírjel árát a költségviselő szervezet részére megtéríteni.',
      ],
    },
    { type: 'h2', text: 'A kötelező személyes közreműködés', id: 'kozremukodes' },
    {
      type: 'legal',
      source: '24/A. § (7)',
      paragraphs: [
        'Az eltemettető vagy az általa felkért személy a szociális temetés igénylése során nyilatkozatban vállalja, hogy maga látja el a következő temetkezési szolgáltatásokat: a) az elhunyt temetésre való előkészítése (mosdatása, felöltöztetése), kivéve a 24/B. § (1) és (2) bekezdésében meghatározott esetet, b) sír vagy urnasír kiásása és visszahantolása, c) koporsó, urna gépjármű nélküli szállítása a temetőn belül, és d) a sírba helyezés vagy urnaelhelyezés.',
      ],
    },
    {
      type: 'p',
      text: 'Vagyis ha lakáson vagy szociális intézményben halálozik el a hozzátartozó, és nem kerül sor kórboncolásra, a családnak kell megmosdatnia és felöltöztetnie az elhunytat; a szociális parcellában a sírt a családnak kell kiásnia és visszahantolnia, a koporsót vagy urnát a ravatalozótól a sírig kézben kell vinnie, és a sírba kell helyeznie. Ha bármelyik feladat elmarad, a szociális temetés nem vehető igénybe, és a felmerült költségeket meg kell téríteni annak az önkormányzatnak, ahol a szociális temetést igényelték.',
    },
    { type: 'h2', text: 'További korlátozások', id: 'korlatozasok' },
    {
      type: 'list',
      items: [
        'A köztemető fenntartója jogszabályban meghatározott esetben a köztemetőben szociális parcellát jelöl ki (24/A. § (4)).',
        'Szociális temetésnél kizárólag az állam által biztosított kellékek – koporsó, urna, sírjel – használhatók (24/B. § (3)).',
        'Szociális temetési helyre az első betemetéstől számított 25 éven belül kizárólag szociális temetés keretében, urna elhelyezése történhet (24/B. § (5)).',
        'Ha az eltemettető nem tud gondoskodni a személyes közreműködésről, az önkormányzat közköltségen temetteti el az elhunytat; a költségek hagyatéki teherként érvényesíthetők (24/A. § (11)).',
        'Egészségügyi intézményben elhunytnál és boncolás esetén nincs lehetőség a személyes öltöztetésre; az intézmény a holttestet helyreállítva és felöltöztetve adja át (24/B. § (1)).',
      ],
    },
    { type: 'h2', text: 'Ha szűkösek az anyagi lehetőségek', id: 'alternativa' },
    {
      type: 'p',
      text: 'Cégünk ingyenes temetést nem tud vállalni, de segítünk abban, hogy szűk anyagi lehetőségek mellett is méltó temetést rendezhessen. A hamvasztásos temetésben rendkívül kedvezményes és versenyképes áron tudunk segíteni. A temetői elhelyezéssel vagy hamvak szórásával szemben altemplomban történő hamvszórást, természetben történő temetkezést vagy a hamvak [legális hazavitelét](/hamvak-hazavitele/) javasoljuk alternatívaként.',
    },
    {
      type: 'p',
      text: 'A templomban nem csak hívő, vallásgyakorló személyek temethetők el, hanem bárki, akinek ez volt a kívánsága, vagy akiről hozzátartozója így rendelkezik; a szertartás polgári jellegű is lehet. A természetben történő temetkezés helyét – folyó vagy állóvíz, erdő, hegy, egy kedves hely – ki-ki maga választhatja meg.',
    },
    { type: 'quote-cta', title: 'Hamvasztásos temetési árajánlat' },
  ],
  related: ['hamvasztasos-temetes', 'hamvak-hazavitele', 'jogszabalyok'],
};
