// Content of the area page (/zone/<slug>/). Since 2026-11-10 the client serves Torino e provincia only, so there is
// one page (Torino); the other seven Piemonte provinces were removed. Slugs match `zones` in site.ts.
// Sources (read 2026-11-10):
//   [ISTAT]  Residents and 65+ at 1 Jan 2025, ISTAT data via tuttitalia.it
//            /piemonte/provincia-di-<x>/statistiche/indici-demografici-struttura-popolazione/
//            (65+ / total computed from the table). Piemonte: 1.143.233 su 4.251.868 = 26,9%.
//   [CAP]    CAP of every comune, github.com/matteocontrini/comuni-json (Poste/ISTAT data).
//   [L13]    Regione Piemonte, D.D. 25 settembre 2025 n. 1299, allegato A (riparto legge 13/1989, fabbisogno 2025):
//            https://www.regione.piemonte.it/governo/bollettino/abbonati/2025/40/attach/dda2200001299_11300.pdf
//            Province of each comune matched with [CAP]. Totale Piemonte 1.709.056,17 €.
//   [RP]     Regione Piemonte, "Eliminazione delle barriere architettoniche negli edifici privati":
//            https://www.regione.piemonte.it/web/temi/diritti-politiche-sociali/casa/eliminazione-delle-barriere-architettoniche-negli-edifici-privati
//            (domanda al Comune; solo per i residenti a Torino all'ATC del Piemonte Centrale, corso Dante 14;
//            prima dei lavori; residenza nell'immobile; pagamento a lavori eseguiti). No ATC Nord/Sud role for L.13.
// Placeholders in [BRACKETS] are things only the client knows (sede, trasferte, valli servite, tempi).
import type { Faq } from '../lib/schema';

export interface ZonePage {
  slug: string; name: string;
  at: string; // "a Torino", "nel Verbano-Cusio-Ossola"
  of: string; // "di Torino", "del Verbano-Cusio-Ossola" (as in "provincia di ...")
  area: string; // schema.org areaServed of the Service
  eyebrow?: string; // defaults to "<name> e provincia"
  title: string; description: string; lead: string; img: string;
  introTitle: string; intro: string[]; realData: string;
  facts: [string, string][]; // "in breve" table: CAP, 65+, legge 13
  l13: string; // local paragraph on the legge 13 contribution
  towns: [string, string][]; pricesTitle: string; prices: string;
  review: { text: string; name: string; town: string }; rating: boolean;
  faqs: Faq[];
}

export const zonePages: ZonePage[] = [
  {
    slug: 'torino', name: 'Torino', at: 'a Torino', of: 'di Torino', area: 'Città metropolitana di Torino', img: 'coppia',
    title: 'Vasca in doccia a Torino e provincia | Venere Bagni',
    description: 'Trasformazione vasca in doccia a Torino, in cintura e nelle valli: chiavi in mano in 8 ore, sopralluogo gratuito e preventivo a prezzo fisso.',
    lead: 'Lavoriamo in città e in tutta la provincia. Veniamo a misurare il bagno senza costi, ti lasciamo il prezzo scritto e poi, in 8 ore di lavoro, passi dalla vasca alla doccia finita.',
    introTitle: 'Il bagno a Torino',
    intro: [
      'A Torino molti appartamenti sono in condomini degli anni ’60 e ’70, dove la vasca misura spesso circa 170 cm ed è l’unico posto per lavarsi. Con l’età scavalcarla diventa difficile. Se al suo posto mettiamo una doccia nello stesso spazio, il resto del bagno non va rifatto.',
      'Lavoriamo anche nelle case singole e nelle villette dell’area metropolitana, allo stesso modo: il piatto doccia va dove c’era la vasca.',
    ],
    realData: '[SERVE DATO REALE: indirizzo della sede e distanza dalla città, se rilevante]',
    facts: [
      ['CAP', 'da 10010 a 10156; in città da 10121 a 10156'], // [CAP]
      ['Residenti con 65 anni o più', '26,6%, cioè 586.866 su 2.204.276 (ISTAT, 1° gennaio 2025)'], // [ISTAT]
      ['Domanda per la legge 13', 'Residenti a Torino: ATC del Piemonte Centrale, corso Dante 14. Negli altri comuni: il Comune'], // [RP]
      ['Legge 13, fondi 2025', 'Torino 261.571,42 € tramite ATC, Moncalieri 45.388,04 €, Settimo Torinese 33.675,25 €, Carmagnola 31.974,84 €'], // [L13]
    ],
    // [RP] Torino is the only comune where the ATC collects the applications; [L13] 261.571,42 € is the largest share in Piemonte.
    l13: 'Torino è l’unico comune del Piemonte dove la domanda per la legge 13 non va al Comune: per convenzione la raccoglie l’ATC del Piemonte Centrale. Nel 2025 la quota della città è stata di gran lunga la più alta della regione, 261.571,42 € su 1.709.056,17 €. In cintura i soldi sono andati ai municipi, per esempio 25.665,12 € a San Mauro Torinese e 18.654,73 € a Collegno.',
    towns: [
      ['Cintura', 'Moncalieri, Nichelino, Collegno, Grugliasco, Rivoli, Venaria Reale, Settimo Torinese'],
      ['Chierese e Carmagnolese', 'Chieri, Santena, Poirino, Carmagnola'],
      ['Canavese', 'Ivrea, Rivarolo Canavese, Cuorgnè, Castellamonte, Caluso'],
      ['Valle di Susa e Val Sangone', 'Avigliana, Almese, Condove, Susa, Giaveno'],
      ['Pinerolese', 'Pinerolo, Cumiana, Cavour, Luserna San Giovanni'],
      ['Valli di Lanzo', 'Ciriè, Lanzo Torinese, Viù'],
    ],
    pricesTitle: 'Quanto costa a Torino',
    prices: 'Il prezzo dipende dalla misura del bagno, dal piatto, dal gres e dal box che scegli [DA CONFERMARE: costo di trasferta per i comuni più lontani]. Te lo scriviamo nel preventivo dopo il sopralluogo gratuito, a prezzo fisso.',
    review: { text: 'Abitiamo in un condominio anni 70 con la vasca da 170. In giornata hanno fatto tutto e prima di andare via hanno anche pulito.', name: 'Paola', town: 'Torino (Mirafiori)' },
    rating: true,
    faqs: [
      { q: 'Chi fa la trasformazione vasca in doccia a Torino?', a: 'A Torino e in provincia puoi rivolgerti a Venere Bagni, che lavora solo in quest’area e ha 15 anni di attività. Veniamo a casa tua per il sopralluogo gratuito e ti lasciamo un preventivo scritto a prezzo fisso. Il lavoro è chiavi in mano, materiali compresi, e lo finiamo in 8 ore.' },
      // [RP] ATC address and rules; art. 11 L. 13/1989 (in [L13]): the application states the works and the expected cost.
      { q: 'A Torino dove si presenta la domanda per il contributo della legge 13?', a: 'Se abiti nel comune di Torino la domanda va all’ATC del Piemonte Centrale, in corso Dante 14. Se abiti in un altro comune della provincia, come Moncalieri o Chieri, va al tuo Comune. In tutti e due i casi va fatta prima di cominciare i lavori. Nella domanda servono le opere e la spesa prevista, e le trovi nel preventivo scritto di Venere Bagni.' },
      { q: 'Arrivate anche in Val di Susa, nel Pinerolese e nelle Valli di Lanzo?', a: 'Venere Bagni lavora in tutta la provincia di Torino, dalla cintura alle valli. Per i comuni più lontani dalla città, come Susa, Luserna San Giovanni o Viù, [DA CONFERMARE: se c’è un costo di trasferta]. Tra l’ordine e il giorno del lavoro passano da 30 a 60 giorni, come in città. Scrivi il CAP nel modulo e te lo diciamo prima di fissare il sopralluogo.' },
    ],
  },
];
