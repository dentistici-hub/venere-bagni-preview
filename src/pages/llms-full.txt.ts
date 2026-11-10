// llms-full.txt: the key facts of the site in plain text, for AI assistants that read it whole.
// Built from the same data files as the pages (site, prices, bonus, faq, zone-pages, guides, workday), so the two
// can't drift. Items that still hold a value placeholder ([TELEFONO], [EMAIL]...) are left out; facts the client
// still has to confirm keep their [DA CONFERMARE] tag until it is removed from the source text.
import type { APIRoute } from 'astro';
import { site, filled } from '../data/site';
import { included, priceFactors } from '../data/prices';
import { bonusShort, bonusStatus, bonusFaq } from '../data/bonus';
import { faqGroups } from '../data/faq';
import { zonePages } from '../data/zone-pages';
import { guides, guideUpdated } from '../data/guides';
import { workday } from '../data/workday';
import { abs } from '../lib/schema';
import { llm } from '../lib/txt';

export const GET: APIRoute = () => {
  const L: string[] = [];
  const add = (...lines: (string | null | false | undefined)[]) => lines.forEach((l) => { if (typeof l === 'string') { const t = l === '' ? '' : llm(l); if (t !== null) L.push(t); } });
  const qa = (q: string, a: string) => { const Q = llm(q), A = llm(a); if (Q && A) L.push(`D: ${Q}`, `R: ${A}`, ''); };

  add(`# ${site.brand}: scheda completa`, '');
  add(`Testo semplice con i fatti principali del sito ${abs('/')}. Aggiornato al ${site.updated}. Le pagine restano la fonte: qui ogni sezione indica la pagina da cui viene.`, '');

  add('## Chi siamo', '');
  add(`${site.brand} è il marchio con cui ${site.legalName} trasforma la vasca da bagno in doccia, installa vasche con sportello e adatta il bagno per persone anziane, soprattutto a Torino e nella sua provincia e anche nel resto del Piemonte. Ha 15 anni di attività e migliaia di installazioni.`);
  add(
    `Ragione sociale: ${site.legalName}`,
    filled(site.vat) && `Partita IVA: ${site.vat}`,
    filled(site.rea) && `REA: ${site.rea}`,
    filled(site.foundingYear) && `Anno di fondazione: ${site.foundingYear}`,
    filled(site.founder.name) && `Titolare: ${site.founder.name}${filled(site.founder.role) ? `, ${site.founder.role}` : ''}`,
    filled(site.street) && `Sede: ${site.street}, ${filled(site.postalCode) ? `${site.postalCode} ` : ''}${site.locality} (${site.region})`,
    filled(site.phone) && `Telefono: ${site.phone}`,
    filled(site.whatsappLabel) && `WhatsApp: ${site.whatsappLabel}`,
    filled(site.email) && `Email: ${site.email}`,
    site.openingHours.length > 0 && `Orari: ${site.hours}`,
    filled(site.gbpUrl) && `Scheda Google e recensioni: ${site.gbpUrl}`,
    `Pagina: ${abs('/chi-siamo/')}`, '',
  );

  add('## Servizi', '');
  add(`Trasformazione vasca in doccia (${abs('/vasca-in-doccia/')}): togliamo la vasca e nello stesso spazio facciamo la doccia, senza rifare il resto del bagno. È un lavoro chiavi in mano di 8 ore. Comprende: ${included.join('; ')}. Il piatto può essere a filo pavimento, senza scalino, oppure con un bordo basso.`, '');
  add(`Vasca con sportello (${abs('/vasca-con-sportello/')}): una vasca con una porta stagna sul fianco e un seggiolino interno, per chi vuole fare ancora il bagno ma non riesce a scavalcare il bordo. Si entra, ci si siede, si chiude lo sportello e si riempie; prima di uscire la vasca si svuota.`, '');
  add(`Bagno sicuro per anziani (${abs('/bagno-sicuro/')}): doccia a filo pavimento, fondo antiscivolo, maniglioni e seggiolino ribaltabile, messi in base a come si muove chi userà la doccia. Spesso a chiamare sono i figli, per un genitore: possono prenotare il sopralluogo, esserci o collegarsi al telefono e ricevere il preventivo.`, '');

  add('## Come funziona', '');
  add('1. Il cliente chiama, scrive su WhatsApp o lascia CAP e telefono nel modulo del sito.');
  add('2. Un tecnico fa il sopralluogo gratuito a casa: misura il bagno e mostra cosa si può montare. Il sopralluogo non impegna.');
  add('3. Il cliente riceve un preventivo scritto a prezzo fisso, con tutte le voci. Se durante il lavoro emerge un problema nascosto (per esempio uno scarico rotto sotto la vasca), il costo si concorda prima di andare avanti. Tra l’ordine e il giorno del lavoro passano da 30 a 60 giorni.');
  add('4. Il giorno del lavoro la squadra toglie la vasca, monta la doccia e pulisce, in 8 ore. La sera la doccia si può già usare.', '');
  add('Le 8 ore di lavoro di una trasformazione standard [DA CONFERMARE: orari indicativi]:');
  workday.forEach(([t, d]) => add(`- ${t}: ${d}`));
  add('');

  add(`## Prezzi (${abs('/prezzi/')})`, '');
  add('Venere Bagni non pubblica prezzi: il prezzo dipende dal bagno e lo fissa il preventivo scritto dopo il sopralluogo gratuito, a prezzo fisso, e non cambia durante il lavoro. L’IVA è indicata a parte. Su materiali e manodopera vale la garanzia legale di 2 anni.', '');
  add('Da cosa dipende il prezzo:');
  priceFactors.forEach(([a, b]) => add(`- ${a}: ${b}`));
  add('');

  add(`## Bonus e detrazioni 2026 (${abs('/bonus-detrazioni/')})`, '');
  add(bonusShort, '');
  bonusStatus.forEach(([a, b, c]) => add(`- ${a}: ${b}. ${c}.`));
  add('');
  bonusFaq.forEach((f) => qa(f.q, f.a));

  add('## Guide', '');
  guides.forEach((g) => { add(`${g.h1} (${abs(`/guide/${g.slug}/`)}, aggiornata al ${guideUpdated(g.slug)})`, g.answer, ''); });

  add('## Zone servite', '');
  add(`${site.brand} lavora a Torino e in tutto il Piemonte: la zona principale è Torino con la sua provincia, poi le altre sette province. Dati per provincia: CAP (comuni-json, dati Poste/ISTAT), residenti con 65 anni o più (ISTAT, 1° gennaio 2025), domanda e fondi 2025 della legge 13/1989 (Regione Piemonte, D.D. 25 settembre 2025 n. 1299).`, '');
  zonePages.forEach((z) => {
    add(`### ${z.name} (${abs(`/zone/${z.slug}/`)})`);
    z.facts.forEach(([a, b]) => add(`- ${a}: ${b}`));
    add(`- Comuni serviti: ${z.towns.map(([a, b]) => `${a}: ${b}`).join('; ')}`);
    add(z.l13, '');
    z.faqs.forEach((f) => qa(f.q, f.a));
  });

  add(`## Domande frequenti (${abs('/domande-frequenti/')})`, '');
  faqGroups.filter((g) => g.id !== 'bonus').forEach((g) => { add(`### ${g.title}`, ''); g.items.forEach((f) => qa(f.q, f.a)); });

  const body = L.join('\n').replace(/\n{3,}/g, '\n\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
