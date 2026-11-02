import type { Article } from '../types';

const LIVE = 'https://www.budapest-temetkezes.hu';
const KREMATORIUM =
  'Cégünknél több hamvasztási hely közül is választhat. Igény szerint a 2015 szeptemberében megnyitott, modern krematóriumban is történhet a hamvasztás, amely az egyetlen Budapesten. Az Önnek leginkább megfelelő helyszín kiválasztásában kollégáink lesznek segítségére a hamvasztás megrendelésekor.';

/** Forrás: /hamvasztasos-temetes/ */
export const hamvasztasosTemetes: Article = {
  slug: 'hamvasztasos-temetes',
  source: [`${LIVE}/hamvasztasos-temetes/`],
  section: 'szolgaltatas',
  eyebrow: 'Szolgáltatás',
  title: 'Hamvasztásos',
  titleEmphasis: 'temetés',
  lead: 'Szolgáltatásunk kiterjed az elhunyt hamvasztó üzembe szállítására, a hamvasztás elvégzésére, valamint a hamvak irodánkba vagy a temetési helyre történő visszaszállítására.',
  seo: {
    title: 'Hamvasztásos temetés Budapesten',
    description:
      'Hamvasztásos temetés teljes körű ügyintézéssel: szállítás, hamvasztás, kegyeleti kellékek, a hamvak hazavitele, urnás elhelyezés vagy szórás. Kérjen árajánlatot!',
  },
  blocks: [
    {
      type: 'p',
      text: 'Az elhunytat kórházból, halottasházból vagy temetőből szállítjuk a hamvasztó üzembe. A hamvasztás során a hatályos jogszabályoknak megfelelő hamvasztási kegyeleti kellékeket alkalmazunk: hamvasztó koporsót, a hamvakat tartalmazó urnabetétet és az egyéb szükséges kellékeket.',
    },
    { type: 'h2', text: 'Hová kerülhetnek a hamvak?', id: 'elhelyezes' },
    {
      type: 'list',
      items: [
        '[Hazaviheti](/hamvak-hazavitele/), és otthonában, a közelében tarthatja,',
        'temetőben vagy altemplomban lévő urnasírhelyben [elhelyezheti az urnát](/hamvak-temetese/),',
        'temetői [szóróparcellában](/hamvak-szorasa-temeto/) vagy templomi osszáriumban el is szórathatja,',
        'vagy hajóról, [a Dunában](/hamvak-szorasa-dunaba/) is búcsúzhat.',
      ],
    },
    {
      type: 'p',
      text: 'Mindegyik temetési formára korrekt, versenyképes árat tudunk nyújtani Önnek.',
    },
    { type: 'h2', text: 'Szolgáltatásunk elemei', id: 'elemek' },
    { type: 'h3', text: 'Ügyintézési díj' },
    {
      type: 'list',
      items: [
        'kapcsolattartás a krematóriummal és a kórházzal,',
        'a Nyugdíjfolyósító Intézet értesítése a halálesetről,',
        'igény esetén a halotti anyakönyvi kivonat beszerzése,',
        'igény esetén a tisztiorvosi hamvasztási engedély beszerzése.',
      ],
    },
    { type: 'h3', text: 'Hamvasztási díj' },
    { type: 'h3', text: 'Hamvasztási kegyeleti kellékek' },
    { type: 'list', items: ['hamvasztó koporsó,', 'urnabetét,', 'egészségügyi kellékek.'] },
    { type: 'h3', text: 'Szállítási díj' },
    {
      type: 'list',
      items: [
        'az elhunyt holttestének krematóriumba szállítása,',
        'a hamvak visszaszállítása a krematóriumból irodánkba.',
      ],
    },
    { type: 'p', text: KREMATORIUM },
    { type: 'quote-cta', title: 'Hamvasztásos temetési árajánlat' },
  ],
  related: ['hamvasztas-urnakiadas', 'hamvak-hazavitele', 'hamvasztas-menete', 'hamvak-temetese'],
};

/** Forrás: /hamvasztas-urnakiadas/ */
export const hamvasztasUrnakiadas: Article = {
  slug: 'hamvasztas-urnakiadas',
  source: [`${LIVE}/hamvasztas-urnakiadas/`],
  section: 'szolgaltatas',
  eyebrow: 'Szolgáltatás',
  title: 'Hamvasztás',
  titleEmphasis: 'és a hamvak kiadása',
  lead: 'Szeretett hozzátartozója hamvait maga körül szeretné tudni, vagy ez volt az elhunyt utolsó kívánsága? Irodánkban munkatársunk ismerteti a legegyszerűbb és leggyorsabb ügyintézési lehetőséget.',
  seo: {
    title: 'Hamvasztás és urnakiadás Budapesten',
    description:
      'Hamvasztás és a hamvak kiadása díszurnában, díjmentes ügyintézéssel. A halotti anyakönyvi kivonatot az Ön meghatalmazásával kérelmezzük.',
  },
  blocks: [
    {
      type: 'p',
      text: 'Felejtse el, hogy hivatalokban vagy más nehézkes intézményekben kell sorban állnia. Az ügyintézést levesszük az Ön válláról – és ezt **díjmentesen** nyújtjuk Önnek. Ehhez eredetiben a Halottvizsgálati Bizonyítványra, az elhunyt személyi igazolványára és – ha volt – lakcímkártyájára, valamint az Ön által aláírt meghatalmazásra van szükség. A születési, házassági vagy a házastárs halotti anyakönyvi kivonatának beszerzését jogszabályi okokból nem tudjuk vállalni. Részletek: [Szükséges iratok](/szukseges-iratok/).',
    },
    { type: 'h2', text: 'Hogyan zajlik?', id: 'menete' },
    {
      type: 'steps',
      items: [
        {
          title: 'Dokumentumok',
          body: 'A rendelkezésünkre bocsátott dokumentációval beszerezzük az elhunyt halotti anyakönyvi kivonatát a halál helye szerint illetékes polgármesteri hivatalban.',
        },
        {
          title: 'Szállítás és hamvasztás',
          body: 'Eközben munkatársaink elszállítják az elhunytat a halottasházból vagy a kórház patológiájáról a hamvasztó üzembe, a hamvasztás elvégzésére.',
        },
        {
          title: 'Díszurna',
          body: 'A hamvakat zárt urnabetétben visszaszállítjuk irodánkba, ahol az általunk biztosított kerámia díszurnába – vagy az Ön igénye szerinti másik díszurnába – helyezzük.',
        },
        {
          title: 'Átadás',
          body: 'Munkatársunk irodánkban átadja Önnek a hamvakat és a keletkezett dokumentációt.',
        },
      ],
    },
    { type: 'p', text: KREMATORIUM },
    {
      type: 'callout',
      title: 'Hogyan viheti haza törvényesen a hamvakat?',
      text: 'A hamvak hazavitelének jogszabályi feltételeit [külön oldalon foglaltuk össze](/hamvak-hazavitele/).',
    },
    { type: 'h2', text: 'Szolgáltatásunk elemei', id: 'elemek' },
    { type: 'h3', text: 'Hamvasztási díj' },
    { type: 'h3', text: 'Hamvasztási kegyeleti kellékek' },
    {
      type: 'list',
      items: ['hamvasztó koporsó,', 'műanyag egészségügyi betét,', 'urnabetét.'],
    },
    { type: 'h3', text: 'Szállítási díj' },
    {
      type: 'list',
      items: [
        'az elhunyt szállítása a kórházból a krematóriumba,',
        'a hamvak visszaszállítása a krematóriumból irodánkba.',
      ],
    },
    { type: 'h3', text: 'Ügyintézési díj' },
    {
      type: 'list',
      items: [
        'ügyintézés a kórházban vagy más intézményben,',
        'a halotti anyakönyvi kivonat beszerzése,',
        'kapcsolattartás a krematóriummal és a kórházzal,',
        'a Nyugdíjfolyósító Intézet írásbeli értesítése a halálesetről.',
      ],
    },
    { type: 'h3', text: 'Hamvak átadása irodánkban' },
    { type: 'list', items: ['a keletkezett dokumentáció átadása,', 'a hamvak átadása.'] },
    { type: 'contact' },
    { type: 'quote-cta', title: 'Hamvasztásos temetési árajánlat' },
  ],
  related: ['hamvak-hazavitele', 'hamvasztasos-temetes', 'urnak'],
};

/** Forrás: /hamvak-hazavitele/ – a jogszabályi idézetek változatlanok. */
export const hamvakHazavitele: Article = {
  slug: 'hamvak-hazavitele',
  source: [`${LIVE}/hamvak-hazavitele/`],
  section: 'szolgaltatas',
  eyebrow: 'Hamvak elhelyezése',
  title: 'Hamvak',
  titleEmphasis: 'hazavitele',
  lead: 'A 2013. november 1-jén hatályba lépett temetkezési szabályozás egyértelműen rendezi, hogyan lehet hazavinni az elhunyt hamvait tartalmazó urnát.',
  seo: {
    title: 'Hamvak hazavitele – jogszabályi feltételek',
    description:
      'Hazavihető-e az urna? Igen: a 2013. évi CXXXVIII. törvény szerint a feltételek teljesítése mellett. Vállaljuk az urna hazavitelének megszervezését.',
  },
  blocks: [
    {
      type: 'callout',
      title: 'Szó sincs arról, hogy nem lehet hazavinni a hamvakat!',
      text: 'A törvény megfelelő keretet biztosít arra, hogy az urna hazavitele legálisan és a kegyeleti jogokat nem sértő módon történjen. Bizonyos körülményeknek és kikötéseknek meg kell felelni – vállaljuk az urna hazavitelének megszervezését és lebonyolítását a törvényi megfelelőség teljes betartása mellett, jogi garanciával, rövid ügyintézési idővel.',
    },
    {
      type: 'p',
      text: 'Kérjük, tanulmányozza a vonatkozó jogszabályokat, hogy Ön is tisztában legyen a jogaival és kötelezettségeivel.',
    },
    { type: 'h2', text: 'A vonatkozó jogszabályok', id: 'jogszabalyok' },
    {
      type: 'legal',
      source:
        '2013. évi CXXXVIII. törvény a temetőkről és a temetkezésről szóló 1999. évi XLIII. törvény módosításáról, 7. §',
      paragraphs: [
        '(1) A Ttv. 21. § (2) bekezdése helyébe a következő rendelkezés lép: „(2) A hamvakat tartalmazó urnát az eltemetésre köteles személynek az elhunyt végrendelete, ennek hiányában a) a temető vagy temetkezési emlékhely befogadó nyilatkozata, vagy b) a hamvak temetőn, temetkezési emlékhelyen kívüli elhelyezése esetén az eltemetésre kötelezett személy teljes bizonyító erejű magánokiratba vagy közokiratba foglalt nyilatkozatának meglétéről az elhunyt utolsó lakóhelye szerinti, az eltemetésre kötelezett személyek nyilatkozatairól szóló nyilvántartás vezetésére az önkormányzat által kijelölt köztemető igazolása alapján kell kiadni.”',
        '(2) A Ttv. 21. §-a a következő (4)–(6) bekezdéssel egészül ki: „(4) Az eltemetésre köteles személy nyilatkozata tartalmazza az eltemetésre köteles személy nevét, születési helyét és idejét, anyja születési nevét, nyilatkozattételkori bejelentett lakcímét és a hamvak elhelyezése tervezett helyének címét. (5) A hamvakat tartalmazó urna temetőn, temetkezési emlékhelyen kívüli elhelyezése esetén az eltemetésre köteles személy nyilatkozatában vállalja, hogy az urnát kegyeleti igényeknek megfelelő körülmények között tárolja és az elhunyt közeli hozzátartozói részére a kegyeleti jog gyakorlásának lehetőségét biztosítja, valamint az elhunyt közeli hozzátartozóit az urna elhelyezésére szolgáló hely címének változásáról tájékoztatja.”',
      ],
    },
    {
      type: 'legal',
      source: '379/2013. (X. 25.) Korm. rendelet, 15. §',
      paragraphs: [
        'A Vhr. 33. § (3) bekezdése helyébe a következő rendelkezés lép: „(3) A Tv. 21. §-ában foglaltaknak megfelelően kiadott urna bármely olyan ingatlanon vagy temetkezési emlékhelyen elhelyezhető vagy eltemethető, ahol a tulajdonos (kezelő), továbbá az ingatlan jogszerű használója ehhez hozzájárult és a kegyeleti igények biztosíthatók. Ezek a rendelkezések a korábban temetőben elhelyezett urnára is alkalmazhatóak.”',
      ],
    },
    {
      type: 'callout',
      title: 'Vagyis',
      text: 'Bárki hazaviheti szeretett halottja hamvait a lakásába, amennyiben annak tulajdonosa vagy jogszerű használója. Lépjen kapcsolatba velünk, hogy mielőbb intézkedni tudjunk a hamvak hazaviteléről.',
    },
    { type: 'contact' },
    { type: 'quote-cta', title: 'Hamvasztásos temetési árajánlat' },
  ],
  related: ['hamvasztas-urnakiadas', 'urnak', 'jogszabalyok'],
};

/** Forrás: /hamvak-temetese/ */
export const hamvakTemetese: Article = {
  slug: 'hamvak-temetese',
  source: [`${LIVE}/hamvak-temetese/`],
  section: 'szolgaltatas',
  eyebrow: 'Hamvak elhelyezése',
  title: 'Hamvak',
  titleEmphasis: 'temetése',
  lead: 'Az elhunyt hamvainak budapesti temetőben történő elhelyezésére több lehetőség is kínálkozik: urnafülke (kolumbárium), urnasír, urnakripta, meglévő sírhely vagy templomi urnaelhelyezés.',
  seo: {
    title: 'Hamvak temetése – urnafülke, urnasír, templom',
    description:
      'Urnafülke, urnasír, urnakripta, meglévő koporsós sírhely vagy templomi elhelyezés: a hamvak temetésének lehetőségei Budapesten, teljes körű ügyintézéssel.',
  },
  blocks: [
    { type: 'h2', text: 'Urnafülke (kolumbárium)', id: 'urnafulke' },
    {
      type: 'p',
      text: 'Az egyik legelterjedtebb mód a hamvak úgynevezett kolumbáriumfülkében történő elhelyezése. Ilyenkor a hamvakat szimpla vagy dupla urnafülkében helyezik el, amelyet márvány vagy gránit lappal zárnak le. Erre a zárólapra vésik fel az elhunyt nevét, születési és halálozási évét.',
    },
    {
      type: 'p',
      text: 'Szokás továbbá búcsúmondatot, verset vagy a vallás felekezeti jelképét is felvésetni a kőre. A zárólapon kis váza vagy koszorúakasztó gomb is elhelyezhető, amely megkönnyíti a virágok, koszorúk későbbi elhelyezését. A kolumbáriumfülkét az első betemetéstől számított 10 évre lehet megváltani – ezt cégünk, a hamvasztást is beleértve, teljes körűen lebonyolítja a temetés megszervezése során.',
    },
    { type: 'h2', text: 'Urnasír vagy urnakripta', id: 'urnasir' },
    {
      type: 'p',
      text: 'Lehetőség van az elhunyt hamvait urnasírban vagy urnakriptában, a földben elhelyezni. Ilyenkor személyesebb a sírhely: a család egyéni elképzelés szerinti sírkövet állíthat szeretett halottja végső nyughelye fölé.',
    },
    { type: 'h2', text: 'Meglévő koporsós sírhelyben', id: 'meglevo-sirhely' },
    {
      type: 'p',
      text: 'Ha van koporsós sírhely, amely fölött a temettető rendelkezik, a meglévő sírban is elhelyezhető az urna. Ilyenkor nem kell új sírhelyet vásárolni, de ha sírkő áll rajta, a kő bontása vagy elmozdítása többletköltséggel járhat.',
    },
    { type: 'h2', text: 'Templomi urnaelhelyezés', id: 'templom' },
    {
      type: 'p',
      text: 'Templomi urnaelhelyezés esetén a hamvasztás teljes körű ügyintézésében, az egyházi vagy polgári búcsúztató megszervezésében és az urna templomba szállításában tudunk segíteni. Az urnafülkét az adott templomban kell kiválasztani és kifizetni; a zárólap vésését is ott lehet megrendelni a helyi igényeknek megfelelően.',
    },
    { type: 'quote-cta', title: 'Hamvasztásos temetési árajánlat' },
  ],
  related: ['hamvasztasos-temetes', 'hamvak-szorasa-temeto', 'polgari-bucsuztatas'],
};

/** Forrás: /hamvasztas-menete/ – tájékoztató cikk; a dátumhoz kötött állítások a forrás szerint. */
export const hamvasztasMenete: Article = {
  slug: 'hamvasztas-menete',
  source: [`${LIVE}/hamvasztas-menete/`],
  section: 'tudnivalo',
  eyebrow: 'Tudnivalók',
  title: 'A hamvasztás',
  titleEmphasis: 'menete',
  lead: 'Részletes, mindenre kiterjedő ismertető arról, ki, hol és mikor hamvasztható, milyen dokumentumok szükségesek, és hogyan zajlik a hamvasztás folyamata.',
  seo: {
    title: 'A hamvasztás menete és folyamata',
    description:
      'Ki hamvasztható, hol és mikor? Szükséges dokumentumok, az elhunyt azonosítása, a hamvasztás folyamata és a hamvak urnába helyezése – részletes ismertető.',
  },
  blocks: [
    {
      type: 'p',
      text: 'A hamvasztás és ezáltal a hamvasztásos temetés napjainkra a legelterjedtebb temetési formává vált. A forrásbejegyzés készítésekor 17 hamvasztóüzem, vagyis krematórium működött Magyarország területén. Sok család dönt úgy, hogy az elhunyt hamvait hazaviszi, vagy temetőn kívül helyezi el – ennek lehetnek pénzügyi vagy meggyőződésből fakadó okai is.',
    },
    {
      type: 'p',
      text: 'A budapesti hamvasztóüzem (Adytum Kft.) 2015 óta működik, és az egyetlen Budapesten. Temetőben történő hamvasztás megrendelése esetén az elhunytat Csömörre szállítják hamvasztani.',
    },
    { type: 'toc', label: 'Ezen az oldalon' },
    { type: 'h2', text: 'Ki hamvasztható?', id: 'ki' },
    {
      type: 'p',
      text: 'Az 1999. évi XLIII. törvény 38. § (1) bekezdése alapján az az elhunyt hamvasztható el, akinek személyi azonossága egyértelműen megállapítható, és a Halottvizsgálati Bizonyítvány 22. pontja szerint a holttest hamvasztható. Ugyanezen törvény 38. § (4) bekezdése kifejezetten tiltja az ismeretlen holttest hamvasztását.',
    },
    {
      type: 'p',
      text: 'Nem hamvasztható az elhunyt, ha a haláleset körülményeit hatósági eljárás vizsgálja, és az eljáró szerv – általában a Rendőrség – a holttest további vizsgálatának lehetősége miatt nem ad rá engedélyt. Külföldi állampolgár holttestének hamvasztásához az állampolgársága szerinti ország külképviseletének, ennek hiányában az utolsó lakóhelye szerint illetékes hatóságnak (Járási Népegészségügyi Hivatal) az engedélye szükséges, ha nemzetközi szerződés másként nem rendelkezik. Minden egyéb esetben magyar állampolgár holtteste elhamvasztható.',
    },
    { type: 'h2', text: 'Hol hamvasztható?', id: 'hol' },
    {
      type: 'p',
      text: 'Bármelyik engedéllyel rendelkező, Magyarország területén található vagy külföldi hamvasztóüzemben. Az 1999. évi XLIII. törvény 32. § (2) bekezdése szerint az elhunytat a legközelebbi hamvasztóüzembe kell szállítani és ott elhamvasztani. Kivétel, ha az eltemettető másik hamvasztóüzemet jelöl meg, vagy ha a legközelebbi üzemben a szállítás és a hamvasztás együttes díja magasabb, mint egy távolabbi üzembe szállítás és hamvasztás együttes díja. Elhunyt magyar állampolgár holtteste külföldön is elhamvasztható.',
    },
    { type: 'p', text: KREMATORIUM },
    { type: 'h2', text: 'Mikor hamvasztható?', id: 'mikor' },
    {
      type: 'p',
      text: 'Az elhunyt a Halottvizsgálati Bizonyítvány kitöltése és átadása után azonnal hamvasztható: a halottvizsgálatot végző orvos döntése alapján akár azonnal – ha a halál oka egyértelmű, és nincs idegenkezűségre utaló jel –, vagy a kórboncolás elrendelése és elvégzése után.',
    },
    {
      type: 'legal',
      source: '145/1999. (X. 1.) Korm. rendelet',
      paragraphs: [
        '„A halottat – hamvasztásos temetés esetén – a halottvizsgálati bizonyítvány kiállításától számított 15 napon belül el kell hamvasztani. A holttestet a hamvasztásig hűteni kell.”',
      ],
    },
    { type: 'h2', text: 'Halottszállítás a hamvasztóüzembe', id: 'szallitas' },
    {
      type: 'p',
      text: 'Az 1999. évi XLIII. törvény 35. § (1) bekezdése szerint holttestet kizárólag a közegészségügyi és járványügyi szabályoknak, valamint az alapvető kegyeleti feltételeknek megfelelő, erre a célra kialakított járműben, fedéllel ellátott koporsóban (szállítókoporsóban) lehet szállítani. A 145/1999. (X. 1.) Korm. rendelet 43. § (5) bekezdése szerint hamvasztás céljára – ha a szállítás az elhalálozástól számított 120 órán belül megtörténik – fedéllel ellátott hamvasztó koporsó is alkalmazható. Halottat csak felöltöztetve vagy lepedővel lefedve szabad szállítani (42. § (6) bekezdés); ez a lakáson elhunytakra is vonatkozik.',
    },
    { type: 'h2', text: 'Az elhunyt azonosítása', id: 'azonositas' },
    {
      type: 'p',
      text: 'A hamvasztóüzem adminisztrátora a Halottvizsgálati Bizonyítvány alapján, különösen nagy gonddal azonosítja az elhunytat: a dokumentum adatait összeveti az elhunyt két ellentétes végtagjára felhelyezett azonosító cédulával (név, születési idő, az elhalálozás helye és ideje). Eltérés esetén megtagadja az elhunyt átvételét. Ismeretlen holttest nem hamvasztható el.',
    },
    {
      type: 'p',
      text: 'A befogadott elhunyt egyedi azonosító sorszámot – hamvasztási sorszámot – kap, amely végigkíséri útját a hamvasztóüzemben. A sorszám egy éghetetlen anyagból készült lapkán az elhunyt mellé, a koporsó fejrészébe kerül, és ugyanezt a sorszámot tartalmazó matricát ragasztanak a koporsó külső oldalára, valamint a Halottvizsgálati Bizonyítványra.',
    },
    {
      type: 'p',
      text: 'Az átvett halottat a hamvasztásig hűteni kell. Az adminisztrátor másolatot készít a Halottvizsgálati Bizonyítványról, az eredeti példányt visszajuttatja a hozzátartozónak, az adatokat elektronikus nyilvántartóba rögzíti, majd a hamvasztások határideje szerint hamvasztási sorrendet készít, amelytől a hamvasztómester nem térhet el.',
    },
    { type: 'h2', text: 'A hamvasztáshoz szükséges dokumentumok', id: 'dokumentumok' },
    {
      type: 'defs',
      items: [
        {
          term: 'Halottvizsgálati Bizonyítvány',
          text: 'A hatpéldányos dokumentum 1–20. pontját a halottvizsgálatot végző orvos tölti ki; további vizsgálat esetén a patológia szakorvosa, hatósági boncolás után igazságügyi orvosszakértő tölti ki a további pontokat. Minden pontjának megfelelően kitöltve, aláírással, pecséttel kell rendelkeznie, és az elhamvaszthatóságnak egyértelműen szerepelnie kell rajta. Fertőző betegséget a dokumentum tetején piros színnel, nyomtatott betűvel külön jelölni kell.',
        },
        {
          term: 'Hatósági engedély',
          text: 'Rendkívüli halál esetén szükséges. Ha a Halottvizsgálati Bizonyítvány 16. pontjában a hatósági eljárás szükségessége jelölve van, a hamvasztás feltétele az eljáró hatóság engedélye, amelyben az eltemetés mellett az elhamvasztás szónak is szerepelnie kell.',
        },
        {
          term: 'Sírnyitási engedély',
          text: 'Az eltemetéstől számított 15 éven belüli exhumálásnál a területileg illetékes népegészségügyi (tisztiorvosi) szolgálat engedélye szükséges a sír megnyitásához és az exhumált holttest elhamvasztásához. 25 éven túli exhumálásnál ez már nem kell; ekkor az elhalálozás után kiállított halotti anyakönyvi kivonat vagy annak hitelesített másolata szükséges.',
        },
        {
          term: 'Konzuli hozzájárulás',
          text: 'Magyarországon elhunyt, vagy külföldön elhunyt és Magyarországra szállított külföldi személy hamvasztásához az állampolgársága szerinti ország külképviseletének, ennek hiányában az utolsó lakóhelye szerint illetékes hatóság (magyarra fordított, hitelesített) engedélye szükséges, ha nemzetközi szerződés másként nem rendelkezik.',
        },
        {
          term: 'Halotti anyakönyvi kivonat',
          text: 'Az elhunyt állampolgárságának megállapításához lehet szükséges, ha a születési helye nem a mai Magyarország területén található.',
        },
        {
          term: 'Kérelem a hamvak összehamvasztására',
          text: 'A temetés intézésére jogosult nyilatkozik, hogy az elhunyt mellé helyezzék el a már meglévő szerette(i) hamvait, és engedélyezi a díszurna felnyitását.',
        },
        {
          term: 'Hamvasztási nyilatkozat',
          text: 'Az eltemettetésre jogosult vagy kötelezett személy szándéknyilatkozata a hamvasztásról, az urnabetét típusáról és a hamvak rendeltetési helyéről.',
        },
        {
          term: 'Nemesfém-nyilatkozat',
          text: 'Az eltemettetésre jogosult vagy kötelezett személy írásban nyilatkozik, hogy a holttesten nemesfém vagy annak vélt tárgy nem található.',
        },
      ],
    },
    { type: 'h2', text: 'A hamvasztás folyamata', id: 'folyamat' },
    {
      type: 'p',
      text: 'Az első hamvasztás előtt a kemencét fel kell fűteni: a 3–4 órás felfűtést a hamvasztómester indítja, a számítógépes program 700–900 °C-ra fűti fel a kemencét. Minden bekezelés előtt ellenőrizni kell, hogy a kemence padozatán nem maradt-e maradvány az előző hamvasztásból, és hogy a hőmérséklet 750 és 900 °C között van-e.',
    },
    {
      type: 'p',
      text: 'A hamvasztómester a koporsót a bekezelővillára helyezi – fejrésszel a kemence felé –, és újból azonosítja az elhunytat: a koporsón, a lapkán és a végtagcédulán szereplő adatoknak egyezniük kell a Halottvizsgálati Bizonyítvány adataival. A sorszámot rögzíti a kemence kezelőprogramjában és üzemnaplójában. Tűz- és balesetvédelmi okokból a bekezelésnél két hamvasztómester van jelen.',
    },
    {
      type: 'p',
      text: 'Az ajtó bezáródása után a hamvasztás automatikusan megkezdődik. A program érzékelők segítségével szabályozza a levegő mennyiségét és a hőmérsékletet (legfeljebb 1000–1100 °C); az égési folyamat megközelítőleg 60 percig tart. A hamvasztómester végig a vezérlőasztalnál tartózkodik. A folyamat végén a kemencét 700–800 °C-ra hűtik vissza; a maradványokat a hűtőrészbe húzzák, körülbelül 30 percig hűtik, majd rozsdamentes őrlőedénybe (kokillába) helyezik. A padozatot teljesen meg kell tisztítani – addig a következő hamvasztás nem indítható.',
    },
    { type: 'h2', text: 'A hamvak urnába helyezése', id: 'urna' },
    {
      type: 'p',
      text: 'Az azonosító lapkát azonnal az elhunyt nevére kiállított urnabetétbe helyezik. Az urnabetét fedelének belső és külső oldalára címke kerül (az üzem székhelye, az elhunyt neve, születési és halálozási dátuma, a hamvasztási sorszám és a hamvasztás időpontja). A csontokat malomban hamuvá őrlik, az urnabetétbe helyezik, majd tetejét ráforrasztják, így légmentesen záródik. A hamvakat legalább 3 liter űrtartalmú urnabetétbe kell helyezni.',
    },
    { type: 'quote-cta', title: 'Hamvasztásos temetési árajánlat' },
  ],
  related: ['hamvasztasos-temetes', 'szukseges-iratok', 'jogszabalyok'],
};
