import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { central, offices } from '@/content/data/contact';
import { telHref } from '@/lib/format';

const all = [
  central.info.phone,
  central.transport.phone,
  central.office.phone,
  ...offices.flatMap((o) => [o.landline, o.mobile]),
];

describe('telefonszámok', () => {
  it('a hívott szám megegyezik a megjelenítettel', () => {
    for (const p of all) {
      expect(p.e164).toBe(`+${p.display.replace(/\D/g, '')}`);
      expect(telHref(p.e164)).toBe(`tel:${p.e164}`);
    }
  });
  it('a jóváhagyott számok szerepelnek', () => {
    const displays = all.map((p) => p.display);
    for (const n of [
      '+36 30 847 1915',
      '+36 30 849 3538',
      '+36 1 919 0170',
      '+36 1 919 0886',
      '+36 30 203 2300',
      '+36 1 919 0172',
      '+36 30 965 1783',
      '+36 1 919 0171',
      '+36 30 313 7920',
      '+36 1 919 0173',
      '+36 30 576 7206',
    ]) {
      expect(displays).toContain(n);
    }
  });
  it('a forráskódban nincs forrás nélküli 0–24 órás ügyfélszolgálati ígéret', () => {
    const files: string[] = [];
    const walk = (d: string) => {
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(ts|astro)$/.test(f)) files.push(p);
      }
    };
    walk('src/content/data');
    walk('src/content/articles');
    walk('src/components');
    for (const f of files) {
      expect(readFileSync(f, 'utf8'), f).not.toMatch(/0\s*[-–]\s*24|éjjel-nappal|non-?stop/i);
    }
  });
});
