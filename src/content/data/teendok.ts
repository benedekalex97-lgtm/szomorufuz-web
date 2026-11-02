import type { CopyStatus, Principle, Step } from '../types';

/**
 * Teendők haláleset esetén – szerkesztői TERVEZET.
 * Szándékosan NEM tartalmaz egészségügyi, jogi vagy hatósági útmutatást:
 * a helyzetenkénti, szakmailag ellenőrzött lépéslista jóváhagyás után kerül be.
 */
export const teendok: {
  lead: string;
  steps: Step[];
  situations: { id: string; title: string; body: string }[];
  prepare: string[];
  expect: Principle[];
  copyStatus: CopyStatus;
} = {
  lead: 'Nem kell mindent egyszerre tudnia. Az alábbi lépések segítenek rendezni a gondolatokat – a többiben segítünk.',
  steps: [
    {
      title: 'Hívjon minket',
      body: 'Elmondjuk, mi a következő lépés az Ön helyzetében. A hívás nem kötelez semmire.',
    },
    {
      title: 'Készítse elő az iratokat',
      body: 'Gyűjtse össze az elhunyt személyes iratait. A részletes lista a Szükséges iratok oldalon lesz elérhető.',
    },
    {
      title: 'Egyeztessünk',
      body: 'Irodánkban vagy telefonon beszéljük meg a búcsú módját, helyét és idejét – az Ön tempójában.',
    },
    {
      title: 'A szervezést mi végezzük',
      body: 'Összehangoljuk a részleteket, és minden lépésnél jelezzük, ha szükségünk van Önre.',
    },
  ],
  situations: [
    {
      id: 'korhaz',
      title: 'Kórházban',
      body: 'Hívjon minket, és elmondjuk, mi a teendő, ha a haláleset kórházban történt.',
    },
    {
      id: 'otthon',
      title: 'Otthon',
      body: 'Hívjon minket, és lépésről lépésre végigvezetjük a teendőkön, ha a haláleset otthon történt.',
    },
    {
      id: 'intezmeny',
      title: 'Idősotthonban vagy más intézményben',
      body: 'Hívjon minket, és egyeztetünk az intézménnyel is a következő lépésekről.',
    },
    {
      id: 'kulfold',
      title: 'Külföldön',
      body: 'Hívjon minket, és elmondjuk, milyen lehetőségek vannak ebben a helyzetben.',
    },
  ],
  prepare: [
    'Az elhunyt nevét és a haláleset helyét',
    'Az Ön nevét és elérhetőségét',
    'Ha már tudja: hamvasztásra vagy hagyományos temetésre gondolnak-e',
  ],
  expect: [
    {
      title: 'Nyugodt, érthető tájékoztatás',
      body: 'Szakkifejezések helyett egyszerűen elmondjuk, mi következik.',
    },
    {
      title: 'Előre ismert költségek',
      body: 'A döntés előtt tételesen tájékoztatjuk a költségekről.',
    },
    {
      title: 'Annyi idő, amennyi kell',
      body: 'Nem sürgetjük a döntéseket.',
    },
  ],
  copyStatus: 'draft',
};
