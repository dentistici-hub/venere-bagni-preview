// PLACEHOLDER PHOTOS for the client preview only: taken from international market leaders' sites
// (Bath Fitter, Re-Bath) as visual examples. They must ALL be replaced with Venere Bagni's own photos
// before the site goes live. Alt texts describe what is visible, in Italian (screen readers, AI crawlers).
import heroDoccia from '../assets/media/hero-doccia-sicura.jpg';
import prima1 from '../assets/media/prima-1.jpg';
import dopo1 from '../assets/media/dopo-1.jpg';
import prima2 from '../assets/media/prima-2.jpg';
import dopo2 from '../assets/media/dopo-2.jpg';
import prima3 from '../assets/media/prima-3.jpg';
import dopo3 from '../assets/media/dopo-3.jpg';
import solDoccia from '../assets/media/soluzione-doccia.jpg';
import solSportello from '../assets/media/soluzione-sportello.jpg';
import solSicuro from '../assets/media/soluzione-sicuro.jpg';
import sopralluogo from '../assets/media/sopralluogo.jpg';
import coppia from '../assets/media/coppia-bagno.jpg';
import luminoso from '../assets/media/bagno-luminoso.jpg';
import classico from '../assets/media/bagno-classico.jpg';
import famiglia from '../assets/media/famiglia-bagno.jpg';

export interface Img { src: ImageMetadata; alt: string }

export const media: Record<string, Img> = {
  hero: { src: heroDoccia, alt: 'Doccia bianca a filo pavimento con seggiolino ribaltabile, maniglione e soffione regolabile, al posto della vecchia vasca' },
  prima1: { src: prima1, alt: 'Prima: vasca da bagno con tenda in un bagno dalle pareti azzurre' },
  dopo1: { src: dopo1, alt: 'Dopo: doccia con pareti effetto marmo e porta in vetro al posto della vasca' },
  prima2: { src: prima2, alt: 'Prima: vasca bianca con piastrelle, prima del lavoro' },
  dopo2: { src: dopo2, alt: 'Dopo: doccia con porta scorrevole nera, maniglione e seggiolino' },
  prima3: { src: prima3, alt: 'Prima: vasca tradizionale con rivestimento effetto marmo' },
  dopo3: { src: dopo3, alt: 'Dopo: vasca con sportello e doccia, con ingresso basso' },
  solDoccia: { src: solDoccia, alt: 'Doccia in vetro con pareti grigie e piatto a filo pavimento' },
  solSportello: { src: solSportello, alt: 'Vasca con sportello laterale per entrare senza scavalcare il bordo' },
  solSicuro: { src: solSicuro, alt: 'Bagno luminoso con doccia accessibile e superfici facili da pulire' },
  sopralluogo: { src: sopralluogo, alt: 'Tecnico che mostra le finiture a una coppia durante il sopralluogo a casa' },
  coppia: { src: coppia, alt: 'Coppia che guarda soddisfatta la nuova doccia appena installata' },
  luminoso: { src: luminoso, alt: 'Bagno bianco luminoso con doccia in vetro e mobile lavabo' },
  classico: { src: classico, alt: 'Bagno con mobile in legno chiaro, doccia e pavimento a spina di pesce' },
  famiglia: { src: famiglia, alt: 'Madre e figlio adulto nel bagno appena rinnovato' },
};
