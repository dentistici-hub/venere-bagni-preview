// FAQ groups of /domande-frequenti/, also used by llms-full.txt. The bonus group comes from bonus.ts.
import { site } from './site';
import { bonusFaq } from './bonus';
import type { Faq } from '../lib/schema';

export const faqGroups: { id: string; title: string; items: Faq[] }[] = [
  { id: 'lavori', title: 'Lavori', items: [
    { q: 'Cosa significa trasformare la vasca in doccia?', a: 'Significa togliere la vasca e fare una doccia nello stesso spazio. Venere Bagni demolisce e smaltisce la vasca, rifà l’impianto idraulico della doccia e il massetto, posa il piatto, riveste le pareti con gres porcellanato nuovo e monta box e rubinetteria. Si lavora solo dove c’era la vasca: il resto della stanza resta com’è.' },
    { q: 'Devo togliere le piastrelle?', a: 'Fuori dallo spazio della vasca di solito le piastrelle restano. Nella zona della doccia invece Venere Bagni riveste le pareti con gres porcellanato nuovo, compreso nel lavoro, e prima rifà massetto e impianto. Cosa succede nel tuo bagno, e fin dove arriva il rivestimento, te lo diciamo al sopralluogo e lo trovi scritto nel preventivo.' },
    { q: 'Si può fare in un condominio?', a: 'Sì. Il lavoro riguarda solo l’interno del tuo appartamento. Se serve, Venere Bagni avvisa l’amministratore, e durante il lavoro protegge scale e ascensore.' },
    { q: 'Cosa succede ai miei mobili e ai miei pavimenti?', a: 'Venere Bagni copre i pavimenti con teli e cartoni dalla porta di casa fino al bagno. A te chiediamo solo di togliere le tue cose dal bagno e di liberare il corridoio. A fine lavoro puliamo e portiamo via le macerie.' },
  ] },
  { id: 'prezzi', title: 'Prezzi', items: [
    { q: 'Quanto costa trasformare la vasca in doccia?', a: 'Il prezzo cambia da bagno a bagno: dipende dalla misura, dal tipo di piatto, dal gres e dal box. Per questo Venere Bagni non pubblica un listino e te lo scrive nel preventivo dopo il sopralluogo gratuito, a prezzo fisso. Il lavoro è chiavi in mano e comprende sempre vasca tolta e smaltita, impianto, massetto, piatto, box, rubinetteria, gres, finiture e materiali.' },
    { q: 'Il prezzo del preventivo può cambiare?', a: 'No. Venere Bagni lavora a prezzo fisso. Se salta fuori un problema nascosto, come uno scarico danneggiato, ti spieghiamo cosa succede e decidiamo insieme l’eventuale costo prima di intervenire.' },
    { q: 'Si può pagare a rate?', a: '[DA CONFERMARE: finanziamento disponibile?] Con Venere Bagni puoi pagare a rate tramite [SOCIETÀ DI FINANZIAMENTO]. Le condizioni le definiamo al sopralluogo e le scriviamo nel preventivo.' },
  ] },
  { id: 'tempi', title: 'Tempi', items: [
    { q: 'Quanto dura il lavoro?', a: 'La trasformazione della vasca in doccia con Venere Bagni dura 8 ore ed è chiavi in mano. In quelle ore togliamo e smaltiamo la vasca, rifacciamo impianto e massetto, posiamo il piatto, rivestiamo le pareti in gres e montiamo box e rubinetteria, con i materiali che portiamo noi. La sera la doccia si può già usare. Se serve un piatto a filo pavimento con lo scarico da rifare, i tempi te li scriviamo nel preventivo.' },
    { q: 'Tra la richiesta e il lavoro quanto devo aspettare?', a: 'Ti rispondiamo entro [X ORE] e il sopralluogo di solito si fa entro [X GIORNI]. Dal giorno in cui ordini il lavoro, firmando il preventivo, passano da 30 a 60 giorni prima che la squadra venga a casa tua. Se c’è fretta, per esempio dopo una caduta, diccelo subito al telefono.' },
    { q: 'Posso usare il bagno durante il lavoro?', a: 'No, nelle 8 ore del lavoro il bagno resta chiuso. Se in casa ne hai un secondo, nessun problema. Se no, ne parliamo al sopralluogo e troviamo insieme la soluzione più comoda per te.' },
  ] },
  { id: 'sicurezza', title: 'Sicurezza', items: [
    { q: 'La doccia nuova è più sicura della vasca?', a: 'Per chi fa fatica a muoversi, sì. Il piatto doccia a filo pavimento di Venere Bagni non ha un bordo da scavalcare e ha il fondo antiscivolo. Si possono aggiungere maniglioni e seggiolino, che riducono molto il rischio di cadere.' },
    { q: 'Il piatto è scivoloso?', a: 'Il piatto doccia di Venere Bagni ha una superficie antiscivolo [DA CONFERMARE: classe di antiscivolo del catalogo] che fa presa anche con acqua e sapone. Si pulisce con un panno.' },
    { q: 'Si può usare con la sedia da doccia o il deambulatore?', a: 'Con il piatto a filo pavimento sì, perché non c’è lo scalino. Al sopralluogo Venere Bagni misura la larghezza del passaggio e ti dice se la sedia o il deambulatore ci passano comodi.' },
  ] },
  { id: 'sopralluogo', title: 'Sopralluogo', items: [
    { q: 'Il sopralluogo è gratuito davvero?', a: 'Sì. Il sopralluogo di Venere Bagni è gratuito e non ti impegna. Un tecnico viene a casa tua, misura il bagno e ti lascia il preventivo scritto. Se non lo accetti, non paghi niente.' },
    { q: 'Quanto dura il sopralluogo e chi viene?', a: 'Dura circa [DURATA] minuti. Viene un tecnico di Venere Bagni [DA CONFERMARE: nome e ruolo], che poi segue il tuo lavoro fino alla fine. Se vuoi, può esserci anche un familiare.' },
    { q: 'Se non compro, mi richiamate in continuazione?', a: 'No. Dopo il sopralluogo ti lasciamo il preventivo e il tempo per pensarci. Se sei d’accordo ti chiamiamo una volta, per sapere se hai domande, e poi decidi tu.' },
  ] },
  { id: 'garanzia', title: 'Garanzia', items: [
    { q: 'Che garanzia date sul lavoro?', a: 'Su materiali e manodopera hai 2 anni di garanzia, quella prevista dalla legge. Se in quel periodo c’è un difetto di montaggio o una perdita, torniamo a sistemarlo e tu non paghi niente [DA CONFERMARE: condizioni]. Per qualsiasi problema chiami la stessa persona che ti ha seguito dal sopralluogo.' },
    { q: 'A chi mi rivolgo se ho un problema dopo il lavoro?', a: `Alla stessa persona che ti ha seguito dall’inizio: il tuo referente di Venere Bagni ha il tuo numero e tu hai il suo. Puoi anche chiamare il ${site.phone} o scrivere su WhatsApp al ${site.whatsappLabel} [DA CONFERMARE: tempi di intervento in garanzia].` },
  ] },
  { id: 'bonus', title: 'Bonus e detrazioni', items: bonusFaq },
];
