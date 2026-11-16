/*
  Tracking for /lp/* pages.
  - Captures utm_* (and gclid/fbclid) from the landing URL into sessionStorage, then fills any
    <input data-utm="utm_source"> etc. inside forms.
  - track(name, params) pushes to window.dataLayer and calls gtag() when GA4 is loaded.
  GA4, Microsoft Clarity and the Meta pixel are NOT loaded yet: no IDs exist. When Tyler creates them,
  add the snippets in LandingLayout.astro (behind consent if ads target the EU; the Twin Cities focus makes that unlikely).
  Event names (PLAN.md): call_click, book_call, calculator_used, demo_complete, plus faq_open.
*/

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'] as const;
const STORE = 'acc_utm';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function captureUtm(): Record<string, string> {
  let saved: Record<string, string> = {};
  try {
    saved = JSON.parse(sessionStorage.getItem(STORE) || '{}');
  } catch {
    saved = {};
  }
  const params = new URLSearchParams(location.search);
  let changed = false;
  for (const k of KEYS) {
    const v = params.get(k);
    if (v) {
      saved[k] = v.slice(0, 200);
      changed = true;
    }
  }
  if (!saved.landing_page) {
    saved.landing_page = location.pathname;
    changed = true;
  }
  if (changed) {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(saved));
    } catch {
      /* private mode: keep in memory only */
    }
  }
  return saved;
}

export function fillUtmFields(root: ParentNode = document): void {
  const utm = captureUtm();
  root.querySelectorAll<HTMLInputElement>('input[data-utm]').forEach((el) => {
    const key = el.dataset.utm as string;
    if (utm[key]) el.value = utm[key];
  });
}

export function track(name: string, params: Record<string, unknown> = {}): void {
  const payload = { event: name, page: location.pathname, ...captureUtm(), ...params };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
  if (import.meta.env.DEV) console.info('[track]', name, payload);
}

/* Delegated listeners: any element with data-track="event_name" fires on click. */
export function bindTracking(): void {
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    track(el.dataset.track as string, { label: el.dataset.trackLabel || el.textContent?.trim().slice(0, 60) });
  });
  document.addEventListener(
    'toggle',
    (e) => {
      const d = e.target as HTMLDetailsElement;
      if (d instanceof HTMLDetailsElement && d.open && d.dataset.faq) track('faq_open', { question: d.dataset.faq });
    },
    true,
  );
}
