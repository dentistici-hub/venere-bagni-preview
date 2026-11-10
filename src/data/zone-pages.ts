// Content of the zone pages (/zone/<slug>/), one per Piemonte province, Torino first (the client's main area).
// Slugs match `zones` in site.ts. Every page carries facts that exist only for its province.
// Copy rules (client, 2026-11-10): no prices, 8-hour turnkey job with materials included, gres walls,
// 2-year legal warranty, 30-60 days between order and job; say it differently on each page.
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
      'A Torino molti appartamenti sono in condomini degli anni ’60 e ’70, dove la vasca misura spesso circa 170 cm ed è l’unico posto per lavarsi. Spesso il bagno è ancora quello originale, con le piastrelle dell’epoca. Se al posto della vasca mettiamo una doccia con pareti in gres nuovo, il bagno cambia faccia senza rifarlo tutto.',
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
      { q: 'Chi fa la trasformazione vasca in doccia a Torino?', a: 'A Torino e in provincia puoi rivolgerti a Venere Bagni, che parte da qui per lavorare in tutto il Piemonte e ha 15 anni di attività. Veniamo a casa tua per il sopralluogo gratuito e ti lasciamo un preventivo scritto a prezzo fisso. Il lavoro è chiavi in mano, materiali compresi, e lo finiamo in 8 ore.' },
      // [RP] ATC address and rules; art. 11 L. 13/1989 (in [L13]): the application states the works and the expected cost.
      { q: 'A Torino dove si presenta la domanda per il contributo della legge 13?', a: 'Se abiti nel comune di Torino la domanda va all’ATC del Piemonte Centrale, in corso Dante 14. Se abiti in un altro comune della provincia, come Moncalieri o Chieri, va al tuo Comune. In tutti e due i casi va fatta prima di cominciare i lavori. Nella domanda servono le opere e la spesa prevista, e le trovi nel preventivo scritto di Venere Bagni.' },
      { q: 'Arrivate anche in Val di Susa, nel Pinerolese e nelle Valli di Lanzo?', a: 'Venere Bagni lavora in tutta la provincia di Torino, dalla cintura alle valli. Per i comuni più lontani dalla città, come Susa, Luserna San Giovanni o Viù, [DA CONFERMARE: se c’è un costo di trasferta]. Tra l’ordine e il giorno del lavoro passano da 30 a 60 giorni, come in città. Scrivi il CAP nel modulo e te lo diciamo prima di fissare il sopralluogo.' },
    ],
  },
  {
    slug: 'cuneo', name: 'Cuneo', at: 'a Cuneo', of: 'di Cuneo', area: 'Provincia di Cuneo', img: 'famiglia',
    title: 'Vasca in doccia a Cuneo, Alba e Mondovì | Venere Bagni',
    description: 'Vasca in doccia e vasca con sportello a Cuneo, Alba, Bra, Fossano e Mondovì: chiavi in mano in 8 ore, sopralluogo gratuito e prezzo fisso.',
    lead: 'Da Cuneo ad Alba e Mondovì veniamo a casa tua a misurare il bagno, gratis. Il prezzo te lo scriviamo prima e non cambia. Poi la squadra lavora 8 ore e ti lascia la doccia finita, materiali compresi.',
    introTitle: 'Il bagno nella provincia di Cuneo',
    intro: [
      // tuttitalia.it/piemonte/provincia-di-cuneo/ : 6.894,82 km², the largest province of Piemonte.
      'Quella di Cuneo è la provincia più estesa del Piemonte, quasi 6.900 km² tra le valli alpine, la pianura di Fossano e Savigliano e le colline di Langhe e Roero. Fuori dai centri più grandi ci sono tante case singole, bifamiliari e cascine. Per noi il lavoro cambia poco: togliamo la vasca e nello stesso spazio montiamo una doccia comoda, senza rifare il bagno.',
      'Nelle case di campagna i bagni sono spesso grandi: c’è spazio per una doccia walk-in con vetro fisso, o per una vasca con sportello se la vasca la vuoi tenere.',
    ],
    realData: '[SERVE DATO REALE: come serviamo Cuneo, da quale sede, tempi di trasferta]',
    facts: [
      ['CAP', 'da 12010 a 12100; Briga Alta ha il 18025'], // [CAP]
      ['Residenti con 65 anni o più', '25,4%, cioè 147.724 su 581.526 (ISTAT, 1° gennaio 2025)'], // [ISTAT]
      ['Domanda per la legge 13', 'Al Comune dove si trova la casa'], // [RP]
      ['Legge 13, fondi 2025', '32 comuni; i più alti Cuneo 19.894,10 €, Montà 13.708,52 €, Racconigi 13.117,82 €'], // [L13]
    ],
    // [L13] Cuneo row: 13.775,11 invalidi totali + 6.118,99 parziali. Benevello, Cerretto Langhe (Langhe), Sampeyre (Valle Varaita) are CN.
    l13: 'Nel riparto 2025 della legge 13 i fondi del Cuneese sono andati a 32 comuni, compresi paesi piccoli come Benevello e Cerretto Langhe, nelle Langhe, e Sampeyre in Valle Varaita. Il Comune di Cuneo ha avuto 19.894,10 €: 13.775,11 € per domande di invalidi totali e 6.118,99 € per invalidi parziali.',
    towns: [
      ['Cuneo e dintorni', 'Cuneo, Borgo San Dalmazzo, Busca, Boves, Peveragno'],
      ['Pianura', 'Fossano, Savigliano, Racconigi, Cavallermaggiore'],
      ['Saluzzese', 'Saluzzo, Verzuolo, Piasco'],
      ['Langhe e Roero', 'Alba, Bra, Cherasco, Canale, Dogliani'],
      ['Monregalese e Cebano', 'Mondovì, Ceva, Frabosa Sottana'],
      ['Valli', 'Dronero (Valle Maira), Sampeyre (Valle Varaita), Demonte (Valle Stura)'],
    ],
    pricesTitle: 'Quanto costa a Cuneo',
    prices: 'Lo decide il tuo bagno: la misura, il piatto, il gres e il box che scegli [DA CONFERMARE: se per le valli si aggiunge una trasferta]. Te lo scriviamo nel preventivo dopo il sopralluogo e resta quello.',
    review: { text: 'Mio padre ha 82 anni e in vasca non ci entrava più. Adesso si fa la doccia seduto, da solo.', name: 'Elena', town: 'Fossano' },
    rating: false,
    faqs: [
      { q: 'Chi installa la vasca con sportello a Cuneo?', a: 'A Cuneo e in provincia la vasca con sportello la installa Venere Bagni. Veniamo a misurare il bagno senza costi, ti facciamo vedere il modello che ci sta e ti lasciamo il preventivo scritto. Se ti sembra più comoda, valutiamo anche una doccia con seggiolino.' },
      { q: 'Abito in una valle del Cuneese: venite anche in Valle Maira o in Valle Stura?', a: 'Venere Bagni copre la provincia di Cuneo, ma nelle valli alpine la distanza pesa. Per Dronero, Demonte o Sampeyre [DA CONFERMARE: se arriviamo, con quali tempi e se c’è un costo di trasferta]. Il lavoro in casa è uguale a quello in città: togliamo la vasca e montiamo la doccia nello stesso spazio. Scrivi il CAP nel modulo e ti diciamo subito se veniamo.' },
      { q: 'Mio padre vive da solo ad Alba e io abito lontano: come si fa il sopralluogo?', a: 'Il tecnico di Venere Bagni va a casa di tuo padre ad Alba, misura il bagno e guarda come entra ed esce dalla vasca. Tu puoi seguire tutto al telefono e fare le tue domande mentre è lì. Il preventivo scritto lo mandiamo anche a te [DA CONFERMARE], così decidete insieme senza fretta.' },
    ],
  },
  {
    slug: 'novara', name: 'Novara', at: 'a Novara', of: 'di Novara', area: 'Provincia di Novara', img: 'luminoso',
    title: 'Vasca in doccia a Novara, Borgomanero e Arona | Venere Bagni',
    description: 'Trasformazione vasca in doccia a Novara, Trecate, Borgomanero e sul lago ad Arona e Orta. Sopralluogo gratuito e preventivo scritto a prezzo fisso.',
    lead: 'Lavoriamo a Novara, nell’Alto Novarese e nei comuni intorno. Il sopralluogo è gratuito, il preventivo è scritto a prezzo fisso e il giorno del lavoro la squadra finisce in 8 ore, chiavi in mano.',
    introTitle: 'Il bagno nella zona di Novara',
    intro: [
      'Il Novarese ha due facce. A sud, intorno a Novara e Trecate, ci sono risaie e paesi di pianura; a nord le colline di Borgomanero e le sponde del Lago Maggiore e del Lago d’Orta, con Arona e Orta San Giulio. In centro ci sono soprattutto condomini, nei paesi case singole.',
      'La vasca è quasi sempre il pezzo più ingombrante del bagno, e con l’età anche il più scomodo. Al suo posto montiamo una doccia, oppure una vasca con sportello per chi al bagno caldo non vuole rinunciare. Il prezzo lo scriviamo prima di cominciare e dall’inizio alla fine parli sempre con la stessa persona.',
    ],
    realData: '[SERVE DATO REALE: come serviamo Novara, da quale sede, tempi di trasferta]',
    facts: [
      ['CAP', 'da 28010 a 28100; Novara città 28100'], // [CAP]
      ['Residenti con 65 anni o più', '25,3%, cioè 92.051 su 364.140 (ISTAT, 1° gennaio 2025), la quota più bassa del Piemonte'], // [ISTAT] lowest of the 8 provinces
      ['Domanda per la legge 13', 'Al Comune dove si trova la casa'], // [RP]
      ['Legge 13, fondi 2025', '18 comuni; i più alti Trecate 32.156,12 €, Borgomanero 14.918,92 €, Novara 13.452,50 €'], // [L13]
    ],
    // [L13] Trecate is the highest in the province; Novara 4.316,10 totali + 9.136,40 parziali. Art. 11 L.13: fabbisogno = domande ammissibili.
    l13: 'In provincia di Novara la quota più alta di legge 13 nel 2025 non è andata al capoluogo ma a Trecate, 32.156,12 €, più del doppio dei 13.452,50 € di Novara. La cifra di ogni Comune dipende da quante domande ammissibili ha raccolto. A Novara due terzi dei fondi, 9.136,40 €, erano per domande di invalidi parziali.',
    towns: [
      ['Novara e Bassa Novarese', 'Novara, Trecate, Galliate, Cameri, Romentino, Cerano'],
      ['Lungo il Ticino', 'Oleggio, Bellinzago Novarese, Borgo Ticino'],
      ['Borgomanero e colline', 'Borgomanero, Gozzano, Gattico-Veruno, Invorio, Suno'],
      ['Laghi', 'Arona, Meina, Castelletto sopra Ticino, Orta San Giulio'],
    ],
    pricesTitle: 'Quanto costa a Novara',
    prices: 'Contano la misura del bagno, il piatto e il gres che scegli per le pareti. La cifra precisa te la scriviamo nel preventivo dopo il sopralluogo gratuito, voce per voce.',
    review: { text: 'Avevo chiesto solo un preventivo. Il tecnico ha preso le misure, mi ha spiegato bene e mi ha lasciato il foglio con la cifra. Poi ci ho pensato con calma.', name: 'Roberto', town: 'Borgomanero' },
    rating: false,
    faqs: [
      { q: 'Lavorate anche sul Lago d’Orta e ad Arona?', a: 'Sì. Venere Bagni lavora nella parte novarese dei laghi: Arona, Meina e Castelletto sopra Ticino sul Lago Maggiore, Orta San Giulio sul Lago d’Orta. Omegna, Stresa e Verbania invece sono nel Verbano-Cusio-Ossola, che ha una pagina sua. Per le case nei centri storici sul lago [DA CONFERMARE: come gestiamo accesso e sosta del furgone].' },
      // Form behaviour: src/scripts/main.js, CAP outside site.capPrefixes -> "non è tra quelli che serviamo oggi" + contact kept.
      { q: 'Abito appena oltre il Ticino, in Lombardia: venite lo stesso?', a: 'Venere Bagni lavora in Piemonte: Novara, Trecate, Galliate e il resto della provincia. Per i comuni lombardi vicini, come Magenta o Vigevano, [DA CONFERMARE: se il cliente ci lavora]. Se scrivi nel modulo un CAP lombardo ti dirà che la zona non è servita, ma puoi lasciare il contatto oppure chiamarci e ne parliamo.' },
      { q: 'Quanto costa sostituire la vasca con la doccia a Novara?', a: 'A Novara Venere Bagni fissa il prezzo del tuo bagno al sopralluogo gratuito e lo scrive nel preventivo voce per voce: demolizione e smaltimento della vasca, impianto e massetto, piatto, gres alle pareti, box e rubinetteria. I materiali sono compresi e la cifra scritta non cambia durante il lavoro. Così puoi confrontarla con altri preventivi.' },
    ],
  },
  {
    slug: 'alessandria', name: 'Alessandria', at: 'ad Alessandria', of: 'di Alessandria', area: 'Provincia di Alessandria', img: 'classico',
    title: 'Vasca in doccia ad Alessandria e provincia | Venere Bagni',
    description: 'Vasca in doccia ad Alessandria, Casale, Tortona, Novi Ligure e Acqui Terme. Sopralluogo gratuito a casa e preventivo scritto a prezzo fisso.',
    lead: 'Lavoriamo ad Alessandria e negli altri centri della provincia, da Casale Monferrato a Novi Ligure. Il sopralluogo è gratuito e il prezzo te lo lasciamo scritto prima di cominciare.',
    introTitle: 'Il bagno nell’Alessandrino',
    intro: [
      // [ISTAT] AL 117.177 / 407.202 = 28,8%; Piemonte 26,9%.
      'La provincia di Alessandria non ha un centro solo. Oltre al capoluogo ci sono Casale Monferrato, Tortona, Novi Ligure, Acqui Terme, Valenza e Ovada, e intorno tanti paesi sulle colline del Monferrato e verso l’Appennino. La quota di anziani è sopra la media: il 28,8% dei residenti ha 65 anni o più, contro il 26,9% del Piemonte.',
      'In città o in collina il lavoro è lo stesso. Al sopralluogo il tecnico guarda dove passa lo scarico e com’è fatto il pavimento, poi ti dice se il piatto può stare a filo o va rialzato di poco. Lo trovi scritto nel preventivo, con il prezzo.',
    ],
    realData: '[SERVE DATO REALE: come serviamo la provincia di Alessandria, da quale sede, tempi e costo di trasferta]',
    facts: [
      ['CAP', 'da 15010 a 15122; Alessandria città 15121 e 15122'], // [CAP]
      ['Residenti con 65 anni o più', '28,8%, cioè 117.177 su 407.202 (ISTAT, 1° gennaio 2025)'], // [ISTAT]
      ['Domanda per la legge 13', 'Al Comune dove si trova la casa'], // [RP]
      ['Legge 13, fondi 2025', '24 comuni; i più alti Alessandria 19.340,78 €, Tortona 11.638,13 €, Valenza 10.932,03 €'], // [L13]
    ],
    // [L13] Alessandria row 11.137,97 totali + 8.202,81 parziali; Cantalupo Ligure, Grondona, Stazzano, Gavi are AL.
    l13: 'Nel 2025 il Comune di Alessandria ha ricevuto 19.340,78 € di legge 13, divisi tra 11.137,97 € per invalidi totali e 8.202,81 € per invalidi parziali. Nella provincia i fondi sono arrivati anche ai paesi dell’Appennino e del Novese: 8.783,42 € a Stazzano, 6.493,99 € a Gavi, cifre più piccole a Grondona e Cantalupo Ligure.',
    towns: [
      ['Alessandria e dintorni', 'Alessandria, Valenza, Felizzano, Frugarolo'],
      ['Casalese', 'Casale Monferrato, Ticineto, Morano sul Po'],
      ['Tortonese', 'Tortona, Castelnuovo Scrivia, Viguzzolo'],
      ['Novese e Val Borbera', 'Novi Ligure, Serravalle Scrivia, Gavi, Arquata Scrivia, Borghetto di Borbera'],
      ['Ovadese e Acquese', 'Ovada, Silvano d’Orba, Acqui Terme, Cartosio'],
    ],
    pricesTitle: 'Quanto costa ad Alessandria',
    prices: 'A Casale o ad Acqui il prezzo si calcola come in città: dipende da misure, piatto e gres [DA CONFERMARE: se la trasferta si paga a parte]. Tutto è scritto nel preventivo dopo il sopralluogo.',
    review: { text: 'Casa di campagna vicino a Casale, il bagno è al piano terra. Il tecnico ha detto subito che il piatto andava alzato un poco per lo scarico e l’ha scritto nel preventivo. Il prezzo poi è rimasto quello.', name: 'Giovanna', town: 'Casale Monferrato' },
    rating: false,
    faqs: [
      { q: 'Venite anche a Casale, Tortona, Novi Ligure e Acqui Terme?', a: 'Sì. Venere Bagni lavora ad Alessandria e negli altri centri della provincia: Casale Monferrato, Tortona, Novi Ligure, Acqui Terme, Valenza e Ovada. Per i paesi di collina e per la Val Borbera [DA CONFERMARE: se arriviamo e con quali tempi]. Scrivi il CAP nel modulo e ti diciamo come organizzare il sopralluogo.' },
      { q: 'In una casa di campagna del Monferrato si può mettere la doccia a filo pavimento?', a: 'Dipende da dove passa lo scarico e da com’è fatto il pavimento. Il tecnico di Venere Bagni lo controlla al sopralluogo gratuito nella tua casa in provincia di Alessandria. Se il piatto a filo non si può fare, ti propone un piatto ribassato e lo trovi scritto nel preventivo, con il prezzo, prima di decidere.' },
      // [L13] Frugarolo, Sezzadio, Cassano Spinola are AL comuni in the 2025 riparto. [RP] rules.
      { q: 'Il contributo della legge 13 arriva anche nei paesi dell’Alessandrino?', a: 'Sì. Nel riparto 2025 la Regione Piemonte ha dato fondi della legge 13 a 24 comuni della provincia, tra cui Alessandria (19.340,78 €) e paesi piccoli come Frugarolo, Sezzadio e Cassano Spinola. La domanda si fa al tuo Comune prima dei lavori. Venere Bagni ti lascia il preventivo con opere e spesa prevista, che servono per compilarla.' },
    ],
  },
  {
    slug: 'asti', name: 'Asti', at: 'ad Asti', of: 'di Asti', area: 'Provincia di Asti', img: 'sopralluogo',
    title: 'Vasca in doccia ad Asti, Canelli e Nizza | Venere Bagni',
    description: 'Trasformazione vasca in doccia ad Asti e provincia, da Villanova d’Asti a Canelli e Nizza Monferrato. Sopralluogo gratuito e preventivo a prezzo fisso.',
    lead: 'Veniamo ad Asti e nei paesi della provincia, dal nord astigiano fino a Canelli e Nizza Monferrato. Misuriamo il bagno gratis e ti lasciamo il prezzo scritto.',
    introTitle: 'Il bagno nell’Astigiano',
    intro: [
      'Fuori da Asti la provincia è fatta di paesi piccoli: le colline del Monferrato a nord, il Roero astigiano intorno a San Damiano, la Valle Belbo con Canelli e Nizza e più a sud la Langa Astigiana.',
      'Il nord astigiano, da Villanova d’Asti a Castelnuovo Don Bosco, è la parte della provincia più vicina a Torino. Lì il sopralluogo si organizza come in cintura [DA CONFERMARE]. Per la Valle Belbo e la Langa Astigiana ti diciamo tempi e condizioni prima di fissarlo.',
    ],
    realData: '[SERVE DATO REALE: tempi di trasferta per Asti città, nord astigiano e Valle Belbo]',
    facts: [
      ['CAP', 'da 14010 a 14100; Asti città 14100'], // [CAP]
      ['Residenti con 65 anni o più', '27,7%, cioè 57.390 su 207.203 (ISTAT, 1° gennaio 2025)'], // [ISTAT]
      ['Domanda per la legge 13', 'Al Comune dove si trova la casa'], // [RP]
      ['Legge 13, fondi 2025', '12 comuni; i più alti Asti 17.778,05 €, Costigliole d’Asti 7.790,70 €, Nizza Monferrato 7.373,42 €'], // [L13]
    ],
    // [L13] AT comuni: Asti, Bubbio, Canelli, Castelnuovo Don Bosco, Cerro Tanaro, Cinaglio, Cisterna d'Asti, Costigliole d'Asti, Frinco, Nizza Monferrato, San Paolo Solbrito, Valfenera.
    l13: 'Nell’Astigiano la legge 13 nel 2025 ha finanziato domande in 12 comuni. Asti ha avuto 17.778,05 €; gli altri sono paesi sparsi in tutta la provincia, da Bubbio in Langa Astigiana a Castelnuovo Don Bosco e Valfenera nel nord, passando per Cisterna d’Asti nel Roero.',
    towns: [
      ['Asti e dintorni', 'Asti, Castell’Alfero, Isola d’Asti, Frinco'],
      ['Nord astigiano', 'Villanova d’Asti, Castelnuovo Don Bosco, Valfenera, Montiglio Monferrato, Cocconato'],
      ['Roero astigiano', 'San Damiano d’Asti, Cisterna d’Asti'],
      ['Valle Belbo', 'Canelli, Nizza Monferrato, Costigliole d’Asti, Incisa Scapaccino'],
      ['Langa Astigiana', 'Roccaverano, Bubbio, Monastero Bormida'],
    ],
    pricesTitle: 'Quanto costa ad Asti',
    prices: 'Il prezzo esatto lo fissiamo dopo aver visto il bagno, insieme al piatto e al gres che scegli per le pareti, e resta quello scritto. Il sopralluogo per vederlo non costa niente.',
    review: { text: 'Ho chiamato per mia zia che abita a Nizza. Il tecnico ha spiegato tutto anche a lei, con calma, e ha lasciato il foglio col prezzo. Lei voleva pensarci, poi ha detto di sì.', name: 'Daniela', town: 'Nizza Monferrato' },
    rating: false,
    faqs: [
      { q: 'Abito nel nord astigiano, vicino a Villanova: chi viene a fare il sopralluogo?', a: 'Viene un tecnico di Venere Bagni, come in città. Villanova d’Asti, Valfenera e Castelnuovo Don Bosco sono la parte della provincia di Asti più vicina a Torino, quindi di solito si trova un giorno in fretta [DA CONFERMARE]. Misura il bagno, ti fa vedere cosa si può montare e ti lascia il preventivo scritto.' },
      { q: 'Arrivate anche a Canelli, Nizza Monferrato e in Langa Astigiana?', a: 'Venere Bagni lavora in tutta la provincia di Asti, Valle Belbo compresa: Canelli, Nizza Monferrato, Costigliole d’Asti. Per i paesi della Langa Astigiana, come Roccaverano o Monastero Bormida, [DA CONFERMARE: se arriviamo e se la trasferta si paga]. Scrivi il CAP nel modulo e ti rispondiamo prima di fissare il sopralluogo.' },
      { q: 'Ad Asti quanto si aspetta tra l’ordine e il giorno del lavoro?', a: 'Da 30 a 60 giorni, in base al materiale da ordinare e al calendario della squadra. Il giorno lo fissiamo quando accetti il preventivo. Quella mattina la squadra di Venere Bagni arriva a casa tua, lavora 8 ore e ti lascia la doccia pronta, chiavi in mano. Se c’è fretta, per esempio dopo una caduta, diccelo al telefono.' },
    ],
  },
  {
    slug: 'biella', name: 'Biella', at: 'a Biella', of: 'di Biella', area: 'Provincia di Biella', img: 'solSicuro',
    title: 'Vasca in doccia a Biella e nel Biellese | Venere Bagni',
    description: 'Trasformazione vasca in doccia a Biella, Cossato, Valdilana e nelle valli del Biellese. Sopralluogo gratuito e preventivo scritto a prezzo fisso.',
    lead: 'Lavoriamo a Biella, in pianura e nelle valli, dalla Valle Cervo a Valdilana. Il sopralluogo è gratuito e il preventivo è scritto a prezzo fisso.',
    introTitle: 'Il bagno nel Biellese',
    intro: [
      // [ISTAT] BI 51.066 / 168.328 = 30,3%, highest of the 8 provinces; Piemonte 26,9%.
      'Il Biellese è la provincia più anziana del Piemonte. Al 1° gennaio 2025 il 30,3% dei residenti aveva 65 anni o più, quasi uno su tre, contro il 26,9% della media regionale. Per chi usa ancora la vasca, al suo posto montiamo una doccia con il piatto a filo pavimento, e se serve con seggiolino e maniglione, scelti nello stesso stile del bagno.',
      // Valdilana: L.R. Piemonte 21 dicembre 2018 n. 29, comune dal 1° gennaio 2019 (tuttitalia.it/variazioni-amministrative/nuovo-comune-di-valdilana/).
      'Fuori città molti abitano in paesi di valle: la Valle Cervo, la Valle Elvo, la Valsessera e la zona di Valdilana, il comune nato nel 2019 da Mosso, Soprana, Trivero e Valle Mosso, dove ci sono ancora i lanifici. Per portare via la vasca e scaricare il materiale [DA CONFERMARE: cosa serve davanti a casa per il furgone].',
    ],
    realData: '[SERVE DATO REALE: come serviamo il Biellese, da quale sede, tempi di trasferta]',
    facts: [
      ['CAP', 'da 13811 a 13900; Biella città 13900'], // [CAP]
      ['Residenti con 65 anni o più', '30,3%, cioè 51.066 su 168.328 (ISTAT, 1° gennaio 2025), la quota più alta del Piemonte'], // [ISTAT]
      ['Domanda per la legge 13', 'Al Comune dove si trova la casa'], // [RP]
      ['Legge 13, fondi 2025', '16 comuni; i più alti Biella 33.016,73 €, Vigliano Biellese 18.814,93 €, Cossato 14.509,89 €'], // [L13]
    ],
    // [L13] BI comuni incl. Ronco Biellese and Vigliano Biellese. Miagliano, Portula, Tollegno are BI.
    l13: 'Tra i capoluoghi di provincia, nel 2025 Biella è stato il secondo per fondi della legge 13 dopo Torino: 33.016,73 €, più di Cuneo, Alessandria o Asti. In provincia i fondi sono andati ad altri 15 comuni, da Vigliano Biellese e Cossato fino a paesi piccoli come Miagliano, Portula e Tollegno.',
    towns: [
      ['Biella e dintorni', 'Biella, Candelo, Gaglianico, Ponderano, Vigliano Biellese'],
      ['Cossatese', 'Cossato, Lessona, Valdengo'],
      ['Valle Cervo e Valle Elvo', 'Andorno Micca, Tollegno, Miagliano, Mongrando, Sordevolo'],
      ['Valdilana e Valsessera', 'Valdilana, Pray, Coggiola'],
      ['Serra e lago di Viverone', 'Cavaglià, Viverone, Dorzano'],
    ],
    pricesTitle: 'Quanto costa a Biella',
    prices: 'La cifra cambia se aggiungi seggiolino, maniglioni o un piatto a filo pavimento. La vedi scritta nel preventivo dopo il sopralluogo, insieme a tutto quello che il lavoro comprende.',
    review: { text: 'Abito in Valle Cervo e la strada per casa è stretta, avevo paura che col furgone non ci arrivassero. Sono arrivati, hanno lasciato il furgone giù e portato su tutto a mano.', name: 'Piero', town: 'Andorno Micca' },
    rating: false,
    faqs: [
      { q: 'Venite anche in Valle Cervo, in Valsessera e a Valdilana?', a: 'Venere Bagni lavora a Biella e in provincia, valli comprese. Per i paesi più in alto della Valle Cervo, della Valsessera e di Valdilana [DA CONFERMARE: se arriviamo, con che tempi e se la trasferta si paga]. Scrivi il CAP nel modulo: prima di fissare il sopralluogo ti diciamo se possiamo venire. Anche in valle il tecnico misura il bagno a casa tua e ti lascia il preventivo scritto.' },
      // [L13] art. 10 c. 4 L. 13/1989 as quoted in D.D. 1299; Biella row 29.520,02 totali + 3.496,71 parziali.
      { q: 'Chi ha la precedenza per il contributo della legge 13 a Biella?', a: 'Quando i fondi non bastano per tutti, la legge 13 fa passare prima le domande di chi ha un’invalidità al 100%. Le altre restano valide per gli anni successivi. Nel 2025 dei 33.016,73 € arrivati al Comune di Biella, 29.520,02 € erano per invalidi totali. La domanda va presentata prima dei lavori, e il preventivo di Venere Bagni serve a compilarla.' },
      // Valdilana: fusion 1° gennaio 2019; [L13] Valdilana 2.751,98 €.
      { q: 'La casa è in una frazione che era di Trivero: a quale Comune va la domanda?', a: 'Dal 1° gennaio 2019 Mosso, Soprana, Trivero e Valle Mosso sono un comune solo, Valdilana. La domanda per la legge 13 quindi va al Comune di Valdilana, che nel 2025 ha avuto 2.751,98 € di fondi. Per il sopralluogo di Venere Bagni non cambia niente: nel modulo scrivi il CAP di casa.' },
    ],
  },
  {
    slug: 'vercelli', name: 'Vercelli', at: 'a Vercelli', of: 'di Vercelli', area: 'Provincia di Vercelli', img: 'ba3d',
    title: 'Vasca in doccia a Vercelli e in Valsesia | Venere Bagni',
    description: 'Trasformazione vasca in doccia a Vercelli, Santhià, Trino, Borgosesia e Varallo. Sopralluogo gratuito a casa e preventivo scritto a prezzo fisso.',
    lead: 'Lavoriamo a Vercelli, nei paesi delle risaie e in Valsesia. Veniamo a misurare il bagno senza costi e ti lasciamo il prezzo scritto.',
    introTitle: 'Il bagno nel Vercellese e in Valsesia',
    intro: [
      'La provincia di Vercelli va dalla pianura del riso al Monte Rosa. Intorno al capoluogo, a Santhià e a Trino ci sono paesi di pianura e cascine. A nord, lungo il Sesia, la Valsesia sale da Borgosesia e Varallo fino ad Alagna.',
      'Che la casa sia in città, in una cascina o in un paese della valle, al posto della vasca va una doccia nuova, con le pareti nel gres che scegli. Cambiano i tempi di trasferta, e te li diciamo prima del sopralluogo.',
    ],
    realData: '[SERVE DATO REALE: come serviamo Vercelli e la Valsesia, da quale sede, tempi di trasferta]',
    facts: [
      ['CAP', 'da 13010 a 13100; Vercelli città 13100'], // [CAP]
      ['Residenti con 65 anni o più', '28,3%, cioè 46.898 su 165.910 (ISTAT, 1° gennaio 2025)'], // [ISTAT]
      ['Domanda per la legge 13', 'Al Comune dove si trova la casa'], // [RP]
      ['Legge 13, fondi 2025', '10 comuni; i più alti Vercelli 14.543,95 €, Scopa 5.732,45 €, Borgo Vercelli 5.308,99 €'], // [L13]
    ],
    // [L13] VC comuni: Borgo d'Ale, Borgo Vercelli, Cigliano, Gattinara, Livorno Ferraris, San Germano Vercellese, Scopa, Serravalle Sesia, Trino, Vercelli.
    l13: 'Nel Vercellese i fondi 2025 della legge 13 sono andati a 10 comuni. Vercelli da sola ha avuto 14.543,95 €, gli altri sono divisi tra la pianura, con Borgo Vercelli, San Germano e Livorno Ferraris, e la Valsesia, dove il comune con la quota più alta è Scopa con 5.732,45 €.',
    towns: [
      ['Vercelli e pianura', 'Vercelli, Borgo Vercelli, Santhià, San Germano Vercellese, Livorno Ferraris'],
      ['Trinese e Crescentinese', 'Trino, Crescentino'],
      ['Vercellese ovest', 'Cigliano, Borgo d’Ale'],
      ['Gattinara e bassa Valsesia', 'Gattinara, Serravalle Sesia, Borgosesia, Quarona'],
      ['Alta Valsesia', 'Varallo, Scopa, Alagna Valsesia'],
    ],
    pricesTitle: 'Quanto costa a Vercelli',
    prices: 'Il totale dipende dal bagno e dalle finiture che scegli. Per la Valsesia [DA CONFERMARE: se la trasferta cambia il prezzo]. Lo trovi nel preventivo scritto dopo il sopralluogo, e resta quello.',
    review: { text: 'Abitiamo in una cascina fuori Trino. Il furgone è entrato in cortile senza problemi, nel pomeriggio avevano finito e la sera la doccia l’abbiamo già usata.', name: 'Carla', town: 'Trino' },
    rating: false,
    faqs: [
      { q: 'Arrivate in Valsesia, fino a Varallo e Alagna?', a: 'Venere Bagni lavora in tutta la provincia di Vercelli, Valsesia compresa: Gattinara, Borgosesia, Quarona e Varallo. Per l’alta valle, fino ad Alagna Valsesia, [DA CONFERMARE: se arriviamo, con che tempi e se la trasferta si paga]. In una casa di montagna il lavoro è lo stesso che in pianura: la vasca esce e la doccia va nello stesso spazio. Dal CAP che scrivi nel modulo vediamo dove abiti, e la risposta arriva prima del sopralluogo.' },
      // Biella province: d.lgs. 6 marzo 1992 n. 248, split from Vercelli (normattiva.it); [CAP] ranges; form prefix '13'.
      { q: 'I CAP di Vercelli e di Biella si somigliano: venite in tutte e due le province?', a: 'Sì. Venere Bagni lavora sia in provincia di Vercelli, CAP da 13010 a 13100, sia nel Biellese, CAP da 13811 a 13900. Fino al 1992 il Biellese faceva parte della provincia di Vercelli, per questo i CAP iniziano tutti con 13. Nel modulo scrivi il tuo e il sistema riconosce la zona.' },
      { q: 'Mia madre a Vercelli è caduta uscendo dalla vasca: quanto prima si può fare il lavoro?', a: 'Diccelo al telefono quando chiami: per Vercelli cerchiamo il primo giorno libero per il sopralluogo. Il tecnico di Venere Bagni misura il bagno, guarda come tua madre si muove e ti lascia il preventivo. Tra l’ordine e il lavoro passano da 30 a 60 giorni [DA CONFERMARE: se dopo una caduta si può anticipare]. Il lavoro dura 8 ore e la sera tua madre ha già la doccia.' },
    ],
  },
  {
    slug: 'verbano-cusio-ossola', name: 'Verbano-Cusio-Ossola', at: 'nel Verbano-Cusio-Ossola', of: 'del Verbano-Cusio-Ossola',
    area: 'Provincia del Verbano-Cusio-Ossola', eyebrow: 'Verbania, Omegna, Domodossola', img: 'solDoccia',
    title: 'Vasca in doccia a Verbania, Omegna e Ossola | Venere Bagni',
    description: 'Trasformazione vasca in doccia a Verbania, Stresa, Omegna e Domodossola. Sopralluogo gratuito a casa e preventivo scritto a prezzo fisso.',
    lead: 'Lavoriamo sul Lago Maggiore, nel Cusio e in Ossola. Il sopralluogo è gratuito e il prezzo te lo scriviamo prima di cominciare.',
    introTitle: 'Il bagno tra lago e montagna',
    intro: [
      // d.lgs. 30 aprile 1992 n. 277 (normattiva.it), split from the provincia di Novara; [CAP] VB 28801-28925.
      'Il Verbano-Cusio-Ossola comprende la sponda del Lago Maggiore da Stresa a Cannobio, la punta nord del Lago d’Orta con Omegna e le valli dell’Ossola intorno a Domodossola. Fino al 1992 era provincia di Novara, e per questo i CAP iniziano con 28 come quelli novaresi.',
      // [ISTAT] VB 44.061 / 153.283 = 28,7%.
      'Il 28,7% dei residenti ha 65 anni o più. Se la casa è in un paese di montagna o in un centro storico sul lago, prima del sopralluogo ti chiediamo al telefono come si arriva e dove si può fermare il furgone [DA CONFERMARE].',
    ],
    realData: '[SERVE DATO REALE: come serviamo il VCO, da quale sede, tempi e costo di trasferta]',
    facts: [
      ['CAP', 'da 28801 a 28925; Verbania da 28921 a 28925'], // [CAP]
      ['Residenti con 65 anni o più', '28,7%, cioè 44.061 su 153.283 (ISTAT, 1° gennaio 2025)'], // [ISTAT]
      ['Domanda per la legge 13', 'Al Comune dove si trova la casa'], // [RP]
      ['Legge 13, fondi 2025', '15 comuni; i più alti Arizzano 14.560,47 €, Baveno 13.488,57 €, Vogogna 11.782,16 €'], // [L13]
    ],
    // [L13] VB: Arizzano is the highest; Domodossola 6.205,15; Verbania does not appear in allegato A (grep, 2026-11-10).
    l13: 'Nel VCO la quota più alta di legge 13 nel 2025 è andata ad Arizzano, sopra Verbania, con 14.560,47 €. In Ossola Vogogna ha avuto 11.782,16 €, quasi il doppio di Domodossola (6.205,15 €), mentre Verbania nell’elenco 2025 non c’è.',
    towns: [
      ['Verbano', 'Verbania, Stresa, Baveno, Ghiffa, Cannobio'],
      ['Cusio', 'Omegna, Gravellona Toce, Casale Corte Cerro, Valstrona'],
      ['Domodossola e bassa Ossola', 'Domodossola, Villadossola, Crevoladossola, Vogogna, Piedimulera'],
      ['Valli dell’Ossola', 'Santa Maria Maggiore (Val Vigezzo), Macugnaga (Valle Anzasca), Formazza'],
    ],
    pricesTitle: 'Quanto costa nel Verbano-Cusio-Ossola',
    prices: 'Misure, piatto, gres e box li fissiamo al sopralluogo, sul lago come in valle, e il totale lo scriviamo nel preventivo. Nelle valli più lontane [DA CONFERMARE: se c’è un costo di trasferta].',
    review: { text: 'Bagno piccolo, secondo piano senza ascensore. La vasca vecchia l’hanno portata giù a pezzi per le scale. Ci stava solo un piatto da 70 ma va bene così.', name: 'Sergio', town: 'Omegna' },
    rating: false,
    faqs: [
      { q: 'Venite anche in Val Vigezzo, a Macugnaga o a Formazza?', a: 'Venere Bagni lavora in tutto il Verbano-Cusio-Ossola. Per le valli dell’Ossola più in alto, come Val Vigezzo, Valle Anzasca e Val Formazza, [DA CONFERMARE: se arriviamo e se la trasferta si paga]. Scrivi il CAP nel modulo: te lo diciamo prima di fissare il sopralluogo. Per il resto funziona come sul lago: misure a casa tua, soluzioni possibili e preventivo scritto a prezzo fisso.' },
      { q: 'Abito nel centro di Stresa o di Cannobio, con vie strette: si può fare?', a: 'Di solito sì: la vasca vecchia esce a pezzi e il materiale nuovo entra a mano [DA CONFERMARE]. Prima del sopralluogo Venere Bagni ti chiede come si arriva a casa e dove può fermarsi il furgone, così il giorno del lavoro sappiamo già come muoverci. Per un eventuale permesso di sosta [DA CONFERMARE: chi lo chiede al Comune].' },
      // [RP]: the person with disability must reside in the property, or move residence there before receiving the contribution.
      { q: 'La casa sul lago non è quella di residenza: vale la legge 13?', a: 'Per il contributo della legge 13 chi ha la disabilità deve avere la residenza nella casa dei lavori, o trasferirla lì prima di ricevere i soldi. Per una casa a Verbania o a Baveno usata solo d’estate quindi di solito non vale. Venere Bagni può fare lo stesso il lavoro, e il preventivo scritto ti serve per valutare le detrazioni con il commercialista.' },
    ],
  },
];
