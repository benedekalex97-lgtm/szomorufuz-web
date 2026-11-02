import type { Fact, Homepage } from '../types';

const claim = (source: string, note?: string): Fact<true> => ({
  value: true,
  status: 'unverified',
  source,
  ...(note ? { note } : {}),
});

export const homepage: Homepage = {
  seo: {
    title: 'Szomorúfűz Temetkezés – segítség a nehéz pillanatokban',
    description:
      'Segítünk eligazodni a haláleset utáni teendőkben, és támogatást nyújtunk a búcsúztatás megszervezésében. Szolgáltatások, árak és budapesti irodák egy helyen.',
  },
  // A hero szövegei a briefből származnak (jóváhagyott).
  hero: {
    title: 'Nincs egyedül a nehéz pillanatokban.',
    lead: 'Segítünk eligazodni a szükséges teendőkben, és támogatást nyújtunk a búcsúztatás megszervezésében.',
    primaryCtaLabel: 'Telefonos segítség',
    secondaryCta: { label: 'Teendők haláleset esetén', href: '/teendok-halaleset-utan/' },
    tertiaryCta: { label: 'Szolgáltatásaink', href: '#szolgaltatasok' },
  },
  // A lépések a cég saját folyamatát írják le, nem adnak hatósági/egészségügyi útmutatást.
  firstSteps: {
    title: 'Teendők haláleset esetén',
    intro:
      'Egy haláleset után sok kérdés merül fel egyszerre. Nem kell mindent egyedül végiggondolnia – lépésről lépésre segítünk.',
    steps: [
      {
        title: 'Vegye fel velünk a kapcsolatot',
        body: 'Munkatársunk meghallgatja, mi történt, és elmondja, mire van szükség a következő lépésekhez.',
      },
      {
        title: 'Készítse elő a személyes iratokat',
        body: 'Az ügyintézéshez szükséges iratok listáját részletes útmutatónkban találja.',
      },
      {
        title: 'Egyeztessük a búcsúztatás részleteit',
        body: 'Közösen döntünk a temetés módjáról, helyszínéről és időpontjáról – az Ön tempójában.',
      },
    ],
    cta: { label: 'A részletes útmutató', href: '/teendok-halaleset-utan/' },
    copyStatus: 'draft',
  },
  services: {
    title: 'Szolgáltatásaink',
    intro:
      'Áttekintés a búcsúztatás lehetséges formáiról. Minden részletet személyesen is átbeszélünk.',
    cta: { label: 'Összes szolgáltatás', href: '/szolgaltatasok/' },
  },
  pricing: {
    title: 'Árak és költségek',
    body: 'Fontosnak tartjuk, hogy a költségekről előre, érthetően tájékozódhasson. A szolgáltatások árát és tartalmát tételesen bemutató árlistánk hamarosan elérhető lesz az Árak oldalon.',
    cta: { label: 'Tovább az Árak oldalra', href: '/arak/' },
    copyStatus: 'draft',
  },
  trust: {
    title: 'Miért a Szomorúfűz?',
    intro: 'Röviden arról, mire számíthat, ha hozzánk fordul.',
    points: [
      {
        title: 'Öt budapesti iroda',
        body: 'A város több pontján személyesen is felkereshet minket.',
        fact: claim('Szomorufuz-webaudit: reports/seo-audit.md 6.1'),
      },
      {
        title: 'Minden temetési mód egy helyen',
        body: 'Hamvasztás, koporsós temetés, hamvak szórása és hajós temetés.',
        fact: claim('Szomorufuz-webaudit: reports/seo-audit.md 3. (élő oldal szolgáltatásoldalai)'),
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
  },
  offices: {
    title: 'Irodáink',
    intro: 'Öt budapesti irodában fogadjuk Önt.',
    cta: { label: 'Az irodák részletes adatai', href: '/irodak/' },
  },
  faq: {
    title: 'Gyakori kérdések',
    intro: 'Válaszok a leggyakrabban felmerülő kérdésekre.',
    cta: { label: 'Összes kérdés', href: '/gyakori-kerdesek/' },
  },
  contact: {
    title: 'Kapcsolat',
    intro:
      'Hívjon minket, vagy keresse fel valamelyik irodánkat. Munkatársaink türelemmel segítenek.',
  },
};
