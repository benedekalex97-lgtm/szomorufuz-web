/**
 * Az asztali hero-korona két rétege önálló, gyorsítótárazható SVG-ként (build időben).
 * /media/canopy-back.svg, /media/canopy-front.svg – csak asztali nézetben töltődnek le
 * (<picture> + médialekérdezés a HeroSection-ben).
 */
import type { APIRoute, GetStaticPaths } from 'astro';

import { canopyLayerSvg, generateCanopy } from '@/lib/canopy';

export const getStaticPaths = (() =>
  (['back', 'front'] as const).map((layer) => ({ params: { layer } }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ params }) => {
  const layer = params.layer === 'back' ? 'back' : 'front';
  return new Response(canopyLayerSvg(generateCanopy('hero', 7), layer), {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
};
