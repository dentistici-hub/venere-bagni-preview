# Venere Bagni: SEO and GEO launch checklist (internal, Profilo Marketing)

Built 2026-11-10. Everything the agency fills in lives in `src/data/site.ts` (plus prices, dates and content data files listed below). Empty or `[PLACEHOLDER]` values switch the related markup off; they never print fake data.

Rule of thumb before launch: `npm run build`, then search `dist/` for `[` inside visible text and JSON-LD. Yellow marks on the pages = still to fill.

## 1. Values to fill in `src/data/site.ts`

| Field | What it is | Where it shows up |
|---|---|---|
| `indexable` | `false` until launch | robots meta on every page (`noindex, nofollow` while false or in the preview build) |
| `url` | Production domain, no trailing slash (`https://www.venerebagni.it`?) | canonical, og:url, JSON-LD `@id`/`url`, robots.txt sitemap line, llms files, IndexNow. Also set `site` in `astro.config.mjs` (sitemap) |
| `brand`, `legalName` | Trading name / company name | titles, logo, footer, schema `name`/`legalName` |
| `vat` | P.IVA | footer, contatti, chi-siamo, privacy, schema `vatID`, llms-full |
| `rea` | REA number | footer, chi-siamo, schema `identifier` (PropertyValue REA) |
| `foundingYear` | `YYYY` | chi-siamo, schema `foundingDate`, llms-full |
| `founder.name`, `founder.role` | Owner/manager | chi-siamo, schema `founder`, guide author (Article `author` becomes a Person instead of the business) |
| `street`, `postalCode`, `locality`, `region`, `country` | Address (NAP) | footer, contatti, chi-siamo, privacy, schema `PostalAddress`, llms files |
| `geo.lat`, `geo.lng` | Coordinates of the sede | schema `geo` |
| `phone`, `phoneHref` | Phone as read / E.164 | topbar, hero, CTA, mobile bar, footer, schema `telephone` (only when both are real), llms files |
| `whatsapp`, `whatsappLabel` | wa.me digits / label | CTA, mobile bar, footer, grazie, llms files |
| `email` | Public email | footer, contatti, schema `email`, llms-full |
| `openingHours` | Structured hours, e.g. `[{ days: ['Mo','Tu','We','Th','Fr'], opens: '08:30', closes: '18:30' }]` | schema `openingHoursSpecification`; the visible "Orari" text (`site.hours`) is derived from it |
| `gbpUrl` | Public Google Maps URL of the Business Profile | schema `sameAs` + `hasMap`, chi-siamo "leggi le recensioni", llms files |
| `gbpPlaceId` | Place ID (`ChIJ...`) | chi-siamo "lascia una recensione" link (`search.google.com/local/writereview?placeid=`), review-request routine |
| `gbpCid` | CID | reference only |
| `sameAs` | Other real profiles (Facebook, Instagram, ProntoPro, Edilnet, PagineGialle, Houzz, Instapro...) | schema `sameAs`, chi-siamo "Ci trovi anche su" |
| `rating.value`, `rating.count` | Google rating and review count | visible text on home, offerta, zone Torino, chi-siamo (replaces `[VOTO GOOGLE]` / `[N° RECENSIONI]`) |
| `ratingInSchema` | Keep `false` | schema `aggregateRating`. Google's review-snippet rules forbid self-serving ratings for LocalBusiness/Organization and ratings copied from other sites. Turning it on gets no stars and risks a manual action |
| `googleVerification` | Search Console HTML-tag token (content value only) | `<meta name="google-site-verification">` (skip if verifying by DNS) |
| `bingVerification` | Bing `msvalidate.01` value | meta tag (skip if Bing imports from Search Console) |
| `indexNowKey` | 8-128 chars a-z A-Z 0-9 - | builds `/<key>.txt`; used by `scripts/indexnow.mjs` |
| `ogImage` | Default share image | fallback og:image, schema business `image` |
| `logo` | Logo file in `public/` (PNG/SVG, min 112x112) | schema `logo`. Set to `/logo.png` (logo on petrol plate, 2026-11-10). Vector logo lives in `src/components/Logo.astro` |
| `ga4Id`, `metaPixelId` | Tracking IDs | consent banner + tags (nothing loads while empty) |

Other data files:

| File | What to edit |
|---|---|
| `src/data/prices.ts` | `[DA X €]` / `[DA X]` prices and times of the price list (prezzi page, home table, llms-full) |
| `src/data/dates.mjs` | `SITE_UPDATED` and per-page dates: schema `dateModified`, sitemap `<lastmod>`, "Aggiornato a..." on guides. Bump only when content really changes |
| `src/data/workday.ts` | Day timeline (vasca-in-doccia, guide, llms-full); confirm times |
| `src/data/bonus.ts`, `src/data/faq.ts`, `src/data/zone-pages.ts`, `src/data/guides.ts` | Remove `[DA CONFERMARE...]` tags once confirmed (commercialista for bonus/IVA, client for the rest). llms files update by themselves |
| Pages | Remaining copy placeholders: `[ANNI DI GARANZIA]`, `[DURATA]`, `[X ORE]`, `[X GIORNI]`, `[ANNI DI ESPERIENZA]`, `[N° INSTALLAZIONI]`, `[SOCIETÀ DI FINANZIAMENTO]`, `[CITTÀ]` captions, `[OFFERTA DEL MESE]`, chi-siamo biography `[SERVE DATO REALE...]`, `[NOME E RUOLO DEL TECNICO]`, `[MAPPA GOOGLE]` on contatti, privacy and cookie texts from the client's consultant |

## 2. What was built (for reference)

- **Schema** (`src/lib/schema.ts`): one `HomeAndConstructionBusiness` (`/#azienda`) on every page with areaServed (the 8 Piemonte provinces, Torino first), `hasOfferCatalog` (3 services with links, no prices: the client does not publish prices), plus `WebSite`, `WebPage` (or `AboutPage`/`ContactPage`/`CollectionPage`/`FAQPage`) with `dateModified`, `inLanguage`, `primaryImageOfPage`; `Service` + `Offer` (no amounts) on service pages and the 8 province pages (each with its province as areaServed); `FAQPage`; `BreadcrumbList` on every inner indexable page; `Article` on the 3 guides.
- **Meta** (`src/layouts/Base.astro`): unique title (max 60) and description (max 155) per page, canonical, OG + Twitter tags with per-page image `public/og/<page>.jpg`, verification tags when set, theme-color.
- **Indexing**: `robots.txt`, `llms.txt`, `llms-full.txt` are generated at build from the data (`src/pages/*.txt.ts`), so they follow the domain and the filled values. Sitemap excludes grazie, offerta, privacy, cookie; lastmod from `dates.mjs`.
- **GEO content**: `/chi-siamo/`, `/guide/` + 3 guides, "Da leggere" guide blocks on service, price, bonus, FAQ, home and province pages.
- **Scripts**: `npm run og` (share images from the photos), `npm run indexnow` (ping IndexNow).

## 3. Launch steps (in order)

1. **Domain**: buy/confirm the domain. Set `url` in `site.ts` and `site` in `astro.config.mjs`. Decide www vs bare and add a Cloudflare redirect rule from the other one (301).
2. **Content**: fill every value in section 1. Replace **all** placeholder photos in `src/assets/media/` (they come from Re-Bath/Bath Fitter, US sites: see `src/data/media.ts`); update alt texts in `media.ts`; delete `_ba-sources.md` and remove the "PLACEHOLDER PHOTOS" comment in `media.ts`. Then `npm run og` to rebuild the share images from the real photos.
3. **Remove preview**: delete or archive the GitHub Pages preview repo/site `venere-bagni-preview` (it is noindex, but it should not stay online as a duplicate). Do not deploy with `PUBLIC_PREVIEW=1`.
4. **Indexing switch**: `indexable: true` in `site.ts`. Build, check one page source: `<meta name="robots" content="index, follow...">`.
5. **CRM**: create the site webhook token for the Italprogetti tenant in the CRM (`/admin/integrazioni`), then `wrangler secret put CRM_INGEST_TOKEN`. Test one real form submission end to end.
6. **Cloudflare**: deploy (`wrangler deploy`), attach the custom domain, set `"workers_dev": false` in `wrangler.jsonc` (or the workers.dev URL stays a public duplicate). Check `_headers` are applied (HSTS, cache). Check AI crawlers are not blocked by Cloudflare's bot settings (Security > Bots: "Block AI bots" off; AI Crawl Control allow GPTBot, ClaudeBot, PerplexityBot, etc.). Do not enable Cloudflare's managed robots.txt.
7. **Checks after deploy**: `https://<domain>/robots.txt`, `/sitemap-index.xml`, `/llms.txt`, `/llms-full.txt`, `/<indexNowKey>.txt` all 200. Run 3 pages through Google's Rich Results Test and validator.schema.org.
8. **Google Search Console**: add a Domain property (DNS TXT on Cloudflare) or URL prefix with `googleVerification`. Submit `https://<domain>/sitemap-index.xml`. URL-inspect and request indexing for home, vasca-in-doccia, prezzi, bonus-detrazioni, zone/torino.
9. **Bing Webmaster Tools**: import from Search Console (no extra verification), submit the sitemap. Bing feeds Copilot and ChatGPT search.
10. **IndexNow**: set `indexNowKey`, rebuild, deploy, then `npm run indexnow -- --live`. Expect HTTP 200/202. Re-run with the single URL whenever a page or guide is added.
11. **Google Business Profile** (the main lever for ChatGPT's local answers in this niche, see `research/piemonte/02-ai-search.md`):
    - Name exactly "Venere Bagni" (no keywords in the name). Address, phone, website identical to `site.ts`, letter for letter. If the sede does not receive customers, set it as a service-area business and hide the address, listing the 8 provinces as service areas, Torino first.
    - Primary category: "Bathroom remodeler" (Ristrutturazione bagni). Secondary: "Contractor" / "Plumber" only if true for the client. Check the Italian category names in the dashboard.
    - Services: Trasformazione vasca in doccia, Vasca con sportello, Bagno sicuro per anziani, Piatto doccia filo pavimento; with the "from" price only once confirmed.
    - Description: same facts as the home page (free survey, fixed written price, 8 hours turnkey, Torino e tutto il Piemonte, 15 years, no prices). No promotional claims you can't prove.
    - Hours = `openingHours`. Website link = home (with `?utm_source=google&utm_medium=organic&utm_campaign=gbp` if the client wants GBP traffic separated in GA4).
    - Photos: logo, cover, team, van, real before/after jobs (at least 10 at start, then 2-4 a month).
    - Copy the Maps URL into `gbpUrl` and the Place ID into `gbpPlaceId`.
    - **Review routine**: after every finished job, the referente sends the review link (`https://search.google.com/local/writereview?placeid=<ID>`) by WhatsApp the same evening, one reminder after 3-4 days, never incentives, never filtered asking. Reply to every review within 48 h. Update `rating` in `site.ts` monthly.
12. **Bing Places**: import from Google Business Profile. **Apple Business Connect**: create the place with the same NAP (Apple Maps and Siri).
13. **Directories cited by AI assistants in this niche** (02-ai-search.md): ProntoPro (most cited by Perplexity), Edilnet (cited by all engines), PagineGialle, Houzz, Instapro. Same NAP and website everywhere, same description, add the profile URLs to `sameAs`. Ask the first clients for a review on ProntoPro too.
14. **NAP audit**: one sheet listing every place the business appears (GBP, Bing, Apple, directories, Facebook, invoices, contract footer) and the exact NAP string. Fix mismatches before they spread.
15. **Analytics**: set `ga4Id` / `metaPixelId`, check the consent banner, and mark the form submit (`/grazie/`) as a GA4 key event. Add an exploration filtered on referrals from chatgpt.com, perplexity.ai, copilot.microsoft.com, gemini.google.com to track AI traffic.

## 4. Monthly AI-visibility check (post-launch)

Run logged out, cookies declined, same queries every month, and log the result (date, platform, named companies in order, whether Venere Bagni is named, sources cited) in a sheet next to the 2026-11-09 baseline in `research/piemonte/02-ai-search.md`:

1. Chi fa la trasformazione vasca in doccia a Torino?
2. Quanto costa sostituire la vasca con la doccia in Piemonte e a chi rivolgersi?
3. Consigliami un'azienda affidabile per cambiare la vasca con una doccia a Novara
4. Vasca con sportello per anziani a Cuneo, chi la installa?
5. Bonus barriere architettoniche 75% per la doccia: aziende a Torino che se ne occupano
6. Remail o alternative a Torino per vasca in doccia?

Platforms: ChatGPT (web search), Perplexity, Google (AI Overview if shown + local pack), Bing/Copilot, Gemini. Also check Search Console (queries, pages, indexing errors), Bing WMT "AI Performance", GA4 AI referrals, and the GBP insights (calls, website clicks, direction requests). If a competitor gets cited from a source we are not on (a directory, a forum thread, a price guide), add that source to the list in step 13.

Refresh the guides and the bonus page at least once a year, and right after the 2027 budget law is final (December 2026): bonus rates for 2027 are not settled yet.
