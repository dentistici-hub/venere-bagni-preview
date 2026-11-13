// JSON-LD graph for every page:
//   HomeAndConstructionBusiness (the company, same @id everywhere) + WebSite + WebPage (this page)
//   + optional Service, FAQPage, BreadcrumbList, Article. No prices anywhere (client decision 2026-11-10).
// Values from src/data/site.ts that are empty or still [PLACEHOLDER] are left out, so the markup never states
// unconfirmed facts. Text fields go through plain(), which strips placeholders and markdown.
import { site, filled } from '../data/site';
import { plain } from './txt';
import { u } from './url';

import { hasPh } from './txt';
import { isPreview as _pv } from './url';
const liveFaqs = (l: Faq[]) => (_pv ? l : l.filter((f) => !hasPh(f.a)));
export interface Faq { q: string; a: string }
export type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage';
export interface ServiceOpts { name: string; description: string; areaServed?: string }
export interface ArticleOpts { headline: string; published: string; modified: string }
interface Opts {
  path: string; title: string; description: string; image: string; modified: string; pageType?: PageType;
  faqs?: Faq[]; crumbs?: { name: string; path: string }[]; service?: ServiceOpts; article?: ArticleOpts;
}

export const abs = (p: string) => new URL(u(p), site.url).toString();
const ids = { biz: () => abs('/#azienda'), site: () => abs('/#sito') };

// Services offered, linked from the business node (hasOfferCatalog). No prices: the client publishes none.
const catalog = [
  { name: 'Trasformazione vasca in doccia', path: '/vasca-in-doccia/' },
  { name: 'Installazione vasca con sportello', path: '/vasca-con-sportello/' },
  { name: 'Bagno sicuro per anziani', path: '/bagno-sicuro/' },
];
// Area served: the eight Piemonte provinces, Torino first (main area). Order from site.areas.
const provinceName = (a: string) => (a === 'Verbano-Cusio-Ossola' ? `Provincia del ${a}` : a === 'Torino' ? 'Città metropolitana di Torino' : `Provincia di ${a}`);
const areaServed = site.areas.map((a) => ({ '@type': 'AdministrativeArea', name: provinceName(a) }));
const dayName: Record<string, string> = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' };

function business() {
  const biz: Record<string, unknown> = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': ids.biz(),
    name: site.brand,
    legalName: site.legalName,
    url: abs('/'),
    description: plain(site.description),
    image: abs(site.ogImage),
    areaServed,
    address: {
      '@type': 'PostalAddress', addressLocality: site.locality, addressRegion: 'Piemonte', addressCountry: site.country,
      ...(filled(site.street) ? { streetAddress: site.street } : {}), ...(filled(site.postalCode) ? { postalCode: site.postalCode } : {}),
    },
    knowsAbout: ['trasformazione vasca in doccia', 'vasca con sportello', 'bagno per anziani', 'piatto doccia filo pavimento', 'eliminazione barriere architettoniche', 'DM 236/1989'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi Venere Bagni',
      itemListElement: catalog.map((c) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: c.name, url: abs(c.path) },
      })),
    },
  };
  if (filled(site.logo)) biz.logo = abs(site.logo);
  if (filled(site.phone) && filled(site.phoneHref)) biz.telephone = site.phoneHref;
  if (filled(site.email)) biz.email = site.email;
  if (filled(site.vat)) biz.vatID = site.vat;
  if (filled(site.rea)) biz.identifier = { '@type': 'PropertyValue', propertyID: 'REA', value: site.rea };
  if (filled(site.foundingYear)) biz.foundingDate = site.foundingYear;
  if (filled(site.founder.name)) biz.founder = { '@type': 'Person', name: site.founder.name, ...(filled(site.founder.role) ? { jobTitle: site.founder.role } : {}) };
  if (site.geo.lat != null && site.geo.lng != null) biz.geo = { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng };
  if (site.openingHours.length) {
    biz.openingHoursSpecification = site.openingHours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days.map((d) => `https://schema.org/${dayName[d]}`), opens: h.opens, closes: h.closes }));
  }
  const same = [site.gbpUrl, ...site.sameAs].filter(filled);
  if (same.length) biz.sameAs = same;
  if (filled(site.gbpUrl)) biz.hasMap = site.gbpUrl;
  // OFF by default (site.ratingInSchema): see the comment on `rating` in site.ts (Google self-serving review rules).
  if (site.ratingInSchema && site.rating.value && site.rating.count) {
    biz.aggregateRating = { '@type': 'AggregateRating', ratingValue: site.rating.value, reviewCount: site.rating.count, bestRating: 5 };
  }
  return biz;
}

export function buildGraph(o: Opts) {
  const url = abs(o.path);
  const pageId = `${url}#pagina`;
  const hasCrumbs = !!o.crumbs?.length;
  const graph: Record<string, unknown>[] = [
    business(),
    { '@type': 'WebSite', '@id': ids.site(), url: abs('/'), name: site.brand, inLanguage: 'it-IT', publisher: { '@id': ids.biz() } },
  ];

  const page: Record<string, unknown> = {
    '@type': o.pageType ?? 'WebPage',
    '@id': pageId,
    url,
    name: plain(o.title),
    description: plain(o.description),
    inLanguage: 'it-IT',
    isPartOf: { '@id': ids.site() },
    primaryImageOfPage: { '@type': 'ImageObject', url: o.image, width: 1200, height: 630 },
    dateModified: o.modified,
    ...(hasCrumbs ? { breadcrumb: { '@id': `${url}#percorso` } } : {}),
    ...(o.path === '/' || o.pageType === 'AboutPage' || o.pageType === 'ContactPage' ? { about: { '@id': ids.biz() } } : {}),
  };
  if (o.pageType === 'FAQPage' && o.faqs?.length) {
    page.mainEntity = liveFaqs(o.faqs).map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } }));
  }
  graph.push(page);

  if (o.service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#servizio`,
      name: o.service.name,
      serviceType: o.service.name,
      description: plain(o.service.description),
      provider: { '@id': ids.biz() },
      // Zone pages pass their province; every other page serves the whole list.
      areaServed: o.service.areaServed
        ? { '@type': 'AdministrativeArea', name: o.service.areaServed, containedInPlace: { '@type': 'AdministrativeArea', name: 'Piemonte' } }
        : areaServed,
      url,
      image: o.image,
    });
  }
  // FAQ markup on pages whose main content is not the FAQ (the FAQ page itself carries it in mainEntity).
  if (o.faqs?.length && o.pageType !== 'FAQPage') {
    graph.push({ '@type': 'FAQPage', '@id': `${url}#domande`, isPartOf: { '@id': pageId }, mainEntity: liveFaqs(o.faqs).map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })) });
  }
  if (o.article) {
    const author = filled(site.founder.name)
      ? { '@type': 'Person', name: site.founder.name, ...(filled(site.founder.role) ? { jobTitle: site.founder.role } : {}), worksFor: { '@id': ids.biz() } }
      : { '@id': ids.biz() };
    graph.push({
      '@type': 'Article',
      '@id': `${url}#articolo`,
      headline: plain(o.article.headline),
      description: plain(o.description),
      image: o.image,
      datePublished: o.article.published,
      dateModified: o.article.modified,
      inLanguage: 'it-IT',
      author,
      publisher: { '@id': ids.biz() },
      mainEntityOfPage: { '@id': pageId },
      isPartOf: { '@id': ids.site() },
    });
  }
  if (hasCrumbs) {
    graph.push({
      '@type': 'BreadcrumbList', '@id': `${url}#percorso`,
      itemListElement: [{ name: 'Home', path: '/' }, ...o.crumbs!].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
