// Content of the zone pages (/zone/<slug>/), from site-copy/zona-*.md. Slugs match `zones` in site.ts.
import type { Faq } from '../lib/schema';

export interface ZonePage {
  slug: string; name: string; title: string; description: string; lead: string; img: string;
  introTitle: string; intro: string[]; realData: string;
  towns: [string, string][]; pricesTitle: string; prices: string;
  review: { text: string; name: string; town: string }; rating: boolean;
  faqs: Faq[];
}

export const zonePages: ZonePage[] = [
  {
    slug: 'torino', name: 'Torino', img: 'coppia',
    title: 'Vasca in doccia a Torino in 1 giorno | Venere Bagni',
    description: 'Trasformazione vasca in doccia a Torino e provincia: sopralluogo gratuito, prezzo fisso da 3.500 € e lavoro in un giorno. Venere Bagni.',
    lead: 'Lavoriamo a Torino e in tutta la provincia. Sopralluogo gratuito, preventivo scritto a prezzo fisso e lavoro in un giorno [DA CONFERMARE].',
    introTitle: 'Il bagno a Torino',
    intro: [
      'A Torino molti appartamenti sono in condomini costruiti negli anni ’60 e ’70. In questi palazzi la vasca misura spesso circa 170 cm ed è l’unico modo di lavarsi. Con il passare degli anni diventa difficile da scavalcare. Sostituirla con una doccia nello stesso spazio evita di rifare il bagno.',
      'Lavoriamo anche nelle case singole e nelle villette dell’area metropolitana. Anche qui il piatto doccia prende il posto della vasca senza toccare il resto del bagno.',
    ],
    realData: '[SERVE DATO REALE: indirizzo della sede e distanza dalla città, se rilevante]',
    towns: [
      ['Cintura ovest', 'Collegno, Grugliasco, Rivoli, Alpignano'],
      ['Cintura sud', 'Moncalieri, Nichelino, Orbassano, Beinasco'],
      ['Cintura nord', 'Venaria Reale, Settimo Torinese, Chivasso'],
      ['Altri comuni', 'Chieri, Carmagnola, Pinerolo, Ivrea, Ciriè'],
    ],
    pricesTitle: 'Quanto costa a Torino',
    prices: 'La trasformazione standard della vasca in doccia parte da 3.500 € [DA CONFERMARE: IVA inclusa?]. Il prezzo finale dipende da misura del bagno, piatto e finiture, ed è scritto nel preventivo dopo il sopralluogo gratuito.',
    review: { text: 'Condominio anni ’70, vasca da 170. In un giorno era tutto fatto e pulito.', name: 'Paola', town: 'Torino (Mirafiori)' },
    rating: true,
    faqs: [
      { q: 'Chi fa la trasformazione vasca in doccia a Torino?', a: 'A Torino e provincia la trasformazione della vasca in doccia la fa anche Venere Bagni, azienda del Piemonte. Veniamo a casa sua per un sopralluogo gratuito, Le lasciamo un preventivo scritto a prezzo fisso e facciamo il lavoro in un giorno [DA CONFERMARE].' },
      { q: 'Quanto costa sostituire la vasca con la doccia a Torino?', a: 'A Torino la trasformazione standard parte da 3.500 € con Venere Bagni. Per conoscere il prezzo del suo bagno basta il sopralluogo gratuito: misuriamo e Le scriviamo il preventivo con tutte le voci.' },
      { q: 'Venite anche nei comuni intorno a Torino?', a: 'Sì. Venere Bagni lavora a Torino e in provincia, per esempio a Moncalieri, Rivoli, Collegno, Settimo Torinese, Chieri e Pinerolo. Se il suo comune non è in elenco, inserisca il CAP nel modulo e Le diciamo subito se arriviamo.' },
    ],
  },
  {
    slug: 'cuneo', name: 'Cuneo', img: 'famiglia',
    title: 'Vasca in doccia a Cuneo e provincia | Venere Bagni',
    description: 'Trasformazione vasca in doccia e vasca con sportello a Cuneo, Alba, Bra e Fossano. Sopralluogo gratuito e prezzo fisso da 3.500 €.',
    lead: 'Arriviamo a Cuneo e in tutta la provincia. Sopralluogo gratuito, preventivo scritto a prezzo fisso e lavoro in un giorno [DA CONFERMARE].',
    introTitle: 'Il bagno nella provincia di Cuneo',
    intro: [
      'Nella provincia di Cuneo ci sono tanti centri medi e paesi, con una buona parte di case singole e bifamiliari accanto ai condomini dei capoluoghi. Il lavoro è lo stesso in entrambi i casi: togliere la vasca e mettere una doccia comoda nello stesso spazio, senza rifare il bagno.',
      'Se cerca una vasca con sportello o una doccia a filo pavimento per un genitore anziano, il sopralluogo gratuito si può fare anche con il familiare collegato per telefono.',
    ],
    realData: '[SERVE DATO REALE: come serviamo Cuneo, da quale sede, tempi di trasferta]',
    towns: [
      ['Capoluogo e dintorni', 'Cuneo, Borgo San Dalmazzo, Busca'],
      ['Langhe e Roero', 'Alba, Bra, Cherasco'],
      ['Pianura', 'Fossano, Savigliano, Saluzzo'],
      ['Monregalese', 'Mondovì'],
    ],
    pricesTitle: 'Quanto costa a Cuneo',
    prices: 'La trasformazione standard parte da 3.500 € [DA CONFERMARE: IVA inclusa?]. Il prezzo finale dipende dalla misura del bagno e dalle scelte e viene scritto nel preventivo dopo il sopralluogo.',
    review: { text: 'Mio padre ha 82 anni e non entrava più in vasca. Ora fa la doccia seduto e tranquillo.', name: 'Elena', town: 'Fossano' },
    rating: false,
    faqs: [
      { q: 'Chi installa la vasca con sportello a Cuneo?', a: 'A Cuneo e provincia la vasca con sportello la installa anche Venere Bagni. Veniamo a misurare il bagno gratuitamente, Le mostriamo il modello adatto e Le lasciamo un preventivo scritto. Per chi preferisce, valutiamo anche una doccia con seggiolino.' },
      { q: 'Quanto costa trasformare la vasca in doccia a Cuneo?', a: 'A Cuneo la trasformazione standard della vasca in doccia parte da 3.500 € con Venere Bagni. Il prezzo del suo bagno lo stabiliamo dopo il sopralluogo gratuito e lo scriviamo nel preventivo, voce per voce.' },
      { q: 'Venite anche nei paesi della provincia di Cuneo?', a: 'Sì, Venere Bagni lavora a Cuneo, Alba, Bra, Fossano, Savigliano, Saluzzo, Mondovì e in altri comuni della provincia. Scriva il CAP nel modulo e Le diciamo subito se possiamo venire da Lei.' },
    ],
  },
  {
    slug: 'novara', name: 'Novara', img: 'luminoso',
    title: 'Vasca in doccia a Novara e provincia | Venere Bagni',
    description: 'Trasformazione vasca in doccia a Novara, Borgomanero, Arona e Trecate. Sopralluogo gratuito, prezzo fisso scritto da 3.500 €, lavoro in un giorno.',
    lead: 'Lavoriamo a Novara e in provincia. Sopralluogo gratuito, preventivo scritto a prezzo fisso e lavoro in un giorno [DA CONFERMARE].',
    introTitle: 'Il bagno nella zona di Novara',
    intro: [
      'A Novara e nei comuni vicini convivono condomini nei centri e case singole nei paesi. In tutti e due i casi la vasca è spesso il pezzo più ingombrante del bagno e il più scomodo da usare con l’età. Al suo posto montiamo una doccia o, per chi vuole tenere il bagno caldo, una vasca con sportello.',
      'Il lavoro si fa in un giorno [DA CONFERMARE], con un unico referente e un prezzo scritto prima.',
    ],
    realData: '[SERVE DATO REALE: come serviamo Novara, da quale sede, tempi di trasferta]',
    towns: [
      ['Capoluogo e dintorni', 'Novara, Cameri, Galliate, Trecate, Oleggio'],
      ['Alto Novarese', 'Borgomanero, Arona'],
      ['Altri comuni', 'Bellinzago Novarese, Romentino, Cerano'],
    ],
    pricesTitle: 'Quanto costa a Novara',
    prices: 'La trasformazione standard parte da 3.500 € [DA CONFERMARE: IVA inclusa?]. Il prezzo finale dipende da misura, piatto e finiture, e viene scritto nel preventivo dopo il sopralluogo gratuito.',
    review: { text: 'Ho chiesto solo un preventivo. Hanno misurato, hanno spiegato e mi hanno lasciato un foglio con la cifra.', name: 'Roberto', town: 'Borgomanero' },
    rating: false,
    faqs: [
      { q: 'A chi rivolgersi a Novara per trasformare la vasca in doccia?', a: 'A Novara e provincia può rivolgersi a Venere Bagni, azienda del Piemonte specializzata nel passaggio da vasca a doccia. Il sopralluogo è gratuito, il preventivo è scritto a prezzo fisso e il lavoro si completa in un giorno [DA CONFERMARE].' },
      { q: 'Quanto costa sostituire la vasca con la doccia a Novara?', a: 'A Novara una trasformazione standard parte da 3.500 € con Venere Bagni. Il prezzo del suo bagno viene deciso al sopralluogo gratuito e scritto nel preventivo, con ogni voce indicata. Può confrontarlo con altri preventivi, voce per voce.' },
      { q: 'Lavorate anche a Borgomanero, Arona e Trecate?', a: 'Sì. Venere Bagni lavora a Novara, Borgomanero, Arona, Trecate, Galliate, Oleggio e in altri comuni della provincia. Se il suo non è in elenco, inserisca il CAP nel modulo e Le diciamo subito se arriviamo.' },
    ],
  },
];
