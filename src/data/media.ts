// PLACEHOLDER PHOTOS for the client preview only: taken from international market leaders' sites
// (Bath Fitter, Re-Bath) as visual examples. They must ALL be replaced with Venere Bagni's own photos
// before the site goes live. Alt texts describe what is visible, in Italian (screen readers, AI crawlers).
import heroDoccia from '../assets/media/hero-doccia-design.jpg';
import heroSicuro from '../assets/media/hero-doccia-sicura.jpg';
// Design placeholders (Pexels, free licence; sources in _ba-sources.md). pietra and legno are 3D renders.
import stileMarmo from '../assets/media/stile-marmo.jpg';
import stilePietra from '../assets/media/stile-pietra.jpg';
import stileLegno from '../assets/media/stile-legno.jpg';
import stileMinimal from '../assets/media/stile-minimal.jpg';
import docciaModerna from '../assets/media/doccia-moderna.jpg';
// Real jobs sent by the client (2026-11-11), cropped 3:4, metadata stripped.
import lavAp from '../assets/media/lavori/a-prima.jpg';
import lavAd from '../assets/media/lavori/a-dopo.jpg';
import lavBp from '../assets/media/lavori/b-prima.jpg';
import lavBd from '../assets/media/lavori/b-dopo.jpg';
import lavCp from '../assets/media/lavori/c-prima.jpg';
import lavCd from '../assets/media/lavori/c-dopo.jpg';
import lavDp from '../assets/media/lavori/d-prima.jpg';
import lavDd from '../assets/media/lavori/d-dopo.jpg';
import stileCementine from '../assets/media/lavori/stile-cementine.jpg';
import ba1p from '../assets/media/ba1-prima.jpg';
import ba1d from '../assets/media/ba1-dopo.jpg';
import ba2p from '../assets/media/ba2-prima.jpg';
import ba2d from '../assets/media/ba2-dopo.jpg';
import ba3p from '../assets/media/ba3-prima.jpg';
import ba3d from '../assets/media/ba3-dopo.jpg';
import ba4p from '../assets/media/ba4-prima.jpg';
import ba4d from '../assets/media/ba4-dopo.jpg';
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
  hero: { src: heroDoccia, alt: 'Doccia in vetro con pareti in gres effetto marmo, pavimento a mosaico esagonale e soffione a pioggia' },
  heroSicuro: { src: heroSicuro, alt: 'Doccia bianca a filo pavimento con seggiolino ribaltabile, maniglione e soffione regolabile, al posto della vecchia vasca' },
  stileMarmo: { src: stileMarmo, alt: 'Doccia con pareti in gres effetto marmo bianco venato e rubinetteria nera opaca' },
  stilePietra: { src: stilePietra, alt: 'Doccia walk-in con pareti effetto pietra grigia, vetro con profilo nero e rubinetteria nera' },
  stileLegno: { src: stileLegno, alt: 'Doccia con parete in gres effetto legno, vetro con profilo nero e soffione a pioggia nero' },
  stileMinimal: { src: stileMinimal, alt: 'Doccia minimal con lastre bianche di grande formato e colonna doccia nera opaca' },
  lavAp: { src: lavAp, alt: 'Prima: vasca in muratura con piastrelle a fiori blu, pavimento blu e tenda da doccia' },
  lavAd: { src: lavAd, alt: 'Dopo: doccia con pareti e piatto effetto marmo, box in vetro e colonna doccia con soffione' },
  lavBp: { src: lavBp, alt: 'Prima: bagno con piastrelle chiare, sanitari a terra, vasca e muri rovinati sopra la finestra' },
  lavBd: { src: lavBd, alt: 'Dopo: bagno in gres effetto cemento, sanitari sospesi, pavimento scuro e fascia di cementine' },
  lavCp: { src: lavCp, alt: 'Prima: vecchio box doccia in plastica con piastrelle chiare e muffa sul soffitto' },
  lavCd: { src: lavCd, alt: 'Dopo: doccia con vetro fumé, profili neri, soffione a pioggia e cementine sulla parete' },
  lavDp: { src: lavDp, alt: 'Prima: lavabo con tenda, pensili in legno e lavatrice dietro una tenda colorata' },
  lavDd: { src: lavDd, alt: 'Dopo: mobile sospeso con lavabo largo, vani a giorno e specchio contenitore' },
  stileCementine: { src: stileCementine, alt: 'Bagno rifatto con gres effetto cemento, cementine colorate, mobile sospeso e scaldasalviette bianco' },
  docciaModerna: { src: docciaModerna, alt: 'Doccia in vetro con parete in piastrelle antracite lucide e rubinetteria nera opaca' },
  // Real before/after pairs (Re-Bath US gallery, placeholders only: replace with the client's own jobs).
  ba1p: { src: ba1p, alt: 'Prima: bagno con vasca da incasso, tenda doccia e piastrelle beige' },
  ba1d: { src: ba1d, alt: 'Dopo: stesso bagno con doccia a piatto basso, panca e rivestimento grigio' },
  ba2p: { src: ba2p, alt: 'Prima: bagno con vasca bianca sotto una finestra ad arco' },
  ba2d: { src: ba2d, alt: 'Dopo: stesso bagno con doccia chiusa da porta scorrevole in vetro, maniglioni e piatto a mosaico' },
  ba3p: { src: ba3p, alt: 'Prima: bagno con vasca, piastrelle bianche e anta in vetro satinato' },
  ba3d: { src: ba3d, alt: 'Dopo: stesso bagno con doccia, porta scorrevole in vetro e pareti effetto marmo' },
  ba4p: { src: ba4p, alt: 'Prima: bagno piccolo con vasca e tenda doccia, piastrelle bianche' },
  ba4d: { src: ba4d, alt: 'Dopo: stesso bagno con doccia walk-in, vetro fisso e piatto a filo pavimento' },
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
