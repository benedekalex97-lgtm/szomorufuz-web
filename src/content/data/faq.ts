import type { FaqItem } from '../types';

/**
 * DEMONSTRÁCIÓS TARTALOM (copyStatus: 'demo').
 * A kérdések tipikus látogatói kérdések; a válaszok szándékosan nem adnak
 * jogi, egészségügyi vagy hatósági útmutatást. A végleges szöveget a
 * Szomorúfűz munkatársai adják meg, szakmai jóváhagyással.
 */
export const faqItems: FaqItem[] = [
  {
    id: 'elso-lepes',
    question: 'Mit tegyek először, ha egy hozzátartozóm elhunyt?',
    answer:
      'Mintaválasz. A végleges, szakmailag jóváhagyott választ a Szomorúfűz munkatársai adják meg. Addig is részletes tájékoztatást a Teendők haláleset esetén oldalon talál majd.',
    copyStatus: 'demo',
  },
  {
    id: 'iratok',
    question: 'Milyen iratokra lesz szükség az ügyintézéshez?',
    answer:
      'Mintaválasz. A szükséges iratok ellenőrzött listája a Szükséges iratok oldalon jelenik meg, a jóváhagyást követően.',
    copyStatus: 'demo',
  },
  {
    id: 'koltsegek',
    question: 'Hol találom a temetés költségeit?',
    answer:
      'Mintaválasz. A jóváhagyott árak az Árak oldalon lesznek elérhetők, a szolgáltatások tartalmának tételes leírásával.',
    copyStatus: 'demo',
  },
  {
    id: 'iroda',
    question: 'Személyesen is felkereshetem valamelyik irodát?',
    answer:
      'Mintaválasz. Az irodák ellenőrzött címe és nyitvatartása az Irodáink oldalon jelenik meg.',
    copyStatus: 'demo',
  },
];
