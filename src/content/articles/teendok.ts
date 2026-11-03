import type { Article } from '../types';

const LIVE = 'https://www.budapest-temetkezes.hu';

/** Forrás: /teendok-halaleset-utan/ – tartalmilag változatlan, tagolva, helyesírás javítva. */
export const teendok: Article = {
  slug: 'teendok-halaleset-utan',
  source: [`${LIVE}/teendok-halaleset-utan/`],
  section: 'teendok',
  eyebrow: 'Útmutató',
  title: 'Teendők',
  titleEmphasis: 'haláleset után',
  lead: 'Önnek egyetlen lényeges dolga van: mielőbb felvenni munkatársunkkal a kapcsolatot. A többi teendőt – a kórházi ügyintézéstől a temetési időpont foglalásáig – elintézzük Ön helyett.',
  seo: {
    title: 'Teendők haláleset után – kórházban, lakáson, külföldön',
    description:
      'Mi a teendő haláleset után kórházban, lakáson, közterületen vagy külföldön? Teljes körű ügyintézés a Szomorúfűz Temetkezéssel. Információ: +36 30 847 1915.',
  },
  blocks: [
    { type: 'h2', text: 'Miért fontos mielőbb jelezni a halálesetet?', id: 'miert-fontos' },
    {
      type: 'p',
      text: 'Azért, hogy azokat a költségeket, amelyek teljesen feleslegesen terhelnék az Ön pénztárcáját, minimalizálni tudjuk. Nem mindegy, melyik temetkezési cég szállítja el az elhunytat a lakásról, milyen szolgáltatásokat kíván igénybe venni a kórház patológiai osztályán, mit rendel meg a temetőben, és egyáltalán milyen költségek terhelik Önt mint temettetőt. Mi kizárólag azokat a díjakat fizetjük ki, amelyek szükségesek és Önt terhelik.',
    },
    { type: 'h2', text: 'Amit elintézünk Ön helyett', id: 'ugyintezes' },
    {
      type: 'p',
      text: 'Cégünk teljes körűen elintézi a haláleset bekövetkezte utáni teendőket:',
    },
    {
      type: 'list',
      items: [
        'a kórházi ügyintézést,',
        'a halotti anyakönyvi kivonat beszerzését,',
        'az esetleges hamvasztási engedély beszerzését.',
      ],
    },
    {
      type: 'p',
      text: 'Ha az elhunytat vagy hamvait budapesti temetőben kívánja végső nyugalomra helyezni, a meglévő sírhelyet előkészítjük a temetésre, és a szükséges eljárást elintézzük Ön helyett a temetőben. Az Ön elvárásainak megfelelő temetési időpontot foglalunk a szertartás helyéül szolgáló temetőben. A sírhelyen álló síremléket szükség szerint elbontjuk, vagy elvégezzük a szükséges sírköves munkálatokat (például a név és az évszámok bevésését).',
    },
    { type: 'contact' },
    { type: 'h2', text: 'Egészségügyi intézményben bekövetkezett halálozás esetén', id: 'korhaz' },
    {
      type: 'p',
      text: 'Az elhalálozás helye szerinti osztályt (belgyógyászat, kardiológia, neurológia stb.) szükséges felkeresnie. Itt kapja meg az elhunyt személyes tárgyait, személyi igazolványát és a zárójelentést. Ha a boncolás mellőzését szeretné kérni, ezen az osztályon kell kitöltenie a kórház által alkalmazott formanyomtatványt.',
    },
    {
      type: 'p',
      text: 'A patológiai osztályra nem szükséges elfáradnia – és általában teljesen felesleges is –, hiszen az esetek többségében még pár napba telik, hogy elkészüljön az úgynevezett **Halottvizsgálati Bizonyítvány**, amely a temetés intézéséhez szükséges dokumentum.',
    },
    {
      type: 'callout',
      title: 'Praktikusabb megoldás',
      text: 'Fáradjon be irodánkba, és nyugodt körülmények között beszélje át munkatársunkkal a szükséges teendőket – ezeket szinte teljes mértékben el tudjuk intézni Ön helyett. Már az is előrébb viszi az ügyintézést, ha telefonon kér segítséget munkatársunktól.',
    },
    { type: 'h2', text: 'Lakáson történt halálozás esetén', id: 'lakas' },
    {
      type: 'p',
      text: 'Ha a halál tényét megállapító orvos nem tudja egyértelműen megállapítani a halál okát, kórboncolásra beszállíttatja az elhunytat a területileg illetékes egészségügyi intézménybe – ez általában a legközelebbi kórház. Ilyenkor az orvos intézkedik a holttest szállításáról: ő hívja telefonon az ügyeletes temetkezési céget. Ebben az esetben Önnek a szállítási díjat illetően semmilyen anyagi kötelezettsége nincs, hiszen nem Ön kezdeményezte az eljárást.',
    },
    {
      type: 'p',
      text: 'A boncolás megtörténte után azonban az elhunyt hűtési díja és – ha igény van rá – öltöztetési díja már a temettetőt terheli. Ezért is fontos, hogy a kórházzal időben megtörténjen a kapcsolatfelvétel és a szükséges intézkedések.',
    },
    {
      type: 'p',
      text: 'Ha az orvos megállapította a halál okát, intézkedhet az elhunyt elszállításáról, de köteles a hozzátartozó beleegyezését kérni a szolgáltatást elvégző temetkezési cég megbízásához.',
    },
    {
      type: 'callout',
      title: 'Lakásról történő szállítás díjai',
      text: 'Cégünk két díjtételt alkalmaz a lakásról történő elhunytszállítás során: a „Lakásról történő elhunytszállítási díjat” és a „Hűtési díj naponként” tételt. Nem alkalmazunk olyan díjakat, amelyeket a hozzátartozó nem rendelt meg a szállítást végző temetkezési cégtől. Ügyeleti halottszállítás: +36 30 849 3538.',
    },
    { type: 'h2', text: 'Közterületen bekövetkezett halálozás esetén', id: 'kozterulet' },
    {
      type: 'p',
      text: 'Ebben az esetben a Rendőrség gondoskodik az elhunyt elszállításáról. A szállítás helye attól függ, hogy a halottvizsgálatot végző orvos meg tudja-e állapítani a halál okát, és ki tudja-e zárni az idegenkezűséget. Ezek ismeretében rendelik el a szállítást halottasházba, kórházba vagy igazságügyi intézménybe.',
    },
    {
      type: 'p',
      text: 'Ha a halálesetet hatósági eljárás keretében tovább vizsgálja a Rendőrség, a temetéshez be kell szerezni a Rendőrségtől az úgynevezett temetési engedélyt. Cégünk ezt az iratot is beszerzi, hogy megkíméljük Önt az időrabló ügyintézéstől.',
    },
    { type: 'h2', text: 'Külföldön történt halálozás esetén', id: 'kulfold' },
    {
      type: 'p',
      text: 'Ha a haláleset külföldön következik be, az elhunyt Magyarországra szállításának megszervezéséhez speciális engedélyekre is szükség van. Országonként eltérő dokumentumokat kérnek, de általánosságban elmondható, hogy a hazaszállítás megkezdéséhez nélkülözhetetlen:',
    },
    {
      type: 'list',
      items: [
        'a halotti anyakönyvi kivonat,',
        'a helyi tisztiorvosi szolgálat engedélye,',
        'valamint a magyarországi konzulátus szállítási engedélye.',
      ],
    },
    {
      type: 'p',
      text: 'Mediterrán államokban további nehézséget jelenthet a balzsamozási igazolás beszerzése, a helyi hatóságok (rendőrség, ügyészség) engedélye, a kórházi vagy temetkezési költségek előre történő kifizetése, valamint az, hogy a szállítást végző magyar temetkezési cég regisztrációja érvényes legyen az adott országban.',
    },
    {
      type: 'p',
      text: 'Cégünk felkészült a felsorolt ügyintézések elvégzésére, így garanciával vállaljuk az elhunyt rövid időn belüli hazaszállítását, a költségek lehető legnagyobb mértékű leszorítása mellett.',
    },
    { type: 'quote-cta' },
  ],
  related: ['szukseges-iratok', 'hamvasztasos-temetes', 'koporsos-temetes', 'arajanlat-keres-itt'],
};

/** Forrás: /szukseges-iratok/ – az ismétlődő bevezető bekezdés összevonva. */
export const szuksegesIratok: Article = {
  slug: 'szukseges-iratok',
  source: [`${LIVE}/szukseges-iratok/`],
  section: 'teendok',
  eyebrow: 'Ügyintézés',
  title: 'Szükséges',
  titleEmphasis: 'iratok',
  lead: 'A haláleset anyakönyvezéséhez szükséges dokumentumok – és egy megnyugtató tény: a temetés lebonyolításához nincs szükség a halotti anyakönyvi kivonatra.',
  seo: {
    title: 'Szükséges iratok haláleset anyakönyvezéséhez',
    description:
      'Milyen iratok kellenek a halotti anyakönyvi kivonathoz? Irodánk eredetiben csak a Halottvizsgálati Bizonyítványt, a személyi igazolványt és a lakcímkártyát kéri.',
  },
  blocks: [
    {
      type: 'p',
      text: 'Egy haláleset a legnagyobb tragédia, ami érheti a családot. Ilyenkor nincs idő, sem energia arra, hogy a szinte sohasem használt iratokat keresgélje az elhunyt lakásában, és ha nem találja, hivatalokban járjon utána, hosszú várakozással vagy sorban állással.',
    },
    {
      type: 'p',
      text: 'Cégünk bizonyos dokumentumok beszerzésében tud segítséget nyújtani – ilyen a **Halottvizsgálati Bizonyítvány**, a **hamvasztási engedély** és a **sírnyitási tisztiorvosi engedély**. A megváltozott jogszabályi környezet miatt azonban a haláleset anyakönyvezéséhez szükséges születési, házassági vagy adott esetben a házastárs halotti anyakönyvi kivonatának beszerzésében – rajtunk kívül álló okokból – sajnos nem.',
    },
    { type: 'h2', text: 'A halotti anyakönyvi kivonat kiállításához szükséges', id: 'iratok' },
    {
      type: 'list',
      items: [
        'az elhunyt személyi igazolványa,',
        'lakcímkártyája, ha volt,',
        'születési anyakönyvi kivonata,',
        'ha házas volt: a házassági anyakönyvi kivonata,',
        'ha elvált volt: a válás tényét bizonyító bírósági ítélet vagy igazolás,',
        'ha özvegy volt: a házastárs halotti anyakönyvi kivonata.',
      ],
    },
    {
      type: 'p',
      text: 'Ha az elhunytnak volt érvényes jogosítványa vagy útlevele, ezeket az okmányokat is le kell adni érvénytelenítés céljából. Ha az elhunyt külföldön született és Magyarországon halálozott el, az anyakönyvvezető kérheti a születési anyakönyvi kivonat hiteles magyar fordítását is – ebben is tudunk segítséget nyújtani.',
    },
    {
      type: 'callout',
      title: 'A temetés nem marad el a kivonat miatt',
      text: 'A temetés lebonyolításához nincs szükség a halotti anyakönyvi kivonatra, de az anyakönyvi hivatalnál a lehető leghamarabb be kell jelenteni a halálesetet. Az anyakönyvvezető a Halottvizsgálati Bizonyítványon bélyegzővel és dátummal igazolja a bejelentést – ezzel a lebélyegzett bizonyítvánnyal már megtörténhet a temetés. A kivonat kiállítására a jogszabály 30 napos ügyintézési időt enged, amely indokolt esetben két alkalommal meghosszabbítható.',
    },
    { type: 'h2', text: 'Ránk bízhatja az ügyintézést – díjmentesen', id: 'ugyintezes' },
    {
      type: 'p',
      text: 'Díjmentesen ránk bízhatja az ügyintézést teljes körűen, hiányos alapiratok esetén is. Minél több okmány áll rendelkezésre, annál gyorsabb a halotti anyakönyvi kivonat kiállítása. Irodánk munkatársai eredetiben csak a **Halottvizsgálati Bizonyítványt**, a **személyi igazolványt** és – ha volt – a **lakcímkártyát** kérik, viszont pontos adatokra van szükségünk az elhunyt családi állapotáról:',
    },
    {
      type: 'list',
      items: [
        'elvált, özvegy vagy egyedülálló volt-e az elhunyt a halál pillanatában;',
        'ha elvált volt: mikor és hol történt a válás – ez sokszor kiderül a házassági anyakönyvi kivonatból, amelybe régen záradékként jegyezték be a válási adatokat;',
        'ha özvegy volt, és nincs meg a házastárs halotti anyakönyvi kivonata: a házastárs halálozásának időpontja, de legalább a helye, hogy az illetékes anyakönyvi hivatalban beszerezhetők legyenek a hiányzó adatok.',
      ],
    },
    {
      type: 'p',
      text: 'Ha ránk bízza az ügyintézést, a halotti anyakönyvi kivonat kiállítását a halál helye szerint illetékes anyakönyvi hivatalban kérelmezzük, az Ön által aláírt meghatalmazással. Ha nincs meg minden irat, az anyakönyvvezetők a rendelkezésükre bocsátott információk és az elérhető nyilvántartások alapján beszerzik a hiányzó adatokat; új iratok kiállítására ilyenkor nem kerül sor. Több hiányzó irat esetén a folyamat akár hetekig is elhúzódhat, de a temetés lebonyolítását ez nem akadályozza.',
    },
    {
      type: 'p',
      text: 'Amint elkészült a halotti anyakönyvi kivonat, azonnal értesítjük Önt, hogy befáradhat érte irodánkba, vagy kérésének megfelelően postázzuk.',
    },
    { type: 'contact' },
  ],
  related: ['teendok-halaleset-utan', 'hamvasztas-menete', 'arajanlat-keres-itt'],
};
