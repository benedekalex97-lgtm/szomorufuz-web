/**
 * Szomorúfűz-lombkorona generátor (prémium hero-motívum).
 *
 * Koncepció: nem egy „kirakott fa” az oldal szélén, hanem a fa koronája alatt állunk –
 * az ívelt ágak a képen kívülről érkeznek, a csüngő vesszők levélsorokkal hullanak alá,
 * és lefelé feloldódnak a papírszerű háttérben. Egy bronz „kísérő vessző” (asztali nézet)
 * a hero aljáig ér, és ott találkozik a következő szekció vonalával.
 *
 * Determinisztikus (rögzített mag), build időben fut – a böngészőben nincs generálás.
 * Két kimenet: a mobil „lombfüggöny” beágyazott SVG (WillowCanopy.astro), az asztali
 * korona két önálló, gyorsítótárazható SVG-fájl (src/pages/media/canopy-[layer].svg.ts).
 */
/** hero: főoldali asztali korona · valance: mobil lombfüggöny · corner: kisebb sarokkorona (aloldalak, CTA, lábléc) */
export type CanopyVariant = 'hero' | 'valance' | 'corner';
export type Pt = { x: number; y: number };

export interface Bough {
  d: string;
  a: Pt;
  c: Pt;
  b: Pt;
  delay: number;
  len: number;
}

export interface Strand {
  stem: string;
  stemLen: number;
  leaves: string;
  origin: Pt;
  delay: number;
  dur: number;
  sway: number;
  swayDelay: number;
}

export interface Canopy {
  variant: CanopyVariant;
  W: number;
  H: number;
  boughs: Bough[];
  back: Strand[];
  front: Strand[];
  accent: Strand | null;
}

export function generateCanopy(variant: CanopyVariant, seed = 7): Canopy {
  const isHero = variant === 'hero';
  const isCorner = variant === 'corner';
  // a hero és a sarok-korona azonos szerkezetű; a sarok arányosan kisebb
  const isTall = variant !== 'valance';
  // ---------- determinisztikus PRNG (mulberry32) ----------
  function rng(a: number) {
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const r = rng(seed);
  const between = (min: number, max: number) => min + r() * (max - min);
  const n1 = (v: number) => Math.round(v * 10) / 10;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  /** Rövid számalak: 1 tizedes, felesleges nulla és vezető nulla nélkül */
  const num = (v: number) => String(n1(v)).replace(/^(-?)0\./, '$1.');

  const W = isCorner ? 480 : isHero ? 720 : 420;
  const H = isCorner ? 560 : isHero ? 880 : 180;
  const sx = W / 720;
  const sy = H / 880;

  /** Másodfokú Bézier-pont */
  const quad = (a: Pt, c: Pt, b: Pt, t: number): Pt => ({
    x: (1 - t) ** 2 * a.x + 2 * (1 - t) * t * c.x + t ** 2 * b.x,
    y: (1 - t) ** 2 * a.y + 2 * (1 - t) * t * c.y + t ** 2 * b.y,
  });
  /** Harmadfokú Bézier-pont és érintő */
  const cubic = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number) => {
    const u = 1 - t;
    const pt = {
      x: u ** 3 * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t ** 3 * p3.x,
      y: u ** 3 * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t ** 3 * p3.y,
    };
    const d = {
      x: 3 * u * u * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t * t * (p3.x - p2.x),
      y: 3 * u * u * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t * t * (p3.y - p2.y),
    };
    const len = Math.hypot(d.x, d.y) || 1;
    return { pt, tan: { x: d.x / len, y: d.y / len } };
  };

  /** Útvonalhossz mintavételezéssel (a vonalrajz-animáció szaggatásához) */
  const lengthOf = (f: (t: number) => Pt) => {
    let L = 0;
    let prev = f(0);
    for (let i = 1; i <= 40; i++) {
      const p = f(i / 40);
      L += Math.hypot(p.x - prev.x, p.y - prev.y);
      prev = p;
    }
    return Math.ceil(L) + 2;
  };

  // ---------- ágak: a képen kívülről (jobb felül) érkező, a végükön lehajló ívek ----------
  // A kontrollpont a magas (jobb) oldal szintjén, a bal vég közelében van: az ág előbb
  // szinte vízszintesen fut, majd a vége kecsesen lehajlik – ettől „fűz” és nem „ernyő”.
  const boughs: Bough[] = [];
  const boughCount = isHero ? 6 : 5;
  for (let i = 0; i < boughCount; i++) {
    const t = i / (boughCount - 1);
    // Az ág a képen kívülről, a felső perem közelében érkezik, vízszintesen fut,
    // majd a vége kecsesen lehajlik. Mindkét szakasz a képen belül látszik.
    const a: Pt = isTall
      ? { x: W + between(30, 110) * sx, y: (between(-60, 10) + t * 30) * sy }
      : { x: W + between(10, 40), y: between(-16, 4) };
    const b: Pt = isTall
      ? { x: W * (0.06 + 0.72 * t) + between(-20, 20) * sx, y: (between(190, 330) - t * 70) * sy }
      : { x: W * (0.04 + 0.8 * t) + between(-10, 10), y: between(56, 84) - t * 12 };
    const c: Pt = {
      x: lerp(a.x, b.x, between(0.78, 0.92)),
      y: a.y + (isTall ? between(-50, -10) * sy : between(-14, -2)),
    };
    boughs.push({
      d: `M${n1(a.x)} ${n1(a.y)} Q ${n1(c.x)} ${n1(c.y)}, ${n1(b.x)} ${n1(b.y)}`,
      a,
      c,
      b,
      delay: 80 + i * 90,
      len: lengthOf((t) => quad(a, c, b, t)),
    });
  }

  // ---------- vesszők levélsorral ----------

  function makeStrand(origin: Pt, len: number, drift: number, leafScale: number) {
    const p0 = origin;
    const p1 = { x: origin.x + between(-4, 4), y: origin.y + len * 0.3 };
    const p2 = { x: origin.x + drift * between(0.45, 0.8), y: origin.y + len * 0.7 };
    const p3 = { x: origin.x + drift, y: origin.y + len };
    const stem = `M${n1(p0.x)} ${n1(p0.y)} C ${n1(p1.x)} ${n1(p1.y)}, ${n1(p2.x)} ${n1(p2.y)}, ${n1(p3.x)} ${n1(p3.y)}`;

    // Kitöltött, keskeny lándzsás levelek (mandula-forma), lefelé-kifelé állva,
    // váltakozó oldalon; a csúcs felé rövidülnek. Vesszőnként egyetlen útvonal.
    const parts: string[] = [];
    const spacing = isTall ? 9 : 7.5;
    const count = Math.max(4, Math.round(len / spacing));
    for (let k = 0; k < count; k++) {
      // szabálytalan ritmus: kis szórás a helyzetben, néha kimarad egy levél
      if (k > 1 && r() < 0.14) continue;
      const t = Math.min(0.99, 0.08 + ((k + between(-0.3, 0.3)) / count) * 0.92);
      const { pt, tan } = cubic(p0, p1, p2, p3, t);
      const side = k % 2 === 0 ? 1 : -1;
      const size = leafScale * (15 - t * 7) * between(0.7, 1.2);
      const ang = (between(7, 17) * Math.PI) / 180;
      const dir = {
        x: tan.x * Math.cos(ang) - side * tan.y * Math.sin(ang),
        y: tan.y * Math.cos(ang) + side * tan.x * Math.sin(ang),
      };
      const half = size * 0.12;
      const tip = { x: pt.x + dir.x * size, y: pt.y + dir.y * size };
      const mid = { x: pt.x + dir.x * size * 0.42, y: pt.y + dir.y * size * 0.42 };
      const nrm = { x: -dir.y, y: dir.x };
      const c1 = { x: mid.x + nrm.x * half * 2, y: mid.y + nrm.y * half * 2 };
      const c2 = { x: mid.x - nrm.x * half * 2, y: mid.y - nrm.y * half * 2 };
      // Relatív parancsok rövid számokkal: kisebb HTML, azonos forma
      const o = { x: n1(pt.x), y: n1(pt.y) };
      const rel = (q: Pt, from: Pt) => `${num(q.x - from.x)} ${num(q.y - from.y)}`;
      const tipR = { x: n1(tip.x), y: n1(tip.y) };
      parts.push(`M${o.x} ${o.y}q${rel(c1, o)} ${rel(tipR, o)}q${rel(c2, tipR)} ${rel(o, tipR)}z`);
    }
    const stemLen = lengthOf((t) => cubic(p0, p1, p2, p3, t).pt);
    return { stem, stemLen, leaves: parts.join('') };
  }

  /** Vesszők egyenletesen az ágak külső szakaszán, kis szórással */
  function strandsFor(
    perBough: number,
    depthRange: [number, number],
    leafScale: number,
    swayScale: number,
  ): Strand[] {
    const out: Strand[] = [];
    boughs.forEach((bough) => {
      for (let k = 0; k < perBough; k++) {
        const u = lerp(0.38, 1, (k + between(0.1, 0.9)) / perBough);
        const origin = quad(bough.a, bough.c, bough.b, u);
        if (origin.y < (isTall ? -10 : -4)) continue;
        // a hosszak erősen eltérnek: sok rövidebb és néhány nagyon hosszú vessző
        const depth = lerp(depthRange[0], depthRange[1], r() ** 1.6);
        const len = (H - origin.y) * depth;
        const { stem, stemLen, leaves } = makeStrand(origin, len, between(-18, 6), leafScale);
        const delay = Math.round(bough.delay + 200 + u * 360 + between(0, 260));
        const dur = Math.round(1100 + depth * (isTall ? 900 : 500));
        out.push({
          stem,
          stemLen,
          leaves,
          origin,
          delay,
          dur,
          sway: n1(swayScale * between(0.55, 1.1) * (r() > 0.5 ? 1 : -1)),
          // a megnyugvás a rajzolás második felében indul; minden mozgás 5 s-on belül véget ér
          swayDelay: Math.min(Math.round(delay + dur * 0.5), 2400),
        });
      }
    });
    return out;
  }

  const back = isHero ? strandsFor(2, [0.25, 0.75], 0.8, 0.6) : [];
  const front = isHero
    ? strandsFor(3, [0.25, 1], 0.95, 1)
    : isCorner
      ? strandsFor(3, [0.3, 1], 0.85, 0)
      : strandsFor(4, [0.3, 1], 0.72, 0);

  // Kísérő (bronz) vessző – csak asztali nézetben: a hero aljáig ér, ott találkozik
  // a szolgáltatás-sáv vonalával.
  // legalább 5 ág mindig van (boughCount ≥ 5)
  const accentBough = boughs[2] as Bough;
  const accentOrigin = quad(accentBough.a, accentBough.c, accentBough.b, 0.9);
  const accent: Strand | null = isHero
    ? {
        ...makeStrand(accentOrigin, H - accentOrigin.y + 4, -10, 1.05),
        origin: accentOrigin,
        // az ága ekkorra ér el a rögzítési pontig – a vessző nem „lebeg” előtte
        delay: 950,
        dur: 1600,
        sway: 0.35,
        swayDelay: 1900,
      }
    : null;

  return { variant, W, H, boughs, back, front, accent };
}

const r1 = (v: number) => Math.round(v * 10) / 10;

/** Vesszőnkénti animációs paraméterek (CSS-változók) */
export function strandStyle(s: Strand): string {
  return `--len:${s.stemLen};--delay:${s.delay}ms;--dur:${s.dur}ms;--sway:${s.sway}deg;--sway-delay:${s.swayDelay}ms;transform-origin:${r1(s.origin.x)}px ${r1(s.origin.y)}px`;
}

// ---------- Önálló SVG-fájl (asztali korona) ----------
// <img>-ként töltődik be, ezért a színek és görbék itt rögzítettek (a tokenek értékei:
// --color-accent-decor #89745d, --color-accent-text #6e5b47, levél #a8957f,
// --ease-out cubic-bezier(0.23, 1, 0.32, 1)). A prefers-reduced-motion a képben is érvényes.
const LAYER_CSS = `
.b{fill:none;stroke:#89745d;stroke-width:1;stroke-linecap:round;opacity:.85}
.s{fill:none;stroke-width:.6;stroke-linecap:round;opacity:.6}
.l{stroke:none}
.a .s{stroke:#6e5b47;stroke-width:.9;opacity:.9}
.a .l{fill:#6e5b47;opacity:.75}
@media (prefers-reduced-motion:no-preference){
.b,.s{stroke-dasharray:calc(var(--len)*1px) calc(var(--len)*1px);stroke-dashoffset:calc(var(--len)*1px);animation:d var(--dur,1400ms) cubic-bezier(.23,1,.32,1) var(--delay,0ms) both}
.b{--dur:1500ms}
.l{clip-path:inset(0 0 100% 0);animation:u var(--dur,1400ms) cubic-bezier(.23,1,.32,1) calc(var(--delay,0ms) + 120ms) both}
.g{animation:w 2200ms cubic-bezier(.37,0,.63,1) var(--sway-delay,0ms) both}
}
@keyframes d{to{stroke-dashoffset:0}}
@keyframes u{to{clip-path:inset(0 0 -2% 0)}}
@keyframes w{0%{transform:rotate(0)}32%{transform:rotate(var(--sway))}60%{transform:rotate(calc(var(--sway)*-.42))}82%{transform:rotate(calc(var(--sway)*.14))}100%{transform:rotate(0)}}
`.replace(/\n/g, '');

const strandMarkup = (s: Strand, extra = '') =>
  `<g class="g${extra}" style="${strandStyle(s)}"><path class="s" d="${s.stem}"/><path class="l" d="${s.leaves}"/></g>`;

/**
 * Az asztali korona egy rétege önálló SVG-dokumentumként.
 * back: halványabb, vékonyabb vesszők (lassabban mozog görgetéskor) ·
 * front: ágak, fő vesszők és a bronz kísérő vessző.
 */
export function canopyLayerSvg(c: Canopy, layer: 'back' | 'front'): string {
  const grad =
    layer === 'back'
      ? '<stop offset="0" stop-color="#a8957f" stop-opacity=".5"/><stop offset=".6" stop-color="#a8957f" stop-opacity=".3"/><stop offset="1" stop-color="#a8957f" stop-opacity="0"/>'
      : '<stop offset="0" stop-color="#a8957f" stop-opacity=".95"/><stop offset=".55" stop-color="#a8957f" stop-opacity=".7"/><stop offset="1" stop-color="#a8957f" stop-opacity=".04"/>';
  const strands = (layer === 'back' ? c.back : c.front).map((s) => strandMarkup(s)).join('');
  const boughs =
    layer === 'front'
      ? c.boughs
          .map((b) => `<path class="b" d="${b.d}" style="--delay:${b.delay}ms;--len:${b.len}"/>`)
          .join('')
      : '';
  const accent = layer === 'front' && c.accent ? strandMarkup(c.accent, ' a') : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${c.W} ${c.H}" width="${c.W}" height="${c.H}" fill="none" preserveAspectRatio="xMaxYMin slice">` +
    `<style>${LAYER_CSS}</style>` +
    `<defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="${c.H}" gradientUnits="userSpaceOnUse">${grad}</linearGradient></defs>` +
    boughs +
    `<g stroke="url(#f)" fill="url(#f)">${strands}</g>` +
    accent +
    `</svg>`
  );
}

/** Rövid tartalom-hash a gyorsítótár-ürítéshez (?v=…) */
export function contentHash(text: string): string {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

/** Színvilágok a statikus (animálatlan) sarok-koronához */
const PALETTES = {
  paper: { stem: '#89745d', leaf: '#a8957f' },
  ink: { stem: '#c2a988', leaf: '#c2a988' },
} as const;
export type CanopyPalette = keyof typeof PALETTES;

/**
 * Statikus sarok-korona önálló SVG-ként (aloldal-hero, CTA-sáv, lábléc). Animáció nélkül:
 * ezek minden oldalon megjelennek – a mozgás a ritkán látott főoldali hero-é.
 */
export function canopyStaticSvg(c: Canopy, palette: CanopyPalette): string {
  const { stem, leaf } = PALETTES[palette];
  const strands = [...c.back, ...c.front]
    .map((s) => `<path class="s" d="${s.stem}"/><path class="l" d="${s.leaves}"/>`)
    .join('');
  const boughs = c.boughs.map((b) => `<path class="b" d="${b.d}"/>`).join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${c.W} ${c.H}" width="${c.W}" height="${c.H}" fill="none" preserveAspectRatio="xMaxYMin slice">` +
    `<style>.b{fill:none;stroke:${stem};stroke-width:1;stroke-linecap:round;opacity:.85}.s{fill:none;stroke-width:.6;stroke-linecap:round;opacity:.6}.l{stroke:none}</style>` +
    `<defs><linearGradient id="f" x1="0" y1="0" x2="0" y2="${c.H}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${leaf}" stop-opacity=".95"/><stop offset=".55" stop-color="${leaf}" stop-opacity=".65"/><stop offset="1" stop-color="${leaf}" stop-opacity="0"/></linearGradient></defs>` +
    boughs +
    `<g stroke="url(#f)" fill="url(#f)">${strands}</g>` +
    `</svg>`
  );
}

/** A /media/ alatt kiszolgált korona-fájlok neve → tartalom */
export function canopyFiles(): Record<string, string> {
  const hero = generateCanopy('hero', 7);
  const corner = generateCanopy('corner', 11);
  return {
    'hero-back': canopyLayerSvg(hero, 'back'),
    'hero-front': canopyLayerSvg(hero, 'front'),
    'corner-paper': canopyStaticSvg(corner, 'paper'),
    'corner-ink': canopyStaticSvg(corner, 'ink'),
  };
}

/** Verziózott URL (?v=tartalom-hash) – a fájl így hosszan gyorsítótárazható */
export function canopySrc(name: string): string {
  const svg = canopyFiles()[name];
  if (!svg) throw new Error(`Ismeretlen korona-fájl: ${name}`);
  return `/media/canopy-${name}.svg?v=${contentHash(svg)}`;
}
