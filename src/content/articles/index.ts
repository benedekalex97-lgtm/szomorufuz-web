import type { Article } from '../types';
import { arajanlatKeres, arak, argarancia, tajekoztatasKeres } from './arak';
import {
  adatkezeles,
  ceginformaciok,
  gyik,
  jogiNyilatkozat,
  jogszabalyok,
  rolunk,
  urnak,
} from './ceg';
import {
  hamvakHazavitele,
  hamvakTemetese,
  hamvasztasMenete,
  hamvasztasosTemetes,
  hamvasztasUrnakiadas,
} from './hamvasztas';
import { szuksegesIratok, teendok } from './teendok';
import {
  fiumeiUtiTemeto,
  hamvakSzorasaDunaba,
  hamvakSzorasaTemeto,
  koporsosTemetes,
  polgariBucsuztatas,
  ravatalozoTerem,
  szocialisTemetes,
} from './temetes';

/** Minden cikk – a slug egyben az URL (perjellel). */
export const articles: Article[] = [
  teendok,
  szuksegesIratok,
  hamvasztasosTemetes,
  hamvasztasUrnakiadas,
  hamvakHazavitele,
  hamvakTemetese,
  hamvasztasMenete,
  koporsosTemetes,
  hamvakSzorasaTemeto,
  hamvakSzorasaDunaba,
  ravatalozoTerem,
  polgariBucsuztatas,
  fiumeiUtiTemeto,
  szocialisTemetes,
  arak,
  argarancia,
  arajanlatKeres,
  tajekoztatasKeres,
  rolunk,
  ceginformaciok,
  jogiNyilatkozat,
  adatkezeles,
  urnak,
  jogszabalyok,
  gyik,
];

export const articleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);
