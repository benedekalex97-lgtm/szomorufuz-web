import { describe, expect, it } from 'vitest';

import { prices } from '@/content/data/prices';
import { canFeature, featuredPrice, formatAmount, priceBlock } from '@/lib/prices';

describe('árnyilvántartás (SZF-001)', () => {
  it('az összegek a forrás szerint változatlanok', () => {
    expect(prices['koporsos-temetes'].amount).toBe(232288);
    expect(prices['ravatalozo-terem'].amount).toBe(65000);
    expect(prices['polgari-bucsuztatas'].amount).toBe(35000);
    expect(prices['sephia-urna'].amount).toBe(23900);
    expect(formatAmount(232288)).toBe('232 288');
  });
  it('minden tételnek van forrása és ellenőrzési dátuma', () => {
    for (const p of Object.values(prices)) {
      expect(p.sourceUrl).toMatch(/^https:\/\/www\.budapest-temetkezes\.hu\//);
      expect(p.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
  it('a ravatalozó ára kiemelt helyen nem jelenhet meg', () => {
    expect(canFeature(prices['ravatalozo-terem'])).toBe(false);
    expect(featuredPrice('ravatalozo-terem').value).not.toMatch(/65/);
    expect(featuredPrice('ravatalozo-terem').quote).toBe(true);
  });
  it('a ravatalozó részletes ára mindig a feltétellel együtt jelenik meg', () => {
    const b = priceBlock('ravatalozo-terem');
    expect(b.type === 'price' && b.condition).toMatch(/három szolgáltatás/);
  });
  it('polgári búcsúztatásnál nincs ÁFA-állítás', () => {
    const b = priceBlock('polgari-bucsuztatas');
    expect(b.type === 'price' && b.note).toBeFalsy();
    expect(featuredPrice('polgari-bucsuztatas').note).toBe('');
  });
});
