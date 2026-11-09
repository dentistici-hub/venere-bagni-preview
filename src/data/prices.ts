// Price list, one place: /prezzi/ table, home page price table, llms-full.txt.
// '[DA X €]' = price still to come from the client (shows as a yellow mark, left out of llms files).
// The "from" price of the standard job is site.priceFrom (src/data/site.ts).
import { site, euro } from './site';

// short = label in the home page table; home = row shown on the home page.
export interface PriceRow { name: string; short?: string; price: string; time: string; href: string; home: boolean }

export const priceList: PriceRow[] = [
  { name: 'Trasformazione vasca in doccia, versione standard', short: 'Vasca in doccia, versione standard', price: `da ${euro(site.priceFrom)}`, time: '1 giorno [DA CONFERMARE]', href: '/vasca-in-doccia/', home: true },
  { name: 'Vasca in doccia con piatto a filo pavimento', price: '[DA X €]', time: '[DA X]', href: '/vasca-in-doccia/', home: true },
  { name: 'Vasca con sportello', price: '[DA X €]', time: '[DA X]', href: '/vasca-con-sportello/', home: true },
  { name: 'Pacchetto bagno sicuro (maniglioni, seggiolino, antiscivolo)', short: 'Pacchetto bagno sicuro', price: '[DA X €]', time: '[DA X]', href: '/bagno-sicuro/', home: true },
  { name: 'Sostituzione del solo box doccia', price: '[DA X €]', time: '[DA X]', href: '', home: false },
  { name: 'Bagno completo', price: '[DA X €]', time: '[DA X]', href: '', home: false },
];

// "Cosa fa cambiare il prezzo" table on /prezzi/, also in llms-full.txt.
export const priceFactors: [string, string][] = [
  ['Misura del bagno', 'Un piatto più grande o su misura costa di più'],
  ['Tipo di piatto', 'Il filo pavimento richiede più lavoro sullo scarico'],
  ['Finiture e colori', 'Le pareti e le finiture speciali aumentano il costo'],
  ['Box doccia', 'Scorrevole, a battente o a nicchia hanno prezzi diversi'],
  ['Stato dello scarico e della parete', 'Se vanno rifatti, si aggiungono ore di lavoro'],
  ['Accessori di sicurezza', 'Maniglioni, seggiolino e miscelatore termostatico si sommano al prezzo base'],
];
