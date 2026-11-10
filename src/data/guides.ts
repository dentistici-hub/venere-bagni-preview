// Guides (/guide/<slug>/): metadata used by the guide index, the "Da leggere" blocks on service and
// area page, Article schema, llms.txt and the sitemap dates. Article text is in src/pages/guide/<slug>.astro.
import { PAGE_UPDATED } from './dates.mjs';

export interface Guide {
  slug: string;
  title: string; // full <title>, max 60 characters
  description: string; // meta description, max 155 characters
  h1: string;
  card: string; // one line for the guide index and the related-guide blocks
  answer: string; // short answer box at the top of the article (40-60 words), also in llms-full.txt
  img: string; // key in src/data/media.ts (hero image and OG image source)
  published: string; // YYYY-MM-DD
}

const g = (x: Guide) => x;
export const guides = [
  g({
    slug: 'doccia-a-norma-dm-236-detrazione',
    title: 'Doccia a norma DM 236 e detrazione | Venere Bagni',
    description: 'Le tre cose che il DM 236/1989 chiede alla doccia, quando la vasca in doccia rientra nella detrazione 50% o 36% nel 2026 e quali documenti tenere.',
    h1: 'Doccia a norma DM 236: cosa serve per la detrazione',
    card: 'Quando la doccia al posto della vasca rientra nella detrazione del 50% o del 36%, e cosa chiede il decreto.',
    answer: 'Nel 2026 la doccia messa al posto della vasca può rientrare nella detrazione per ristrutturazione se rispetta il DM 236 del 1989: doccia a pavimento, sedile ribaltabile e doccia a telefono. Recuperi il 50% se è la casa dove abiti e ne sei proprietario, il 36% negli altri casi. Non servono un’età minima o una disabilità. [DA CONFERMARE CON IL COMMERCIALISTA]',
    img: 'hero',
    published: '2026-11-10',
  }),
  g({
    slug: 'piatto-doccia-filo-pavimento-o-ribassato',
    title: 'Piatto doccia filo pavimento o ribassato? | Venere Bagni',
    description: 'Differenze tra piatto doccia a filo pavimento e ribassato: scalino, scarico, uso con sedia o deambulatore, pulizia e detrazione. Come si decide.',
    h1: 'Piatto doccia a filo pavimento o ribassato: quale scegliere',
    card: 'Scalino, scarico, sedia da doccia: come si sceglie il piatto quando togli la vasca.',
    answer: 'Il piatto a filo pavimento non ha scalino, quindi ci entri anche con una sedia da doccia o un deambulatore. Costa di più e chiede spazio sotto il pavimento per lo scarico. Il piatto ribassato ha un bordo basso e di solito si collega allo scarico della vasca. Se in casa qualcuno ha problemi di equilibrio, scegli il filo pavimento.',
    img: 'solDoccia',
    published: '2026-11-10',
  }),
  g({
    slug: 'giorno-trasformazione-vasca-in-doccia',
    title: 'Il giorno della vasca in doccia, ora per ora | Venere Bagni',
    description: 'Le 8 ore in cui togliamo la vasca e montiamo la doccia, chiavi in mano: orari, cosa preparare, rumore, condominio e quando usi la doccia nuova.',
    h1: 'Cosa succede il giorno della trasformazione vasca in doccia',
    card: 'Le 8 ore di lavoro una dopo l’altra, cosa preparare prima e quando puoi usare la doccia.',
    answer: 'Il lavoro dura 8 ore ed è chiavi in mano, con i materiali compresi. La squadra arriva la mattina, demolisce la vasca e la porta via, rifà impianto e massetto, posa il piatto, riveste le pareti in gres e monta box e rubinetteria. Alla fine pulisce, prova l’acqua e ti consegna la doccia, che la sera puoi già usare.',
    img: 'coppia',
    published: '2026-11-10',
  }),
];

export const guideBySlug = (s: string) => guides.find((x) => x.slug === s)!;
export const guideUpdated = (s: string) => (PAGE_UPDATED as Record<string, string>)[`/guide/${s}/`] || guideBySlug(s).published;
const mesi = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
// "Aggiornato a novembre 2026" from a YYYY-MM-DD date.
export const updatedLabel = (d: string) => `Aggiornato a ${mesi[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`;
