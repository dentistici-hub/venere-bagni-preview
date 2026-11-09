// Site-wide settings. Every value in [SQUARE BRACKETS] or marked CONFIRM is a placeholder to settle
// with the client (Italprogetti srls) before launch. Empty string = the block is hidden.
export const site = {
  // Off until launch: the preview must never be indexed.
  indexable: false,
  // CONFIRM: final domain. The preview build overrides it with PUBLIC_SITE_URL.
  url: (import.meta.env.PUBLIC_SITE_URL as string | undefined) || 'https://www.venerebagni.it',
  lang: 'it',
  brand: 'Venere Bagni',
  legalName: 'Italprogetti srls',
  tagline: 'Dalla vasca alla doccia in un giorno',
  title: 'Trasformazione vasca in doccia a Torino e in Piemonte | Venere Bagni',
  description:
    'Sostituiamo la vasca con una doccia sicura in un giorno, a Torino e in tutto il Piemonte. Sopralluogo gratuito, prezzo scritto e fisso, da 3.500 €.',
  area: 'Torino e tutto il Piemonte',
  // Provinces served, Torino first (order is used in the zone lists and the schema).
  areas: ['Torino', 'Cuneo', 'Novara', 'Alessandria', 'Asti', 'Biella', 'Vercelli', 'Verbano-Cusio-Ossola'],
  // CAP prefixes of the Piemonte provinces, used by the form's area check.
  capPrefixes: ['10', '12', '13', '14', '15', '28'],
  street: '[INDIRIZZO]',
  postalCode: '[CAP]',
  locality: 'Torino', // CONFIRM: the company's registered or operating town
  region: 'TO',
  country: 'IT',
  phone: '[TELEFONO]',
  phoneHref: '+390000000000', // CONFIRM
  whatsapp: '390000000000', // CONFIRM, digits only
  whatsappLabel: '[WHATSAPP]',
  email: '[EMAIL]',
  vat: '[P.IVA]',
  hours: '[ORARI]',
  priceFrom: 3500, // example price agreed with Denis 2026-11-09; CONFIRM with the client (VAT included?)
  privacyUrl: '/privacy/',
  // Tracking. Empty = nothing is loaded (consent banner only appears when one is set).
  ga4Id: '',
  metaPixelId: '',
};

export const nav = [
  { href: '/vasca-in-doccia/', label: 'Vasca in doccia' },
  { href: '/vasca-con-sportello/', label: 'Vasca con sportello' },
  { href: '/bagno-sicuro/', label: 'Bagno sicuro' },
  { href: '/prezzi/', label: 'Prezzi' },
  { href: '/bonus-detrazioni/', label: 'Bonus 2026' },
  { href: '/domande-frequenti/', label: 'Domande' },
];

export const zones = [
  { slug: 'torino', name: 'Torino' },
  { slug: 'cuneo', name: 'Cuneo' },
  { slug: 'novara', name: 'Novara' },
];

export const euro = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} €`;
