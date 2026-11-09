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
    description: 'Trasformazione vasca in doccia a Torino e provincia, in un giorno. Sopralluogo gratuito e preventivo scritto a prezzo fisso, da 3.500 €.',
    lead: 'Lavoriamo in città e in tutta la provincia. Veniamo a misurare il bagno senza costi, ti lasciamo il prezzo scritto e il lavoro si fa in un giorno [DA CONFERMARE].',
    introTitle: 'Il bagno a Torino',
    intro: [
      'A Torino molti appartamenti sono in condomini degli anni ’60 e ’70, dove la vasca misura spesso circa 170 cm ed è l’unico posto per lavarsi. Con l’età scavalcarla diventa difficile. Se al suo posto mettiamo una doccia nello stesso spazio, il resto del bagno non va rifatto.',
      'Lavoriamo anche nelle case singole e nelle villette dell’area metropolitana, allo stesso modo: il piatto doccia va dove c’era la vasca.',
    ],
    realData: '[SERVE DATO REALE: indirizzo della sede e distanza dalla città, se rilevante]',
    towns: [
      ['Cintura ovest', 'Collegno, Grugliasco, Rivoli, Alpignano'],
      ['Cintura sud', 'Moncalieri, Nichelino, Orbassano, Beinasco'],
      ['Cintura nord', 'Venaria Reale, Settimo Torinese, Chivasso'],
      ['Altri comuni', 'Chieri, Carmagnola, Pinerolo, Ivrea, Ciriè'],
    ],
    pricesTitle: 'Quanto costa a Torino',
    prices: 'La trasformazione standard della vasca in doccia parte da 3.500 € [DA CONFERMARE: IVA inclusa?]. Quanto spendi alla fine dipende dalla misura del bagno, dal piatto e dalle finiture. Te lo scriviamo nel preventivo dopo il sopralluogo gratuito.',
    review: { text: 'Abitiamo in un condominio anni 70 con la vasca da 170. In giornata hanno fatto tutto e prima di andare via hanno anche pulito.', name: 'Paola', town: 'Torino (Mirafiori)' },
    rating: true,
    faqs: [
      { q: 'Chi fa la trasformazione vasca in doccia a Torino?', a: 'A Torino e in provincia puoi rivolgerti a Venere Bagni, un’azienda piemontese che trasforma la vasca in doccia. Veniamo a casa tua per il sopralluogo gratuito, ti lasciamo un preventivo scritto a prezzo fisso e il lavoro lo facciamo in un giorno [DA CONFERMARE].' },
      { q: 'Quanto costa sostituire la vasca con la doccia a Torino?', a: 'A Torino la trasformazione standard con Venere Bagni parte da 3.500 €. Per sapere quanto costa nel tuo bagno serve il sopralluogo, che è gratuito: prendiamo le misure e ti scriviamo il preventivo con tutte le voci.' },
      { q: 'Venite anche nei comuni intorno a Torino?', a: 'Sì. Venere Bagni lavora a Torino e in provincia, per esempio a Moncalieri, Rivoli, Collegno, Settimo Torinese, Chieri e Pinerolo. Se il tuo comune non è nell’elenco, scrivi il CAP nel modulo e ti diciamo subito se arriviamo.' },
    ],
  },
  {
    slug: 'cuneo', name: 'Cuneo', img: 'famiglia',
    title: 'Vasca in doccia a Cuneo e provincia | Venere Bagni',
    description: 'Trasformazione vasca in doccia e vasca con sportello a Cuneo, Alba, Bra e Fossano. Sopralluogo gratuito e prezzo fisso da 3.500 €.',
    lead: 'Da Cuneo ad Alba e Mondovì veniamo a casa tua a misurare il bagno, gratis. Il prezzo te lo scriviamo prima e non cambia. Il lavoro dura un giorno [DA CONFERMARE].',
    introTitle: 'Il bagno nella provincia di Cuneo',
    intro: [
      'In provincia di Cuneo ci sono molti paesi e centri medi, con tante case singole e bifamiliari oltre ai condomini dei capoluoghi. Per noi il lavoro cambia poco: togliamo la vasca e nello stesso spazio montiamo una doccia comoda, senza rifare il bagno.',
      'Se cerchi una vasca con sportello o una doccia a filo pavimento per un genitore anziano e abiti lontano, al sopralluogo gratuito puoi collegarti per telefono.',
    ],
    realData: '[SERVE DATO REALE: come serviamo Cuneo, da quale sede, tempi di trasferta]',
    towns: [
      ['Capoluogo e dintorni', 'Cuneo, Borgo San Dalmazzo, Busca'],
      ['Langhe e Roero', 'Alba, Bra, Cherasco'],
      ['Pianura', 'Fossano, Savigliano, Saluzzo'],
      ['Monregalese', 'Mondovì'],
    ],
    pricesTitle: 'Quanto costa a Cuneo',
    prices: 'La trasformazione standard parte da 3.500 € [DA CONFERMARE: IVA inclusa?]. Il resto dipende dalla misura del bagno e da quello che scegli, e te lo scriviamo nel preventivo dopo il sopralluogo.',
    review: { text: 'Mio padre ha 82 anni e in vasca non ci entrava più. Adesso si fa la doccia seduto, da solo.', name: 'Elena', town: 'Fossano' },
    rating: false,
    faqs: [
      { q: 'Chi installa la vasca con sportello a Cuneo?', a: 'A Cuneo e in provincia la vasca con sportello la installa Venere Bagni. Veniamo a misurare il bagno senza costi, ti facciamo vedere il modello che ci sta e ti lasciamo il preventivo scritto. Se ti sembra più comoda, valutiamo anche una doccia con seggiolino.' },
      { q: 'Quanto costa trasformare la vasca in doccia a Cuneo?', a: 'A Cuneo la trasformazione standard della vasca in doccia con Venere Bagni parte da 3.500 €. Il prezzo per il tuo bagno lo fissiamo dopo il sopralluogo gratuito e lo scriviamo nel preventivo, voce per voce.' },
      { q: 'Venite anche nei paesi della provincia di Cuneo?', a: 'Sì, Venere Bagni lavora a Cuneo, Alba, Bra, Fossano, Savigliano, Saluzzo, Mondovì e in altri comuni della provincia. Scrivi il CAP nel modulo e ti diciamo subito se possiamo venire da te.' },
    ],
  },
  {
    slug: 'novara', name: 'Novara', img: 'luminoso',
    title: 'Vasca in doccia a Novara e provincia | Venere Bagni',
    description: 'Trasformazione vasca in doccia a Novara, Borgomanero, Arona e Trecate, in un giorno. Sopralluogo gratuito e prezzo fisso scritto, da 3.500 €.',
    lead: 'Lavoriamo a Novara, nell’Alto Novarese e nei comuni intorno. Il sopralluogo è gratuito, il preventivo è scritto a prezzo fisso e il lavoro si fa in una giornata [DA CONFERMARE].',
    introTitle: 'Il bagno nella zona di Novara',
    intro: [
      'A Novara e nei comuni vicini ci sono condomini in centro e case singole nei paesi. La vasca è quasi sempre il pezzo più ingombrante del bagno, e con l’età anche il più scomodo. Al suo posto montiamo una doccia, oppure una vasca con sportello per chi al bagno caldo non vuole rinunciare.',
      'Il lavoro dura un giorno [DA CONFERMARE]. Il prezzo lo scriviamo prima di cominciare e dall’inizio alla fine parli sempre con la stessa persona.',
    ],
    realData: '[SERVE DATO REALE: come serviamo Novara, da quale sede, tempi di trasferta]',
    towns: [
      ['Capoluogo e dintorni', 'Novara, Cameri, Galliate, Trecate, Oleggio'],
      ['Alto Novarese', 'Borgomanero, Arona'],
      ['Altri comuni', 'Bellinzago Novarese, Romentino, Cerano'],
    ],
    pricesTitle: 'Quanto costa a Novara',
    prices: 'La trasformazione standard parte da 3.500 € [DA CONFERMARE: IVA inclusa?]. Poi contano la misura, il piatto e le finiture: la cifra precisa te la scriviamo nel preventivo dopo il sopralluogo gratuito.',
    review: { text: 'Avevo chiesto solo un preventivo. Il tecnico ha preso le misure, mi ha spiegato bene e mi ha lasciato il foglio con la cifra. Poi ci ho pensato con calma.', name: 'Roberto', town: 'Borgomanero' },
    rating: false,
    faqs: [
      { q: 'A chi rivolgersi a Novara per trasformare la vasca in doccia?', a: 'A Novara e in provincia puoi rivolgerti a Venere Bagni, un’azienda piemontese che si occupa del passaggio da vasca a doccia. Il sopralluogo è gratuito, il preventivo è scritto a prezzo fisso e il lavoro si finisce in un giorno [DA CONFERMARE].' },
      { q: 'Quanto costa sostituire la vasca con la doccia a Novara?', a: 'A Novara una trasformazione standard con Venere Bagni parte da 3.500 €. Il prezzo per il tuo bagno lo decidiamo al sopralluogo gratuito e lo scriviamo nel preventivo voce per voce, così puoi confrontarlo con altri preventivi.' },
      { q: 'Lavorate anche a Borgomanero, Arona e Trecate?', a: 'Sì. Venere Bagni lavora a Novara, Borgomanero, Arona, Trecate, Galliate, Oleggio e in altri comuni della provincia. Se il tuo non è nell’elenco, scrivi il CAP nel modulo e ti diciamo subito se arriviamo.' },
    ],
  },
];
