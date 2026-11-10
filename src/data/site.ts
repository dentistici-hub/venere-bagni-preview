// ONE PLACE TO EDIT: every business, contact and SEO value of the site lives in this file.
// Rules:
//   - A value in [SQUARE BRACKETS] is a placeholder: on the page it shows as a yellow mark, and every
//     piece of structured data (JSON-LD), meta tag and llms.txt line that would use it is left out.
//   - An empty string '' (or null / empty list) switches the related markup off entirely.
//   - Never put an invented value here: leave the placeholder until the client gives the real one.
// The launch checklist (SEO-GEO-LAUNCH.md in the project root) lists every field and where it shows up.
import { SITE_UPDATED } from './dates.mjs';

// Weekday codes for openingHours (schema.org DayOfWeek names are built from these).
type Day = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';
export interface Hours { days: Day[]; opens: string; closes: string } // opens/closes as 'HH:MM'

// ---- OPENING HOURS --------------------------------------------------------------------------------
// Structured hours. Shows up in: schema openingHoursSpecification, the "Orari" text in topbar, footer,
// contatti, grazie, llms.txt. Empty list = "[ORARI]" placeholder on the page and no schema hours.
// Example (do not use until confirmed): [{ days: ['Mo','Tu','We','Th','Fr'], opens: '08:30', closes: '18:30' }]
// Morning/afternoon split = two entries with the same days.
const openingHours: Hours[] = [];

const dayIt: Record<Day, string> = { Mo: 'lun', Tu: 'mar', We: 'mer', Th: 'gio', Fr: 'ven', Sa: 'sab', Su: 'dom' };
const dayRange = (d: Day[]) => (d.length > 1 ? `${dayIt[d[0]]}-${dayIt[d[d.length - 1]]}` : dayIt[d[0]]);
// "lun-ven 08:30-12:30 e 14:00-18:30, sab 09:00-12:00": entries with the same days are grouped.
const hoursText = (list: Hours[]) => {
  const groups = new Map<string, string[]>();
  list.forEach((h) => { const k = dayRange(h.days); groups.set(k, [...(groups.get(k) ?? []), `${h.opens}-${h.closes}`]); });
  return [...groups].map(([d, t]) => `${d} ${t.join(' e ')}`).join(', ');
};

export const site = {
  // ---- INDEXING ------------------------------------------------------------------------------------
  // false until launch: every page gets "noindex, nofollow". The preview build (PUBLIC_PREVIEW=1) is
  // always noindex whatever this says. Set to true only on the production domain at launch.
  indexable: false,
  // Production domain, no trailing slash. Shows up in: canonical, og:url, JSON-LD @id/url, robots.txt
  // sitemap line, llms.txt links, IndexNow. Also set it in astro.config.mjs (`site`) for the sitemap.
  // The preview build overrides it with PUBLIC_SITE_URL. CONFIRM: final domain (venerebagni.it looked free on 2026-11-09).
  url: (import.meta.env.PUBLIC_SITE_URL as string | undefined) || 'https://www.venerebagni.it',
  lang: 'it',
  // Date of the last content change (YYYY-MM-DD), from src/data/dates.mjs: schema dateModified and sitemap lastmod.
  updated: SITE_UPDATED,

  // ---- IDENTITY ------------------------------------------------------------------------------------
  brand: 'Venere Bagni', // trading name: logo, titles, schema `name`, OG site_name
  legalName: 'Pfggroup srl', // given by the client 2026-11-10; trades as the brand Venere Bagni. Footer, privacy, chi-siamo, schema `legalName`
  vat: '[P.IVA]', // P.IVA, 11 digits: footer, contatti, chi-siamo, schema `vatID`
  rea: '[REA]', // REA number, e.g. 'TO-1234567': chi-siamo, footer, schema `identifier`
  foundingYear: '', // 'YYYY': chi-siamo, schema `foundingDate`. Not given by the client (2026-11-10): leave empty. Years in business: 15.
  // Owner or manager shown on Chi siamo and used as schema `founder` and as guide author when set.
  founder: { name: '[NOME TITOLARE]', role: '[RUOLO, es. titolare]' },
  tagline: 'Dalla vasca alla doccia in 8 ore',
  // Default <title> and meta description (home page sets its own; these are the fallback).
  title: 'Trasformazione vasca in doccia a Torino e provincia | Venere Bagni',
  description:
    'Togliamo la vasca e montiamo una doccia sicura in 8 ore, chiavi in mano, a Torino e provincia. Sopralluogo gratuito e preventivo scritto a prezzo fisso.',

  // ---- AREA SERVED ---------------------------------------------------------------------------------
  // Client, 2026-11-10: Torino e provincia only (the other Piemonte provinces are not served).
  area: 'Torino e provincia',
  // CAP prefix of the Torino province (10010-10156), used by the form's area check.
  capPrefixes: ['10'],

  // ---- ADDRESS (NAP: must match Google Business Profile, Bing Places and every directory letter for letter)
  street: '[INDIRIZZO]', // 'Via Esempio 12': footer, contatti, chi-siamo, schema streetAddress
  postalCode: '[CAP]', // footer, contatti, schema postalCode
  locality: 'Torino', // CONFIRM: the company's registered or operating town. Schema addressLocality
  region: 'TO', // province code
  country: 'IT',
  // Coordinates of the sede (from Google Maps: right click > the first line). null = no schema `geo`.
  geo: { lat: null as number | null, lng: null as number | null },

  // ---- CONTACTS ------------------------------------------------------------------------------------
  phone: '[TELEFONO]', // as people read it, '011 123 4567': topbar, hero, footer, CTA, llms.txt
  phoneHref: '+390000000000', // CONFIRM: E.164, used in tel: links and schema `telephone`
  whatsapp: '390000000000', // CONFIRM: digits only, for wa.me links
  whatsappLabel: '[WHATSAPP]', // as people read it
  email: 'pfggroupitalia@gmail.com', // footer, contatti, schema `email`
  hours: hoursText(openingHours) || '[ORARI]', // derived from openingHours above: do not edit here
  openingHours,

  // ---- GOOGLE BUSINESS PROFILE AND PROFILES --------------------------------------------------------
  // Public Maps URL of the Google Business Profile (share link or https://maps.google.com/?cid=<CID>).
  // Shows up in: schema sameAs + hasMap, Chi siamo "leggi le recensioni" link, contatti. '' = hidden.
  gbpUrl: '',
  gbpPlaceId: '', // Place ID (ChIJ...): used for the review-request link https://search.google.com/local/writereview?placeid=<ID>
  gbpCid: '', // CID number: kept for reference / Maps links
  // Other profiles of the business (Facebook, Instagram, YouTube, ProntoPro, Edilnet, PagineGialle, Houzz, Instapro...).
  // Full URLs. Shows up in: schema sameAs, Chi siamo. Add only profiles that exist and show the same NAP.
  sameAs: [] as string[],
  // Google rating (from the Business Profile). Shows up in visible text when set; never in schema unless
  // ratingInSchema is true. Keep ratingInSchema FALSE: Google's review-snippet rules say a business may not
  // mark up reviews about itself on its own site ("self-serving"), and ratings copied from another site
  // (Google Maps) must not be aggregated into the page's markup. Doing it gets no stars and risks a manual action.
  rating: { value: null as number | null, count: null as number | null },
  ratingInSchema: false,

  // ---- PRICES --------------------------------------------------------------------------------------
  // Client, 2026-11-10: no price is published anywhere on the site (pages, schema, meta, llms files).
  // /prezzi/ explains what the cost depends on and what is always included; the figure is in the written quote.

  // ---- SEO / VERIFICATION / TRACKING ---------------------------------------------------------------
  // Search Console "HTML tag" method: only the content="..." value. '' = no tag.
  googleVerification: '',
  // Bing Webmaster Tools meta tag value (msvalidate.01). '' = no tag (not needed if Bing imports from Search Console).
  bingVerification: '',
  // IndexNow key (8-128 chars, a-z A-Z 0-9 -). When set, the build writes /<key>.txt and scripts/indexnow.mjs can ping.
  // Generate one at launch, e.g. `node -e "console.log(crypto.randomUUID().replace(/-/g,''))"`.
  indexNowKey: '',
  // Default social image (1200x630, in public/). Per-page images are public/og/<page>.jpg (scripts/make-og.py).
  ogImage: '/og-image.jpg',
  // Logo file for schema `logo` (square or wide PNG/SVG, at least 112x112 px, in public/). '' = no logo in schema.
  // The current mark in Logo.astro is a placeholder drawing: leave '' until the real logo exists.
  logo: '',
  // Tracking. Empty = nothing is loaded (consent banner only appears when one is set).
  ga4Id: '',
  metaPixelId: '',
  privacyUrl: '/privacy/',
};

// True when a value is real data (not empty, not a [PLACEHOLDER], not the 0000000 dummy number).
export const filled = (v: unknown): v is string => typeof v === 'string' && v.trim() !== '' && !/\[|0000000/.test(v);

export const nav = [
  { href: '/vasca-in-doccia/', label: 'Vasca in doccia' },
  { href: '/vasca-con-sportello/', label: 'Vasca con sportello' },
  { href: '/bagno-sicuro/', label: 'Bagno sicuro' },
  { href: '/prezzi/', label: 'Prezzi' },
  { href: '/bonus-detrazioni/', label: 'Bonus 2026' },
  { href: '/domande-frequenti/', label: 'Domande' },
];

// The area page (/zone/<slug>/). Only Torino e provincia since 2026-11-10.
export const zones = [
  { slug: 'torino', name: 'Torino', at: 'a Torino', label: 'Torino e provincia' },
];

// Google rating as shown in the page text ("4,9" / "37"), or the yellow placeholder until site.rating is set.
export const ratingValue = site.rating.value ? String(site.rating.value).replace('.', ',') : '[VOTO GOOGLE]';
export const ratingCount = site.rating.count ? String(site.rating.count) : '[N° RECENSIONI]';
