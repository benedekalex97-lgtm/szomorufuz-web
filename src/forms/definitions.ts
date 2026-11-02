/**
 * Űrlapdefiníciók (audit SZF-002/003). A kérdések és válaszlehetőségek SZÓ SZERINT
 * az élő oldal űrlapjaiból származnak (2026-11-02, lásd docs/audit-remediation-2026-11.md
 * „Űrlapmező-térkép”). A definíciót a kliens (megjelenítés, ellenőrzés) és a szerver
 * (ellenőrzés, e-mail összeállítás) EGYARÁNT használja – egyetlen igazságforrás.
 */
import { productTitle, products } from '@/content/data/products';

export type FieldKind = 'text' | 'email' | 'tel' | 'textarea' | 'radio' | 'checkboxes' | 'select';

export interface FieldDef {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  options?: readonly string[];
  hint?: string;
  autocomplete?: string;
  /** Alapértelmezés: text 200, textarea 3000 karakter */
  maxLength?: number;
}

export interface SectionDef {
  legend: string;
  fields: FieldDef[];
}

export type FormId =
  | 'arajanlat'
  | 'hamvasztasos'
  | 'koporsos'
  | 'szoras'
  | 'ravatalozo'
  | 'termek'
  | 'kapcsolat'
  | 'visszahivas';

export interface FormDef {
  id: FormId;
  /** Az e-mail tárgyában és a naplóban szerepel – felhasználói adat soha. */
  title: string;
  submitLabel: string;
  successMessage: string;
  sections: SectionDef[];
  /** Az eredeti űrlap azonosítója a régi rendszerben (dokumentációhoz) */
  legacyId: string;
}

export const MAX = { text: 200, textarea: 3000 } as const;

// ---------- közös mezők ----------
const ELHUNYT_HELYE = [
  'Kórházban',
  'Igazságügyi intézményben',
  'Temetőben',
  'Temetkezési cég halottasházában',
  'Nem tudom',
] as const;
const VALASZ_MOD = ['E-mailben küldjék el', 'Telefonon visszahívást kérek'] as const;

const nev = (required = true): FieldDef => ({
  name: 'nev',
  label: 'Az Ön neve',
  kind: 'text',
  required,
  autocomplete: 'name',
});
const email = (required = true): FieldDef => ({
  name: 'email',
  label: 'Az Ön e-mail címe',
  kind: 'email',
  required,
  autocomplete: 'email',
});
const telefon = (required = true): FieldDef => ({
  name: 'telefon',
  label: 'Az Ön telefonszáma',
  kind: 'tel',
  required,
  autocomplete: 'tel',
  hint: 'Körzetszámmal együtt (06 vagy +36 kezdettel).',
});
const elhunytNeve = (required: boolean): FieldDef => ({
  name: 'elhunyt_neve',
  label: 'Elhunyt neve',
  kind: 'text',
  required,
  autocomplete: 'off',
});
const valaszMod = (required: boolean, label = 'Milyen formában kéri az ajánlatot?'): FieldDef => ({
  name: 'valasz_mod',
  label,
  kind: 'radio',
  required,
  options: VALASZ_MOD,
});
const elhunytHelye: FieldDef = {
  name: 'elhunyt_helye',
  label: 'Hol fekszik az elhunyt?',
  kind: 'radio',
  required: true,
  options: ELHUNYT_HELYE,
};
const elhunytHelyeNeve: FieldDef = {
  name: 'elhunyt_helye_neve',
  label: 'Kórház vagy temető megnevezése',
  kind: 'text',
  required: true,
};
const megjegyzes = (label = 'Megjegyzés, közlemény'): FieldDef => ({
  name: 'megjegyzes',
  label,
  kind: 'textarea',
});

const QUOTE_SUCCESS =
  'Köszönjük, árajánlatkérését rendszerünk fogadta. Munkatársunk a választott módon (e-mailben vagy telefonon) keresi Önt.';

// ---------- űrlapok ----------
export const forms: Record<FormId, FormDef> = {
  // /arajanlat-keres-itt/ – form_1465
  arajanlat: {
    id: 'arajanlat',
    legacyId: 'form_1465',
    title: 'Árajánlatkérés',
    submitLabel: 'Kérem az ajánlatot',
    successMessage: QUOTE_SUCCESS,
    sections: [
      {
        legend: 'A temetésről',
        fields: [
          {
            name: 'temetes_tipusa',
            label: 'Temetés típusa',
            kind: 'radio',
            required: true,
            options: ['Hamvasztásos', 'Koporsós'],
          },
          {
            name: 'nyugalom_helye',
            label: 'Hol kívánja nyugalomra helyezni az elhunytat?',
            kind: 'radio',
            options: [
              'Budapesten, temetőben',
              'Budapesten, altemplomban',
              'Vidéken, temetőben',
              'Haza kívánom vinni a hamvakat',
              'Egyéb helyen',
            ],
          },
          {
            name: 'nyugalom_hely_neve',
            label: 'Temető, templom vagy egyéb hely megnevezése',
            kind: 'text',
          },
          {
            name: 'sirhely',
            label: 'Van-e már meglévő sírhely?',
            kind: 'radio',
            options: [
              'Igen, már van sírhely',
              'Nem, új sírhelyet vásárolok',
              'Nincs rá szükség, szórást választok',
              'Nem tudom',
            ],
          },
          {
            name: 'sirhely_tipusa',
            label: 'Milyen típusú a sírhely?',
            kind: 'radio',
            options: [
              'Urnafülke',
              'Urnasír',
              'Urnakripta',
              'Meglévő koporsós sírhely',
              'Sírbolt (kripta)',
              'Nem tudom',
            ],
          },
        ],
      },
      {
        legend: 'Az elhunytról',
        fields: [
          {
            name: 'halaleset_helye',
            label: 'Hol történt a haláleset?',
            kind: 'radio',
            required: true,
            options: ['Kórházban', 'Lakáson', 'Külföldön', 'Egyéb helyen'],
          },
          elhunytHelye,
          { ...elhunytHelyeNeve, label: 'Közelebbi megnevezése' },
          elhunytNeve(true),
          megjegyzes(),
        ],
      },
      {
        legend: 'Az Ön adatai',
        fields: [valaszMod(true), nev(), email(), telefon()],
      },
    ],
  },

  // /hamvasztasos-temetes/, /hamvasztas-urnakiadas/, /hamvak-hazavitele/, /hamvak-temetese/,
  // /szocialis-temetes/ – form_1483
  hamvasztasos: {
    id: 'hamvasztasos',
    legacyId: 'form_1483',
    title: 'Árajánlatkérés – hamvasztásos temetés',
    submitLabel: 'Kérem az ajánlatot',
    successMessage: QUOTE_SUCCESS,
    sections: [
      {
        legend: 'A hamvak elhelyezése',
        fields: [
          {
            name: 'hamvak_helye',
            label: 'Hol kívánja elhelyezni a hamvakat?',
            kind: 'radio',
            required: true,
            options: [
              'Hazaviszem az otthonomba',
              'Temetőben, Budapesten',
              'Temetői szóróparcellában, Budapesten',
              'Temetőben, vidéken',
              'Templomban',
            ],
          },
          { name: 'hely_neve', label: 'Temető vagy templom megnevezése', kind: 'text' },
          {
            name: 'sirhely',
            label: 'Rendelkezik-e már sírhellyel?',
            kind: 'radio',
            options: [
              'Igen, már van sírhely',
              'Nem, új sírhelyet veszek igénybe',
              'Nincs rá szükség, szórást választok',
              'Nem tudom',
            ],
          },
          {
            name: 'sirhely_tipusa',
            label: 'Milyen típusú a sírhely?',
            kind: 'radio',
            options: [
              'Urnafülke',
              'Urnasír',
              'Urnakripta',
              'Meglévő koporsós sírhely',
              'Nem tudom',
            ],
          },
        ],
      },
      {
        legend: 'Az elhunytról',
        fields: [elhunytHelye, elhunytHelyeNeve, elhunytNeve(false), megjegyzes()],
      },
      { legend: 'Az Ön adatai', fields: [valaszMod(true), nev(), email(), telefon()] },
    ],
  },

  // /koporsos-temetes/ – form_1528
  koporsos: {
    id: 'koporsos',
    legacyId: 'form_1528',
    title: 'Árajánlatkérés – koporsós temetés',
    submitLabel: 'Kérem az ajánlatot',
    successMessage: QUOTE_SUCCESS,
    sections: [
      {
        legend: 'A temetés helye',
        fields: [
          {
            name: 'nyugalom_helye',
            label: 'Hol kívánja végső nyugalomra helyezni az elhunytat?',
            kind: 'radio',
            required: true,
            options: ['Budapesti temetőben', 'Vidéki temetőben', 'Külföldön'],
          },
          { name: 'temeto_neve', label: 'Temető megnevezése', kind: 'text' },
          {
            name: 'sirhely',
            label: 'Rendelkezik-e már sírhellyel?',
            kind: 'radio',
            options: ['Igen, már van meglévő sírhely', 'Nem, újat vásárolok'],
          },
          {
            name: 'sirko',
            label: 'Meglévő sírhely esetén van-e sírkő a sírhelyen?',
            kind: 'radio',
            options: ['Van', 'Nincs', 'Nem tudom'],
          },
        ],
      },
      {
        legend: 'Az elhunytról',
        fields: [elhunytHelye, elhunytHelyeNeve, elhunytNeve(true), megjegyzes('Megjegyzés')],
      },
      {
        legend: 'Az Ön adatai',
        fields: [
          valaszMod(false, 'Milyen formában kéri az árajánlatot?'),
          nev(),
          email(),
          telefon(),
        ],
      },
    ],
  },

  // /hamvak-szorasa-temeto/, /hamvak-szorasa-dunaba/ – form_1641
  szoras: {
    id: 'szoras',
    legacyId: 'form_1641',
    title: 'Árajánlatkérés – hamvak szórása',
    submitLabel: 'Kérem az ajánlatot',
    successMessage: QUOTE_SUCCESS,
    sections: [
      {
        legend: 'A szórás helye',
        fields: [
          {
            name: 'szoras_helye',
            label: 'Hol kívánja szóratni az elhunyt hamvait?',
            kind: 'radio',
            required: true,
            options: [
              'Temetőben, Budapesten',
              'Templomban, Budapesten',
              'Hajóról a Duna folyóba',
              'Repülőgépről a Duna folyóba',
              'Saját helyszínen, az Önök szervezésében',
            ],
          },
          { name: 'hely_neve', label: 'Temető vagy templom megnevezése', kind: 'text' },
        ],
      },
      {
        legend: 'Az elhunytról',
        fields: [
          {
            name: 'halaleset_helye',
            label: 'Hol történt a haláleset?',
            kind: 'radio',
            options: ['Budapesten', 'Vidéken', 'Külföldön', 'Meglévő hamvakról van szó'],
          },
          elhunytHelye,
          elhunytHelyeNeve,
          elhunytNeve(false),
          megjegyzes(),
        ],
      },
      { legend: 'Az Ön adatai', fields: [valaszMod(false), nev(), email(), telefon()] },
    ],
  },

  // /ravatalozo-terem/ – form_3358
  ravatalozo: {
    id: 'ravatalozo',
    legacyId: 'form_3358',
    title: 'Árajánlatkérés – ravatalozó terem és búcsúszertartás',
    submitLabel: 'Kérem az ajánlatot',
    successMessage: QUOTE_SUCCESS,
    sections: [
      {
        legend: 'A hamvasztás és a haláleset',
        fields: [
          {
            name: 'hamvasztas',
            label: 'Megtörtént-e már a hamvasztás?',
            kind: 'radio',
            required: true,
            options: [
              'Igen, korábban az önök cége végezte',
              'Igen, másik temetkezés végezte',
              'Nem, önökkel kívánom elvégeztetni',
            ],
          },
          {
            name: 'halaleset_helye',
            label: 'Hol történt a haláleset?',
            kind: 'radio',
            options: [
              'Kórházban, klinikán',
              'Lakáson',
              'Közterületen',
              'Külföldön',
              'Régebben történt, már megvannak a hamvak',
            ],
          },
          {
            name: 'halaleset_telepules',
            label: 'Melyik településen történt a haláleset?',
            kind: 'text',
          },
          {
            name: 'elhunyt_helye',
            label: 'Hol fekszik az elhunyt?',
            kind: 'radio',
            options: [
              'Kórházban, klinikán',
              'Szociális intézményben',
              'Igazságügyi intézményben',
              'Temetőben',
              'Másik temetkezés halottasházában',
            ],
          },
          {
            name: 'elhunyt_telepules',
            label: 'Melyik településen fekszik az elhunyt?',
            kind: 'text',
          },
        ],
      },
      {
        legend: 'A szertartás',
        fields: [
          {
            name: 'szolgaltatasok',
            label: 'Mely szolgáltatásokat igényli?',
            kind: 'checkboxes',
            options: [
              'Ravatalozó terem',
              'Polgári búcsúszertartás',
              'Egyházi búcsúszertartás',
              'Halotti tor rendezése',
            ],
          },
          {
            name: 'datum',
            label: 'Mely dátumra tervezi a szertartást?',
            kind: 'text',
            hint: 'Például: 2026. november 20. – vagy írja le, mikor lenne megfelelő.',
          },
          elhunytNeve(true),
          megjegyzes('Megjegyzés, kérdés'),
        ],
      },
      { legend: 'Az Ön adatai', fields: [nev(), email(), telefon()] },
    ],
  },

  // /termek-adatlapok/…/ – interest_form
  termek: {
    id: 'termek',
    legacyId: 'interest_form',
    title: 'Termékérdeklődés',
    submitLabel: 'Érdeklődés küldése',
    successMessage:
      'Köszönjük, érdeklődését rendszerünk fogadta. Munkatársunk a megadott elérhetőségen keresi Önt.',
    sections: [
      {
        legend: 'A termék',
        fields: [
          {
            name: 'termek',
            label: 'Melyik termék érdekli?',
            kind: 'select',
            required: true,
            options: products.map(productTitle),
          },
          { name: 'uzenet', label: 'Üzenet', kind: 'textarea', required: true },
        ],
      },
      {
        legend: 'Az Ön adatai',
        fields: [
          { ...nev(false), label: 'Név' },
          { ...email(), label: 'E-mail cím' },
          { ...telefon(), label: 'Telefon' },
        ],
      },
    ],
  },

  // /elerhetoseg/ – form_3863
  kapcsolat: {
    id: 'kapcsolat',
    legacyId: 'form_3863',
    title: 'Üzenet a Kapcsolat oldalról',
    submitLabel: 'Üzenet küldése',
    successMessage:
      'Köszönjük, üzenetét rendszerünk fogadta. Munkatársunk a megadott elérhetőségen válaszol.',
    sections: [
      {
        legend: 'Üzenet',
        fields: [
          nev(),
          email(),
          telefon(false),
          { name: 'kerdes', label: 'Kérdés vagy kérés', kind: 'textarea' },
          elhunytNeve(false),
        ],
      },
    ],
  },

  // /tajekoztatas-keres/ – form_1973
  visszahivas: {
    id: 'visszahivas',
    legacyId: 'form_1973',
    title: 'Telefonos visszahívás kérése',
    submitLabel: 'Visszahívást kérek',
    successMessage:
      'Köszönjük, visszahívási kérését rendszerünk fogadta. Munkatársunk a megadott telefonszámon keresi Önt.',
    sections: [
      {
        legend: 'Telefonos visszahívás',
        fields: [
          nev(),
          telefon(),
          {
            name: 'idopont',
            label: 'Mikor hívjuk fel Önt?',
            kind: 'text',
            hint: 'Írja le saját szavaival, mikor alkalmas Önnek a hívás.',
          },
          { name: 'tema', label: 'Milyen témában kér tájékoztatást?', kind: 'text' },
        ],
      },
    ],
  },
};

// ---------- szolgáltatások → űrlap (a CTA-k ?szolgaltatas= paramétere) ----------
export interface ServiceForm {
  id: string;
  label: string;
  form: FormId;
  /** Előre kiválasztott válasz(ok) – csak az eredeti opciók közül */
  prefill?: Record<string, string>;
}

export const serviceForms: ServiceForm[] = [
  { id: 'hamvasztasos-temetes', label: 'Hamvasztásos temetés', form: 'hamvasztasos' },
  { id: 'hamvasztas-urnakiadas', label: 'Hamvasztás urnakiadással', form: 'hamvasztasos' },
  {
    id: 'hamvak-hazavitele',
    label: 'Hamvak hazavitele',
    form: 'hamvasztasos',
    prefill: { hamvak_helye: 'Hazaviszem az otthonomba' },
  },
  { id: 'hamvak-temetese', label: 'Hamvak temetése', form: 'hamvasztasos' },
  { id: 'szocialis-temetes', label: 'Szociális temetés', form: 'hamvasztasos' },
  { id: 'koporsos-temetes', label: 'Koporsós temetés', form: 'koporsos' },
  {
    id: 'hamvak-szorasa-temeto',
    label: 'Hamvak szórása temetőben',
    form: 'szoras',
    prefill: { szoras_helye: 'Temetőben, Budapesten' },
  },
  {
    id: 'hamvak-szorasa-dunaba',
    label: 'Hamvak szórása a Dunába (hajós)',
    form: 'szoras',
    prefill: { szoras_helye: 'Hajóról a Duna folyóba' },
  },
  {
    id: 'ravatalozo-terem',
    label: 'Ravatalozó terem és búcsúszertartás',
    form: 'ravatalozo',
    prefill: { szolgaltatasok: 'Ravatalozó terem' },
  },
  { id: 'termek', label: 'Termékérdeklődés', form: 'termek' },
];

export const QUOTE_FORMS: FormId[] = [
  'arajanlat',
  'hamvasztasos',
  'koporsos',
  'szoras',
  'ravatalozo',
  'termek',
];

export function serviceById(id: string | null | undefined): ServiceForm | undefined {
  return serviceForms.find((s) => s.id === id);
}

export function allFields(def: FormDef): FieldDef[] {
  return def.sections.flatMap((s) => s.fields);
}

export function quoteHref(serviceId: string, extra: Record<string, string> = {}): string {
  const q = new URLSearchParams({ szolgaltatas: serviceId, ...extra });
  return `/arajanlat-keres-itt/?${q.toString()}#urlap`;
}
