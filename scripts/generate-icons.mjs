// A felhasznált ikonokat a lucide-static csomagból egy kis, típusos fájlba gyűjti.
// Új ikon: vedd fel a NAMES listába, majd futtasd: node scripts/generate-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const NAMES = [
  'phone',
  'arrow-right',
  'map-pin',
  'clock',
  'menu',
  'x',
  'chevron-down',
  'info',
  'external-link',
  'file-text',
  'list-checks',
  'building',
  'mail',
  'circle-question-mark',
];

const nodes = JSON.parse(
  readFileSync(new URL('../node_modules/lucide-static/icon-nodes.json', import.meta.url), 'utf8'),
);
const { version } = JSON.parse(
  readFileSync(new URL('../node_modules/lucide-static/package.json', import.meta.url), 'utf8'),
);

const toMarkup = (list) =>
  list
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .map(([k, v]) => `${k}="${v}"`)
          .join(' ')}/>`,
    )
    .join('');

const entries = NAMES.map((name) => {
  if (!nodes[name]) throw new Error(`Ismeretlen ikon: ${name}`);
  return `  '${name}': '${toMarkup(nodes[name])}',`;
});

writeFileSync(
  new URL('../src/components/ui/icons.generated.ts', import.meta.url),
  `// GENERÁLT FÁJL – ne szerkeszd kézzel. Forrás: lucide-static v${version} (ISC licenc).
// Újragenerálás: node scripts/generate-icons.mjs
export const icons = {
${entries.join('\n')}
} as const;

export type IconName = keyof typeof icons;
`,
);
console.log(`${NAMES.length} ikon generálva.`);
