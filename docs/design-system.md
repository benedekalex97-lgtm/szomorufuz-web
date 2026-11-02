# Dizájnrendszer

Forrás: `src/styles/tokens.css` (tokenek), `src/styles/global.css` (alapok), `src/components/ui/` (komponensek). Élő referencia: **`/stilus/`** oldal.

Szabály: komponens csak **szemantikus** tokent használ (`--color-text`, `--space-4`), nyers palettát (`--palette-*`) nem.

## Színek és kontraszt (WCAG 2.2 AA)

| Token                               | Hex     | Porcelain hátteren       | Használat                                         |
| ----------------------------------- | ------- | ------------------------ | ------------------------------------------------- |
| Porcelain `--color-bg`              | #F7F5F0 | –                        | Elsődleges háttér                                 |
| Warm Ivory `--color-bg-alt`         | #EAE5DA | –                        | Másodlagos háttér                                 |
| Deep Charcoal `--color-text`        | #292825 | **13,53:1**              | Szöveg, elsődleges gomb                           |
| Muted Bronze `--color-accent-decor` | #89745D | 4,08:1 ⚠️                | **Csak** díszítés, ikon, nagy elem (≥ 3:1)        |
| Bronze 700 `--color-accent-text`    | #6E5B47 | **5,93:1** (ivoryn 5,14) | Hangsúlyos szöveg, link, fókuszgyűrű              |
| Bronze 800 `--color-link-hover`     | #5F4E3C | 7,30:1                   | Link hover                                        |
| Graphite 600 `--color-text-muted`   | #5C5952 | **6,41:1** (ivoryn 5,56) | Másodlagos szöveg                                 |
| Stone Taupe `--color-border-subtle` | #B8AA98 | 2,09:1                   | **Csak** dekoratív vonal (nem hordoz információt) |
| Stone 600 `--color-border-strong`   | #8A7F72 | 3,60:1                   | Űrlapmező-keret (UI-elem ≥ 3:1)                   |

Az eredeti Muted Bronze és Stone Taupe kis szövegre nem elég kontrasztos, ezért kerültek be a sötétebb árnyalatok. Sötét láblécen a szöveg #F7F5F0 / #D6D1C7 a #292825 hátteren (≥ 10:1).

## Tipográfia

- Címsor: **Newsreader** (változtatható, 400-as vastagság), törzsszöveg: **Inter**.
- Folyékony skála (`clamp`, 320 → 1440 px): `--text-sm` 15 px · `--text-base` 17–18 px · `--text-lg` 19–21 · `--text-xl` 22–26 · `--text-2xl` 26–34 · `--text-3xl` 32–48 · `--text-4xl` 38–60 px. `--text-xs` (13 px) csak nagybetűs címkékhez.
- Sormagasság: szöveg 1,6; címsor 1,15–1,3. Sorhossz: `--measure` 66ch.
- Legkisebb megjelenő betű: 12 px (logó alcíme) – automatikusan ellenőrizve.

## Térköz, konténer, töréspont

- 4 px alapú skála: `--space-1` (4) … `--space-24` (96). Szekciók közt `--section-space` (48–96 px).
- Konténerek: narrow 736 · default 1152 · wide 1312 px; oldalsó margó `--gutter` 16–32 px.
- Töréspontok (mobil-first, `min-width`): 40em (640) · 48em (768) · 64em (1024) · 75em (1200 – asztali menü) · 80em (1280).

## Komponensek

| Komponens                        | Változatok / megjegyzés                                                                                                                                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                         | `primary` · `secondary` · `ghost` · `inverse`; `md` / `lg`; ikon elöl/hátul; `<a>` vagy `<button>`. Min. 48 px magas. Állapotok: hover, `:focus-visible`, active, disabled / `aria-disabled`. |
| `Card`                           | Teljes felületen kattintható (a cím linkjének `::after` rétege), egy értelmes link a képernyőolvasónak; fókusz a kártyán látszik.                                                             |
| `Section`                        | `id` + `aria-labelledby`; tónus: default / alt / surface; szélesség.                                                                                                                          |
| `Accordion`                      | Natív `<details>/<summary>`, JS nélkül.                                                                                                                                                       |
| `TextField`                      | Címke, „(kötelező)”/„(nem kötelező)”, súgó, hibaüzenet `aria-describedby`-jal, disabled állapot. Csak a jövőbeli, jóváhagyott űrlapokhoz.                                                     |
| `Icon`                           | Lucide, 1,75 vonalvastagság, alapból `aria-hidden`; `label` esetén `role="img"`.                                                                                                              |
| `PhoneLink`                      | Ellenőrzött szám → `tel:` link; ellenőrizetlen → csak review módban, link nélkül.                                                                                                             |
| `PendingNotice` / `PendingBadge` | Hiányzó / ellenőrizetlen adat jelölése.                                                                                                                                                       |
| `Logo`                           | **Ideiglenes szöveges logó** („Szomorúfűz” + „Temetkezési szolgáltatások”). A végleges embléma külön jóváhagyási pont.                                                                        |
| `Header`                         | Rögzített fejléc; 1200 px alatt menügomb (disclosure-minta: `aria-expanded`, Escape bezár és visszaadja a fókuszt, kattintás kívül bezár). JS nélkül a menü listaként látszik.                |
| `MobileCallBar`                  | Alsó, rögzített hívássáv 768 px alatt – **csak ellenőrzött számmal** renderelődik; a `body` alsó paddingje miatt nem takar tartalmat.                                                         |

## Interakciós állapotok

- **Fókusz:** 3 px folytonos Bronze 700 körvonal, 3 px eltolással (sötét felületen Porcelain). Csak billentyűzetes fókusznál (`:focus-visible`).
- **Hover:** színváltás / finom árnyék; soha nem az egyetlen jelzés.
- **Disabled:** 55% átlátszóság + `not-allowed` kurzor.
- **Érintési célpont:** interaktív elemek min. 48 px (WCAG 2.2 2.5.8 minimum 24 px).

## Mozgás

- Csak rövid (120–200 ms) szín- és árnyékátmenetek. Nincs parallax, slider, automatikus animáció.
- `prefers-reduced-motion: reduce` esetén az átmenetek és a sima görgetés kikapcsolnak.

## Képek

Az 1. fázisban nincs fotó (döntés: a meglévő képek elavultak / jogilag tisztázatlanok). A hero díszítése absztrakt, vékony vonalas SVG (`aria-hidden`), nem logó és nem fotó.
