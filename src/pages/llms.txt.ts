// llms.txt (llmstxt.org format): short map of the site for AI assistants, built from the site data so links,
// contacts and prices always match the pages. Contact lines appear only once the value in site.ts is real.
// The long plain-text version is /llms-full.txt.
import type { APIRoute } from 'astro';
import { site, filled } from '../data/site';
import { zonePages } from '../data/zone-pages';
import { guides } from '../data/guides';
import { abs } from '../lib/schema';
import { llm, plain } from '../lib/txt';

export const GET: APIRoute = () => {
  const L: string[] = [];
  const contact = [
    filled(site.phone) && `telefono ${site.phone}`,
    filled(site.whatsappLabel) && `WhatsApp ${site.whatsappLabel}`,
    filled(site.email) && `email ${site.email}`,
    site.openingHours.length && `orari ${site.hours}`,
    filled(site.street) && `sede ${site.street}${filled(site.postalCode) ? `, ${site.postalCode}` : ''} ${site.locality}`,
  ].filter(Boolean).join(', ');

  L.push(`# ${site.brand}`, '');
  L.push(`> ${site.brand} (${site.legalName}) toglie la vasca da bagno e monta al suo posto una doccia, con un lavoro chiavi in mano di 8 ore e i materiali compresi, a Torino, nella sua provincia e nel resto del Piemonte. Installa anche vasche con sportello e adatta il bagno per persone anziane: doccia a filo pavimento, maniglioni, seggiolino ribaltabile. Il sopralluogo a casa è gratuito e il preventivo è scritto, a prezzo fisso. I prezzi non sono pubblicati: dipendono dal bagno e si fissano nel preventivo.`, '');
  L.push(`Zone servite: Torino e tutto il Piemonte. Zona principale Torino e provincia (Città metropolitana di Torino), poi ${site.areas.slice(1).join(', ')}.`, '');
  L.push('Come funziona: il cliente lascia CAP e telefono; un tecnico fa il sopralluogo gratuito e misura il bagno; il cliente riceve un preventivo scritto a prezzo fisso; tra l’ordine e il lavoro passano da 30 a 60 giorni; in 8 ore la squadra demolisce e smaltisce la vasca, rifà impianto idraulico della doccia e massetto, posa il piatto, riveste le pareti in gres porcellanato, monta box e rubinetteria e fa le finiture. Garanzia legale di 2 anni su materiali e manodopera.', '');
  L.push('Bonus 2026: il bonus barriere architettoniche del 75% è finito il 31 dicembre 2025. Cambiare soltanto la vasca di solito non è detraibile; una doccia a pavimento con sedile ribaltabile e doccia a telefono conforme al DM 236/1989 può rientrare nella detrazione ristrutturazione (50% abitazione principale, 36% negli altri casi), senza requisiti di età o disabilità. Da verificare caso per caso con il commercialista.', '');
  if (contact) L.push(`Contatti: ${contact}.`, '');
  L.push(`Versione completa in testo semplice, con cosa comprende il lavoro, bonus, province e domande frequenti: ${abs('/llms-full.txt')}`, '');

  L.push('## Servizi', '');
  L.push(`- [Trasformazione vasca in doccia](${abs('/vasca-in-doccia/')}): cosa comprende il lavoro, le 8 ore di lavoro ora per ora, da cosa dipende il prezzo`);
  L.push(`- [Vasca con sportello](${abs('/vasca-con-sportello/')}): per chi vuole tenere la vasca ma non riesce a scavalcare il bordo`);
  L.push(`- [Bagno sicuro per anziani](${abs('/bagno-sicuro/')}): doccia a filo pavimento, antiscivolo, maniglioni, seggiolino`, '');

  L.push('## Prezzi e agevolazioni', '');
  L.push(`- [Prezzi 2026](${abs('/prezzi/')}): da cosa dipende il prezzo, cosa comprende sempre il lavoro, preventivo gratuito a prezzo fisso`);
  L.push(`- [Bonus e detrazioni 2026](${abs('/bonus-detrazioni/')}): detrazione 50% e 36%, IVA agevolata, contributo legge 13/1989 in Piemonte`, '');

  L.push('## Guide', '');
  guides.forEach((g) => L.push(`- [${g.h1}](${abs(`/guide/${g.slug}/`)}): ${g.card}`));
  L.push('');

  L.push('## Zone', '');
  L.push('Una pagina per provincia, Torino per prima, con comuni serviti, CAP, quota di residenti con 65 anni o più (ISTAT, 1° gennaio 2025) e fondi della legge 13/1989 assegnati nel 2025.', '');
  zonePages.forEach((z) => L.push(`- [Vasca in doccia ${z.at}](${abs(`/zone/${z.slug}/`)}): ${plain(z.description)}`));
  L.push('');

  L.push('## Azienda', '');
  L.push(`- [Chi siamo](${abs('/chi-siamo/')}): chi è ${site.brand}, come lavoriamo, dati dell’azienda`);
  L.push(`- [Contatti](${abs('/contatti/')}): telefono, WhatsApp, modulo per il sopralluogo gratuito`);
  L.push(`- [Domande frequenti](${abs('/domande-frequenti/')}): lavori, prezzi, tempi, sicurezza, sopralluogo, garanzia, bonus`);
  if (filled(site.gbpUrl)) L.push(`- [Scheda Google e recensioni](${site.gbpUrl})`);
  L.push('');

  const body = L.map((l) => (l === '' ? l : llm(l) ?? '')).join('\n').replace(/\n{3,}/g, '\n\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
