// llms.txt (llmstxt.org format): short map of the site for AI assistants, built from the site data so links,
// contacts and prices always match the pages. Contact lines appear only once the value in site.ts is real.
// The long plain-text version is /llms-full.txt.
import type { APIRoute } from 'astro';
import { site, filled, euro } from '../data/site';
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
  L.push(`> ${site.brand} (${site.legalName}) toglie la vasca da bagno e monta al suo posto una doccia, in un giorno di lavoro [DA CONFERMARE], a Torino e in tutte le otto province del Piemonte. Installa anche vasche con sportello e adatta il bagno per persone anziane: doccia a filo pavimento, maniglioni, seggiolino ribaltabile. Il sopralluogo a casa è gratuito e il preventivo è scritto, a prezzo fisso. Una trasformazione standard parte da ${euro(site.priceFrom)} [DA CONFERMARE: IVA inclusa?].`, '');
  L.push(`Zone servite: ${site.areas.join(', ')}.`, '');
  L.push('Come funziona: il cliente lascia CAP e telefono; un tecnico fa il sopralluogo gratuito e misura il bagno; il cliente riceve un preventivo scritto a prezzo fisso; la squadra toglie la vasca e monta piatto doccia, pareti, box e rubinetteria in un giorno [DA CONFERMARE].', '');
  L.push('Bonus 2026: il bonus barriere architettoniche del 75% è finito il 31 dicembre 2025. Cambiare soltanto la vasca di solito non è detraibile; una doccia a pavimento con sedile ribaltabile e doccia a telefono conforme al DM 236/1989 può rientrare nella detrazione ristrutturazione (50% abitazione principale, 36% negli altri casi), senza requisiti di età o disabilità. Da verificare caso per caso con il commercialista.', '');
  if (contact) L.push(`Contatti: ${contact}.`, '');
  L.push(`Versione completa in testo semplice, con prezzi, bonus, province e domande frequenti: ${abs('/llms-full.txt')}`, '');

  L.push('## Servizi', '');
  L.push(`- [Trasformazione vasca in doccia](${abs('/vasca-in-doccia/')}): cosa è compreso, giornata di lavoro ora per ora, prezzo da ${euro(site.priceFrom)}`);
  L.push(`- [Vasca con sportello](${abs('/vasca-con-sportello/')}): per chi vuole tenere la vasca ma non riesce a scavalcare il bordo`);
  L.push(`- [Bagno sicuro per anziani](${abs('/bagno-sicuro/')}): doccia a filo pavimento, antiscivolo, maniglioni, seggiolino`, '');

  L.push('## Prezzi e agevolazioni', '');
  L.push(`- [Prezzi 2026](${abs('/prezzi/')}): listino per tipo di intervento, cosa cambia il prezzo, cosa è sempre compreso`);
  L.push(`- [Bonus e detrazioni 2026](${abs('/bonus-detrazioni/')}): detrazione 50% e 36%, IVA agevolata, contributo legge 13/1989 in Piemonte`, '');

  L.push('## Guide', '');
  guides.forEach((g) => L.push(`- [${g.h1}](${abs(`/guide/${g.slug}/`)}): ${g.card}`));
  L.push('');

  L.push('## Zone', '');
  L.push('Una pagina per provincia, con comuni serviti, CAP, quota di residenti con 65 anni o più (ISTAT, 1° gennaio 2025) e fondi della legge 13/1989 assegnati nel 2025.', '');
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
