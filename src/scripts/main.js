// Page behaviour, no dependencies: menu, mobile action bar, before/after sliders,
// campaign attribution capture and the 3-step lead form (POST /api/lead -> Worker -> Profilo CRM).
import { track } from './consent.js';
import { u } from '../lib/url';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const PREVIEW = import.meta.env.PUBLIC_PREVIEW === '1';

/* menu */
const menuBtn = $('[data-menu]');
const menu = $('#menu');
menuBtn?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

/* "Sopralluogo" links go to the first form on the page */
const firstForm = $('[data-lead-form]');
if (firstForm && !$('#prenota')) firstForm.id = firstForm.id || 'prenota';
// pages without a form (grazie, privacy, cookie, 404): send those links to the home page form
if (!firstForm) $$('a[href="#prenota"]').forEach((a) => { a.href = u('/#prenota'); });
$$('a[href="#prenota"]').forEach((a) => a.addEventListener('click', (e) => {
  if (!firstForm) return;
  e.preventDefault();
  firstForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => $('input:not([type=hidden]):not([tabindex="-1"])', firstForm)?.focus({ preventScroll: true }), 450);
}));

/* hide the mobile bar while a form is on screen */
const bar = $('.mbar');
if (bar && 'IntersectionObserver' in window) {
  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
    bar.classList.toggle('is-hidden', seen.size > 0);
  }, { threshold: 0.25 });
  $$('[data-lead-form]').forEach((f) => io.observe(f));
}

/* before / after */
$$('[data-ba]').forEach((box) => {
  const r = $('.ba__range', box);
  const set = () => box.style.setProperty('--pos', `${r.value}%`);
  r.addEventListener('input', set);
  set();
});

/* phone and WhatsApp taps count as contacts (no-op unless consent was given) */
$$('a[href^="tel:"], a[href*="wa.me"]').forEach((a) => a.addEventListener('click', () => track('contact')));

/* campaign attribution: first-touch ad parameters kept for the session and sent with the lead */
const ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'campaign_id', 'adset_id', 'ad_id'];
const ATTR_STORE = 'venere-attr';
(() => {
  const q = new URLSearchParams(location.search);
  const found = Object.fromEntries(ATTR_KEYS.filter((k) => q.get(k)).map((k) => [k, q.get(k).slice(0, 150)]));
  try {
    if (Object.keys(found).length || !sessionStorage.getItem(ATTR_STORE)) {
      sessionStorage.setItem(ATTR_STORE, JSON.stringify({ ...found, landing_page: location.pathname, referrer: document.referrer.slice(0, 200) }));
    }
  } catch { /* storage blocked */ }
})();
const attribution = () => {
  let a = {};
  try { a = JSON.parse(sessionStorage.getItem(ATTR_STORE) || '{}'); } catch { /* ignore */ }
  const ck = (n) => (document.cookie.match(new RegExp(`(?:^|; )${n}=([^;]*)`)) || [])[1] || '';
  if (ck('_fbp')) a.fbp = ck('_fbp');
  if (ck('_fbc')) a.fbc = ck('_fbc');
  return a;
};

/* lead form */
const phoneOk = (v) => /^\+?[\d\s().\/-]+$/.test(v) && v.replace(/\D/g, '').length >= 6 && v.replace(/\D/g, '').length <= 15;
const emailOk = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

$$('[data-lead-form]').forEach((form) => {
  const f = form.elements;
  const steps = $$('[data-step]', form);
  const bars = $$('.lf__progress li', form);
  const label = $('[data-step-label]', form);
  const labels = label.dataset.labels.split('|');
  const msg = $('[data-msg]', form);
  const out = $('[data-out]', form);
  const caps = form.dataset.caps.split(',');
  let step = 1;
  let outOfArea = false;

  const say = (text, kind) => {
    msg.hidden = !text;
    msg.className = `lf__msg${kind ? ` is-${kind}` : ''}`;
    msg.textContent = '';
    if (text) setTimeout(() => { msg.textContent = text; }, 30);
  };
  const go = (n) => {
    step = n;
    steps.forEach((s) => { s.hidden = Number(s.dataset.step) !== n; });
    bars.forEach((b, i) => b.classList.toggle('is-on', i < n));
    label.textContent = `Passo ${n} di 3: ${labels[n - 1]}`;
    say('');
    const first = $(`[data-step="${n}"] input:not([type=hidden])`, form);
    first?.focus({ preventScroll: true });
    if (form.getBoundingClientRect().top < 0) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const bad = (el, text) => { el?.setAttribute('aria-invalid', 'true'); el?.focus(); say(text, 'err'); return false; };

  const check = (n) => {
    $$('[aria-invalid]', form).forEach((el) => el.removeAttribute('aria-invalid'));
    if (n === 1) {
      const cap = f.cap.value.trim();
      if (!cap) return bad(f.cap, 'Scrivi il CAP della casa dove vuoi fare il lavoro.');
      if (!/^\d{5}$/.test(cap)) return bad(f.cap, 'Il CAP ha 5 cifre, ricontrollalo.');
      outOfArea = !caps.some((p) => cap.startsWith(p));
      return true;
    }
    if (n === 2) {
      if (!f.intervento.value || !f.tempi.value) { say('Scegli una risposta per ogni domanda.', 'err'); return false; }
      return true;
    }
    if (!f.name.value.trim()) return bad(f.name, 'Scrivi il tuo nome.');
    if (!f.phone.value.trim()) return bad(f.phone, 'Scrivi il tuo numero di telefono.');
    if (!phoneOk(f.phone.value.trim())) return bad(f.phone, 'Il numero non sembra giusto, controlla le cifre.');
    if (!emailOk(f.email.value.trim())) return bad(f.email, "L'indirizzo email non sembra giusto.");
    if (!f.privacy_consent.checked) return bad(f.privacy_consent, "Per andare avanti devi accettare l'informativa sulla privacy.");
    return true;
  };

  f.cap.addEventListener('input', () => {
    f.cap.value = f.cap.value.replace(/\D/g, '').slice(0, 5);
    if (out) out.hidden = true;
  });
  // one-tap answers: when both questions are answered, move on by itself
  $$('[data-step="2"] input[type=radio]', form).forEach((r) => r.addEventListener('change', () => {
    if (f.intervento.value && f.tempi.value) setTimeout(() => step === 2 && go(3), 250);
  }));

  $$('[data-next]', form).forEach((b) => b.addEventListener('click', () => {
    if (!check(step)) return;
    if (step === 1 && outOfArea && out.hidden) { out.hidden = false; return; } // show the notice once, next click goes on
    go(step + 1);
    if (step === 2) track('form_start');
  }));
  $$('[data-prev]', form).forEach((b) => b.addEventListener('click', () => go(step - 1)));
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && step < 3 && e.target.tagName === 'INPUT') { e.preventDefault(); $(`[data-step="${step}"] [data-next]`, form)?.click(); }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (step !== 3 || !check(3) || form.classList.contains('is-busy')) return;
    const submit = $('[data-submit]', form);
    const payload = {
      name: f.name.value.trim(),
      phone: f.phone.value.trim(),
      email: f.email.value.trim(),
      cap: f.cap.value.trim(),
      fuori_zona: outOfArea ? 'si' : 'no',
      intervento: f.intervento.value,
      tempi: f.tempi.value,
      privacy_consent: true,
      marketing_consent: f.marketing_consent.checked,
      hp_url: f.hp_url.value,
      pagina: location.pathname,
      ...attribution(),
    };
    form.classList.add('is-busy');
    submit.disabled = true;
    try {
      if (PREVIEW) {
        // Preview: nothing is sent; show the thank-you page so the client sees the whole flow.
        location.href = `${form.dataset.thanks}?cap=${encodeURIComponent(payload.cap)}&anteprima=1`;
        return;
      }
      const res = await fetch(u('/api/lead'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(String(res.status));
      track('lead');
      location.href = `${form.dataset.thanks}?cap=${encodeURIComponent(payload.cap)}`;
    } catch {
      say('Non siamo riusciti a inviare la richiesta. Riprova tra poco oppure chiamaci.', 'err');
    } finally {
      form.classList.remove('is-busy');
      submit.disabled = false;
    }
  });
});
