// Lead proxy for the Venere Bagni site (Cloudflare Worker, used once the site is on its own domain).
// Static assets are served by Cloudflare; only /api/lead reaches this code (run_worker_first in wrangler.jsonc).
//
// POST /api/lead  {name, phone, email?, cap, intervento, stile, tempi, frenato, privacy_consent, marketing_consent, hp_url, utm_*, gclid, fbclid, ...}
//   -> validates, then forwards to the Profilo CRM ingest endpoint (/api/leads/ingest/<token>).
//
// CRM CONNECTION: PLACEHOLDER until launch.
//   1. Create the site webhook token for the "italprogetti" tenant in the CRM (/admin/integrazioni).
//   2. wrangler secret put CRM_INGEST_TOKEN   (never in this file, never in git)
//   Until then the endpoint answers 503 and the form shows its error message.

const CRM_ORIGIN_DEFAULT = 'https://crm.profilomarketing.it';
// env.CRM_ORIGIN is honoured only for a local test server, never for another host.
const crmOrigin = (env) => (/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/.test(env.CRM_ORIGIN || '') ? env.CRM_ORIGIN : CRM_ORIGIN_DEFAULT);
const MAX_BODY = 8 * 1024;
const TEXT = { name: 120, phone: 40, email: 200, cap: 5, intervento: 60, stile: 60, tempi: 60, frenato: 200, pagina: 200, landing_page: 200, referrer: 200, fuori_zona: 2 };
const ATTR = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'campaign_id', 'adset_id', 'ad_id', 'fbp', 'fbc'];

const json = (status, body, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...extra },
  });
const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max) : '');

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/lead') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return json(405, { ok: false }, { allow: 'POST' });

    let originHost = '';
    try { originHost = new URL(request.headers.get('origin') || request.headers.get('referer') || '').host; } catch { /* missing */ }
    if (originHost !== url.host) return json(403, { ok: false });

    const raw = await request.text().catch(() => '');
    if (!raw || raw.length > MAX_BODY) return json(413, { ok: false });
    let body;
    try { body = JSON.parse(raw); } catch { return json(400, { ok: false }); }
    if (!body || typeof body !== 'object') return json(400, { ok: false });
    if (clean(body.hp_url, 200)) return json(200, { ok: true }); // honeypot

    const lead = {};
    for (const [k, max] of Object.entries(TEXT)) lead[k] = clean(body[k], max);
    for (const k of ATTR) lead[k] = clean(body[k], 200);
    const digits = lead.phone.replace(/\D/g, '');
    if (!lead.name || digits.length < 6 || digits.length > 15) return json(422, { ok: false, error: 'required' });
    if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return json(422, { ok: false, error: 'email' });
    if (!/^\d{5}$/.test(lead.cap)) return json(422, { ok: false, error: 'cap' });
    if (body.privacy_consent !== true) return json(422, { ok: false, error: 'consent' });

    if (!env.CRM_INGEST_TOKEN) return json(503, { ok: false, error: 'crm-not-connected' });

    const payload = { ...lead, privacy_consent: true, marketing_consent: body.marketing_consent === true ? 'si' : 'no', sito: env.SITO || 'venere-bagni' };
    for (const k of Object.keys(payload)) if (payload[k] === '') delete payload[k];

    let res;
    try {
      res = await fetch(`${crmOrigin(env)}/api/leads/ingest/${encodeURIComponent(env.CRM_INGEST_TOKEN)}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-forwarded-for': request.headers.get('cf-connecting-ip') || '' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      return json(502, { ok: false });
    }
    if (!res.ok) return json(res.status === 429 ? 503 : 502, { ok: false });
    return json(200, { ok: true });
  },
};
