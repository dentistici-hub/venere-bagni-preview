// EXAMPLE VALUES for the preview's presentation mode only ("Mostra dati di esempio").
// In preview builds h()/hv() put them on each placeholder mark as data-ex, and a small script in Base.astro
// swaps the text so the client can judge the design with realistic-looking data. They are invented on purpose:
// they never reach production builds, JSON-LD, meta tags or the llms files (those use plain() / llm()).
// "a|b|c" = alternatives, used in turn on the same page (e.g. a different town on each before/after photo).
// No price examples: the client publishes no prices (2026-11-10). Years (15), installations ("migliaia"),
// warranty (2 anni, legal) and lead time (30-60 giorni) are confirmed and written in the copy, so they need none.

export const examples: Record<string, string> = {
  'TELEFONO': '011 123 4567',
  'WHATSAPP': '333 123 4567',
  'EMAIL': 'info@venerebagni.it',
  'INDIRIZZO': 'Via Nizza 120',
  'CAP': '10126',
  'P.IVA': '12345678901',
  'REA': 'TO-1234567',
  'ORARI': 'lun-ven 8:30-18:30, sab 9:00-12:30',
  'NOME TITOLARE': 'Marco Ferrero',
  'RUOLO, es. titolare': 'titolare',
  'NOME E RUOLO DEL TECNICO': 'Luca, il nostro tecnico',
  'VOTO GOOGLE': '4,9',
  'N° RECENSIONI': '127',
  'X ORE': '2 ore',
  'X GIORNI': '3 giorni',
  'CITTÀ': 'Torino|Moncalieri|Rivoli',
  'DURATA': '8 ore',
  'SOCIETÀ DI FINANZIAMENTO': 'una finanziaria convenzionata',
  'OFFERTA DEL MESE: DA DEFINIRE, scadenza gg/mm': 'Offerta di novembre: maniglione e seggiolino compresi, fino al 30/11',
};

// Example for one placeholder. before/after = the text around it (escaped HTML). The hint argument is kept for the
// h()/hv() signature and is not used. Returns undefined when there is no sensible example (e.g. "[FOTO DEL TITOLARE...]").
export const exampleFor = (key: string, before: string, after: string, _hint?: string): string | undefined => {
  let ex = examples[key];
  if (key === 'DURATA' && /^\s*minuti/.test(after)) ex = '45';
  // Before/after captions: tub-to-shower jobs take 8 hours (confirmed), the tub with door 1 or 2 days (not confirmed).
  else if (key === 'DURATA' && /sportello/i.test(before)) ex = '1 giorno';
  return ex || undefined;
};
