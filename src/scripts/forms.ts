/**
 * Űrlapok progresszív bővítése (audit SZF-002/003).
 * A szerver ugyanazt a validate() függvényt futtatja – ez csak a gyors visszajelzésért van.
 */
import { type FormId, forms, serviceById } from '@/forms/definitions';
import { NOTICE_ERROR } from '@/forms/messages';
import { META } from '@/forms/security';
import { type Errors, validate } from '@/forms/validate';

type Input = Record<string, string | string[]>;

function newKey(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

function collect(form: HTMLFormElement): Input {
  const out: Input = {};
  for (const [k, v] of new FormData(form)) {
    if (typeof v !== 'string') continue;
    const prev = out[k];
    if (prev === undefined) out[k] = v;
    else out[k] = Array.isArray(prev) ? [...prev, v] : [prev, v];
  }
  return out;
}

function fieldControl(form: HTMLFormElement, name: string): HTMLElement | null {
  return form.querySelector<HTMLElement>(`[name="${CSS.escape(name)}"]:not([type="hidden"])`);
}

/**
 * @param full  true: beküldéskor – az összesítő is újraépül és fókuszt kap.
 *              false: kitöltés közben – csak a mezőszintű hibák frissülnek.
 */
function updateField(wrap: HTMLElement, msg: string | undefined): void {
  const err = wrap.querySelector<HTMLElement>('[data-field-error]');
  if (err) {
    err.textContent = msg ?? '';
    err.hidden = !msg;
  }
  if (wrap.tagName === 'FIELDSET') {
    if (msg) wrap.setAttribute('data-invalid', '');
    else wrap.removeAttribute('data-invalid');
  }
  wrap.querySelectorAll<HTMLElement>('input, select, textarea').forEach((c) => {
    if (msg) c.setAttribute('aria-invalid', 'true');
    else c.removeAttribute('aria-invalid');
  });
}

function showErrors(form: HTMLFormElement, errors: Errors, full: boolean): void {
  const summary = form.querySelector<HTMLElement>('[data-form-summary]');
  const list = form.querySelector<HTMLElement>('[data-form-summary-list]');
  form.querySelectorAll<HTMLElement>('[data-field]').forEach((wrap) => {
    updateField(wrap, errors[wrap.dataset['field'] ?? '']);
  });

  if (!summary || !list) return;
  if (!full) {
    // Kijavított hibák esetén az összesítő eltűnik, de kitöltés közben nem épül újra.
    if (Object.keys(errors).length === 0) summary.hidden = true;
    return;
  }
  list.replaceChildren();
  const names = Object.keys(errors);
  for (const name of names) {
    const control = fieldControl(form, name);
    const wrap = form.querySelector<HTMLElement>(`[data-field="${CSS.escape(name)}"]`);
    const label = wrap?.querySelector('legend, label')?.firstChild?.textContent?.trim() ?? 'Mező';
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = control?.id ? `#${control.id}` : '#';
    a.textContent = `${label}: ${errors[name] ?? ''}`;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      control?.focus();
    });
    li.append(a);
    list.append(li);
  }
  summary.hidden = names.length === 0;
  if (names.length) summary.focus();
}

function clientErrors(form: HTMLFormElement, id: FormId): Errors {
  const input = collect(form);
  const { errors } = validate(forms[id], input);
  if (input[META.notice] !== 'igen') errors[META.notice] = NOTICE_ERROR;
  return errors;
}

function setBusy(form: HTMLFormElement, busy: boolean): void {
  const btn = form.querySelector<HTMLButtonElement>('[data-form-submit]');
  const label = form.querySelector<HTMLElement>('[data-form-submit-label]');
  if (!btn || !label) return;
  if (busy) {
    btn.dataset['label'] = label.textContent ?? '';
    label.textContent = 'Küldés folyamatban…';
    btn.setAttribute('aria-busy', 'true');
    btn.disabled = true;
  } else {
    label.textContent = btn.dataset['label'] ?? label.textContent;
    btn.removeAttribute('aria-busy');
    btn.disabled = false;
  }
}

function enhance(form: HTMLFormElement): void {
  if (form.dataset['enhanced']) return;
  form.dataset['enhanced'] = 'true';
  const id = form.dataset['form'] as FormId;
  const wrap = form.closest<HTMLElement>('.form-wrap');
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const set = (sel: string, v: string) => {
    const el = form.querySelector<HTMLInputElement>(sel);
    if (el) el.value = v;
  };
  set('[data-form-page]', location.pathname);
  set('[data-form-key]', newKey());
  set('[data-form-started]', String(Date.now()));

  let attempted = false;
  let inFlight = false;

  // Beküldési kísérlet után kitöltés közben a hiba csak ELTŰNHET (amint a mező helyes),
  // új hiba csak beküldéskor jelenik meg – így kattintás közben nem mozdul el az oldal.
  const refresh = (event: Event) => {
    if (!attempted) return;
    const wrap = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-field]');
    const name = wrap?.dataset['field'];
    if (!wrap || !name) return;
    const errors = clientErrors(form, id);
    if (!errors[name]) updateField(wrap, undefined);
    if (Object.keys(errors).length === 0) showErrors(form, errors, false);
  };
  form.addEventListener('input', refresh);
  form.addEventListener('change', refresh);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (inFlight) return; // dupla beküldés elleni védelem
    attempted = true;
    if (status) status.textContent = '';
    const errors = clientErrors(form, id);
    showErrors(form, errors, true);
    if (Object.keys(errors).length) return;

    inFlight = true;
    setBusy(form, true);
    try {
      const body = new URLSearchParams();
      for (const [k, v] of new FormData(form)) if (typeof v === 'string') body.append(k, v);
      const res = await fetch(form.action, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
        credentials: 'same-origin',
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: Errors;
      };
      if (res.ok && data.ok) {
        // Siker CSAK a szerver visszaigazolása után.
        const success = wrap?.querySelector<HTMLElement>('[data-form-success]');
        const text = wrap?.querySelector<HTMLElement>('[data-form-success-text]');
        if (success && text) {
          text.textContent = data.message ?? '';
          form.hidden = true;
          success.hidden = false;
          success.focus();
        }
        form.reset();
        set('[data-form-key]', newKey());
        return;
      }
      if (res.status === 422 && data.errors) {
        showErrors(form, data.errors, true);
      } else if (status) {
        status.textContent =
          data.message ??
          'Az üzenetet most nem tudtuk elküldeni. Kérjük, próbálja újra, vagy hívjon minket: +36 30 847 1915.';
      }
    } catch {
      if (status)
        status.textContent =
          'Nem sikerült kapcsolódni a szerverhez. Adatait megőriztük – kérjük, próbálja újra, vagy hívjon minket: +36 30 847 1915.';
    } finally {
      inFlight = false;
      setBusy(form, false);
    }
  });
}

/** Árajánlat-oldal: a ?szolgaltatas= paraméter szerinti űrlapváltozat megjelenítése. */
function applyServiceParam(): void {
  const variants = document.querySelectorAll<HTMLElement>('[data-form-variant]');
  if (variants.length < 2) return;
  const params = new URLSearchParams(location.search);
  const service = serviceById(params.get('szolgaltatas'));
  if (!service) return;
  const target = [...variants].find((v) => v.dataset['formVariant'] === service.form);
  if (!target) return;
  variants.forEach((v) => (v.hidden = v !== target));
  const hiddenService = target.querySelector<HTMLInputElement>('[data-form-service]');
  if (hiddenService) hiddenService.value = service.id;
  const title = target.querySelector<HTMLElement>('.form-wrap__title');
  if (title) title.textContent = `Árajánlatkérés – ${service.label}`;
  for (const [name, value] of Object.entries(service.prefill ?? {})) {
    target
      .querySelectorAll<HTMLInputElement>(`input[name="${CSS.escape(name)}"]`)
      .forEach((input) => {
        if (input.value === value) input.checked = true;
      });
  }
  const switcher = document.querySelector<HTMLElement>('[data-form-switch]');
  if (switcher) switcher.hidden = false;

  const code = params.get('termek');
  if (code && /^\d{7}$/.test(code)) {
    const select = target.querySelector<HTMLSelectElement>('select[name="termek"]');
    const opt = select && [...select.options].find((o) => o.value.endsWith(code));
    if (select && opt) select.value = opt.value;
  }
  if (location.hash === '#urlap') target.scrollIntoView();
}

export function initForms(): void {
  applyServiceParam();
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach(enhance);
}
