/**
 * A Szomorúfűz-korona önálló, gyorsítótárazható SVG-fájljai (build időben generálva):
 *   /media/canopy-hero-back.svg, /media/canopy-hero-front.svg – főoldali asztali hero
 *     (animált; <picture> + médialekérdezés miatt mobilon nem töltődik le)
 *   /media/canopy-corner-paper.svg, /media/canopy-corner-ink.svg – statikus sarok-korona
 *     (aloldal-hero, CTA-sáv, lábléc)
 */
import type { APIRoute, GetStaticPaths } from 'astro';

import { canopyFiles } from '@/lib/canopy';

export const getStaticPaths = (() =>
  Object.keys(canopyFiles()).map((name) => ({ params: { name } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const svg = canopyFiles()[params.name ?? ''];
  if (!svg) return new Response('Nincs ilyen fájl', { status: 404 });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
