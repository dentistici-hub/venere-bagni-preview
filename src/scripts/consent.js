// Cookie consent + consent-gated tracking.
// Nothing from Google or Meta is requested before the visitor opts in, and nothing at all is
// requested when the IDs in src/data/site.ts are empty. The choice is kept 180 days, then asked again.
const cfg = document.getElementById('consent-config');
const GA = cfg?.dataset.ga4 || '';
const PX = cfg?.dataset.pixel || '';
const KEY = 'venere-consent';
const VERSION = 1;
const TTL = 180 * 864e5;

let mem = null; // fallback when storage is blocked (private mode)
const fresh = (v) => v && v.v === VERSION && Date.now() - v.t < TTL;
const read = () => {
  try { const v = JSON.parse(localStorage.getItem(KEY)); if (fresh(v)) return v; } catch { /* blocked or corrupt */ }
  return fresh(mem) ? mem : null;
};
const write = (a, m) => {
  mem = { v: VERSION, a, m, t: Date.now() };
  try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch { /* keep in memory only */ }
};

const loaded = { ga: false, px: false };

function loadGA() {
  if (!GA || loaded.ga) return;
  loaded.ga = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA, { anonymize_ip: true });
}

function loadPixel() {
  if (!PX || loaded.px) return;
  loaded.px = true;
  (function (f, b, e, v) {
    if (f.fbq) return;
    const n = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    const t = b.createElement(e); t.async = true; t.src = v;
    b.head.appendChild(t);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', PX);
  window.fbq('track', 'PageView');
}

function apply(c) {
  if (c?.a) loadGA();
  if (c?.m) loadPixel();
}

function clearCookies() {
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).forEach((name) => {
    if (/^(_ga|_gid|_gat|_fbp|_fbc)/.test(name)) {
      const host = location.hostname.split('.').slice(-2).join('.');
      [location.hostname, `.${host}`].forEach((d) => { document.cookie = `${name}=; Max-Age=0; path=/; domain=${d}`; });
      document.cookie = `${name}=; Max-Age=0; path=/`;
    }
  });
}

/* Conversion events. A no-op unless the matching tracker was loaded after consent. */
export function track(name) {
  if (name === 'lead') {
    window.gtag?.('event', 'generate_lead');
    window.fbq?.('track', 'Lead');
  } else if (name === 'contact') {
    window.gtag?.('event', 'contact');
    window.fbq?.('track', 'Contact');
  }
}

/* ---------- banner ---------- */
const banner = document.querySelector('[data-consent]');
if (banner) {
  const $ = (s) => banner.querySelector(s);
  const main = $('[data-consent-main]');
  const prefs = $('[data-consent-prefs]');
  const boxA = $('[name="consent-analytics"]');
  const boxM = $('[name="consent-marketing"]');

  const show = (panel, focus = false) => {
    banner.hidden = false;
    main.hidden = panel !== 'main';
    prefs.hidden = panel !== 'prefs';
    if (focus) (panel === 'main' ? $('[data-consent-accept]') : $('[data-consent-save]')).focus({ preventScroll: true });
  };
  const hide = () => {
    banner.hidden = true;
    (document.querySelector('[data-consent-open]') || document.body).focus?.({ preventScroll: true });
  };

  const save = (a, m) => {
    const prev = read();
    write(a, m);
    hide();
    if ((prev?.a && !a) || (prev?.m && !m)) { clearCookies(); location.reload(); return; }
    apply({ a, m });
  };

  $('[data-consent-accept]').addEventListener('click', () => save(true, true));
  $('[data-consent-reject]').addEventListener('click', () => save(false, false));
  $('[data-consent-customize]').addEventListener('click', () => show('prefs', true));
  $('[data-consent-back]').addEventListener('click', () => show('main', true));
  $('[data-consent-save]').addEventListener('click', () => save(!!boxA?.checked, !!boxM?.checked));

  document.querySelectorAll('[data-consent-open]').forEach((el) => el.addEventListener('click', () => {
    const c = read();
    if (boxA) boxA.checked = !!c?.a;
    if (boxM) boxM.checked = !!c?.m;
    show('prefs', true);
  }));

  const saved = read();
  if (saved) apply(saved); else show('main');
} else {
  apply(read());
}
