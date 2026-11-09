// JSON-LD graph: one LocalBusiness for the company, plus per-page Service, FAQPage and BreadcrumbList.
// Placeholders (values in [brackets]) are left out so the markup never states unconfirmed facts.
import { site } from '../data/site';
import { plain } from './txt';
import { u } from './url';

export interface Faq { q: string; a: string }
interface Opts { path: string; name?: string; faqs?: Faq[]; crumbs?: { name: string; path: string }[]; service?: { name: string; description: string; minPrice?: number; areaServed?: string } }

const isReal = (v: string) => !!v && !/\[|0000000/.test(v);
const abs = (p: string) => new URL(u(p), site.url).toString();

export function buildGraph(o: Opts) {
  const bizId = abs('/#azienda');
  const biz: Record<string, unknown> = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': bizId,
    name: site.brand,
    legalName: site.legalName,
    url: abs('/'),
    description: plain(site.description),
    image: abs('/og-image.jpg'),
    priceRange: `da ${site.priceFrom} EUR`,
    areaServed: site.areas.map((a) => ({ '@type': 'AdministrativeArea', name: a === 'Verbano-Cusio-Ossola' ? `Provincia del ${a}` : `Provincia di ${a}` })),
    address: { '@type': 'PostalAddress', addressLocality: site.locality, addressRegion: 'Piemonte', addressCountry: site.country, ...(isReal(site.street) ? { streetAddress: site.street, postalCode: site.postalCode } : {}) },
    knowsAbout: ['trasformazione vasca in doccia', 'vasca con sportello', 'bagno per anziani', 'piatto doccia filo pavimento', 'eliminazione barriere architettoniche'],
  };
  if (isReal(site.phone)) biz.telephone = site.phoneHref;
  if (isReal(site.email)) biz.email = site.email;
  if (isReal(site.vat)) biz.vatID = site.vat;

  const graph: Record<string, unknown>[] = [
    biz,
    { '@type': 'WebSite', '@id': abs('/#sito'), url: abs('/'), name: site.brand, inLanguage: 'it-IT', publisher: { '@id': bizId } },
  ];
  if (o.service) {
    graph.push({
      '@type': 'Service',
      name: o.service.name,
      description: plain(o.service.description),
      serviceType: o.service.name,
      provider: { '@id': bizId },
      // Zone pages pass their province; every other page serves the whole region.
      areaServed: o.service.areaServed
        ? { '@type': 'AdministrativeArea', name: o.service.areaServed, containedInPlace: { '@type': 'AdministrativeArea', name: 'Piemonte' } }
        : { '@type': 'AdministrativeArea', name: 'Piemonte' },
      url: abs(o.path),
      ...(o.service.minPrice ? { offers: { '@type': 'Offer', priceCurrency: 'EUR', priceSpecification: { '@type': 'PriceSpecification', minPrice: o.service.minPrice, priceCurrency: 'EUR' } } } : {}),
    });
  }
  if (o.faqs?.length) {
    graph.push({ '@type': 'FAQPage', mainEntity: o.faqs.map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })) });
  }
  if (o.crumbs?.length) {
    graph.push({ '@type': 'BreadcrumbList', itemListElement: [{ name: 'Home', path: '/' }, ...o.crumbs].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
