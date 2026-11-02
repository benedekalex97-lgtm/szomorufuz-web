import { describe, expect, it } from 'vitest';

import { articles } from '@/content/articles';
import { excerpt, sentences } from '@/lib/excerpt';

describe('kártya-kivonat (SZF-008)', () => {
  it('nem vág dátumnál, római számnál, rövidítésnél', () => {
    expect(
      sentences('A 2013. november 1-jén hatályba lépett törvény szerint. Második mondat.'),
    ).toHaveLength(2);
    expect(excerpt('A Fiumei úti Sírkertben 2016. szeptemberétől lehet. Más.', 20)).toBe(
      'A Fiumei úti Sírkertben 2016. szeptemberétől lehet.',
    );
    expect(sentences('A IX. kerületben, kb. 50 méterre. Igen.')).toEqual([
      'A IX. kerületben, kb. 50 méterre.',
      'Igen.',
    ]);
  });
  it('minden cikk kivonata teljes mondat, nem csonka', () => {
    for (const a of articles) {
      const e = a.excerpt ?? excerpt(a.lead);
      expect(e, a.slug).toMatch(/[.!?…”)]$/);
      expect(e, a.slug).not.toMatch(/(^|\s)\d{1,4}\.$/);
      expect(e.length, a.slug).toBeGreaterThan(25);
    }
  });
});
