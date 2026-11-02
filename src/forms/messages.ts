/** Felhasználónak szóló üzenetek – a kliens és a szerver közösen használja. */
export const USER_MESSAGES = {
  disabled:
    'Az online küldés jelenleg nem aktív. Kérjük, hívja munkatársunkat a +36 30 847 1915-ös számon, vagy írjon a budapest@temetkezes.hu címre.',
  transport:
    'Az üzenetet most nem tudtuk továbbítani. Adatait megőriztük az űrlapon – kérjük, próbálja újra később, vagy hívjon minket a +36 30 847 1915-ös számon.',
  validation: 'Kérjük, javítsa a megjelölt mezőket.',
  rate: 'Rövid időn belül túl sok üzenet érkezett. Kérjük, próbálja újra néhány perc múlva, vagy hívjon minket a +36 30 847 1915-ös számon.',
  origin: 'A kérés nem a weboldalról érkezett.',
  bad: 'A kérés nem dolgozható fel.',
  tooLarge: 'Az üzenet túl hosszú.',
  pending: 'Az üzenet feldolgozása folyamatban van.',
  dryRun:
    'Tesztüzem: az adatok formailag rendben vannak, de az üzenetet NEM továbbítottuk. Valódi megkeresés esetén kérjük, hívja a +36 30 847 1915-ös számot.',
} as const;

export const NOTICE_ERROR = 'Kérjük, jelezze, hogy elolvasta az adatkezelési tájékoztatót.';
