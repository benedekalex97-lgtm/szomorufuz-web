/**
 * Kártya-kivonat (audit SZF-008). A korábbi egyszerű mondatbontás a magyar dátumoknál
 * („A 2013. november 1-jén…”) és rövidítéseknél vágott, csonka szöveget adva.
 *
 * Mondathatár csak ott van, ahol a .!? után szóköz és NAGYBETŰ következik, és a pont
 * előtti szó nem szám (dátum, sorszám), nem római szám és nem ismert rövidítés.
 */
const ABBREVIATIONS = new Set([
  'kb',
  'stb',
  'pl',
  'ill',
  'ún',
  'ker',
  'u',
  'krt',
  'dr',
  'kft',
  'bt',
  'zrt',
  'tel',
  'sz',
  'vö',
  'kir',
  'id',
  'ifj',
  'özv',
  'szül',
]);
const ROMAN = /^[IVXLCDM]+$/;
const UPPER = /\p{Lu}/u;

export function sentences(text: string): string[] {
  const out: string[] = [];
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch !== '.' && ch !== '!' && ch !== '?') continue;
    if (text[i + 1] !== ' ' || !UPPER.test(text[i + 2] ?? '')) continue;
    if (ch === '.') {
      const word = text.slice(start, i).split(/\s+/).pop() ?? '';
      const bare = word.replace(/^[„"(]+/, '');
      if (/\d$/.test(bare) || ROMAN.test(bare) || ABBREVIATIONS.has(bare.toLowerCase())) continue;
    }
    out.push(text.slice(start, i + 1).trim());
    start = i + 2;
  }
  const rest = text.slice(start).trim();
  if (rest) out.push(rest);
  return out;
}

/** Az első teljes mondat; ha nagyon rövid, a második is. Mindig teljes mondat(ok). */
export function excerpt(text: string, minLength = 60): string {
  const list = sentences(text);
  const first = list[0] ?? text;
  return first.length < minLength && list[1] ? `${first} ${list[1]}` : first;
}
