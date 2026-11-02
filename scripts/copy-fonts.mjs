// A magyar szöveghez szükséges (latin + latin-ext) változtatható betűfájlokat
// a public/fonts mappába másolja. Saját tárhelyről szolgáljuk ki őket:
// nincs harmadik feles (pl. Google Fonts) kérés → nincs adatátadás, gyorsabb betöltés.
// Futtatás csomagfrissítés után: node scripts/copy-fonts.mjs
import { copyFileSync, mkdirSync } from 'node:fs';

const FILES = [
  ['inter', 'inter-latin-wght-normal.woff2'],
  ['inter', 'inter-latin-ext-wght-normal.woff2'],
  ['newsreader', 'newsreader-latin-wght-normal.woff2'],
  ['newsreader', 'newsreader-latin-ext-wght-normal.woff2'],
];
const out = new URL('../public/fonts/', import.meta.url);
mkdirSync(out, { recursive: true });
for (const [pkg, file] of FILES) {
  copyFileSync(
    new URL(`../node_modules/@fontsource-variable/${pkg}/files/${file}`, import.meta.url),
    new URL(file, out),
  );
}
copyFileSync(
  new URL('../node_modules/@fontsource-variable/inter/LICENSE', import.meta.url),
  new URL('LICENSE-inter.txt', out),
);
copyFileSync(
  new URL('../node_modules/@fontsource-variable/newsreader/LICENSE', import.meta.url),
  new URL('LICENSE-newsreader.txt', out),
);
console.log(`${FILES.length} betűfájl másolva: public/fonts/`);
