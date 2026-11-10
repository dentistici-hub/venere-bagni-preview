// Cost information without figures. Client decision 2026-11-10: no price is published anywhere on the site
// (pages, schema, meta tags, llms files). The amount is only in the written quote after the free survey.

// What the tub-to-shower job always includes (client, 2026-11-10). Shown in full on /vasca-in-doccia/ and /prezzi/,
// and in llms-full.txt. Do not add items the client has not confirmed.
export const included: string[] = [
  'demolizione e smaltimento della vasca esistente',
  'rifacimento dell’impianto idraulico della doccia',
  'rifacimento del massetto cementizio',
  'posa del piatto doccia',
  'installazione del box doccia',
  'installazione di rubinetteria ed eventuali accessori',
  'rivestimento delle pareti della doccia con nuovo gres porcellanato',
  'finiture',
  'fornitura dei materiali',
];

// One-line version for FAQ answers and short mentions.
export const includedShort =
  'demolizione e smaltimento della vasca, impianto idraulico della doccia, massetto, piatto, box, rubinetteria, rivestimento in gres porcellanato, finiture e materiali';

// "Cosa fa cambiare il prezzo" table on /prezzi/, also in llms-full.txt. No amounts.
export const priceFactors: [string, string][] = [
  ['Misura del bagno', 'Un piatto più grande o su misura costa di più'],
  ['Tipo di piatto', 'Il filo pavimento richiede più lavoro sullo scarico'],
  ['Gres e finiture', 'Il gres e le finiture che scegli per le pareti cambiano il costo'],
  ['Box doccia', 'Scorrevole, a battente o a nicchia hanno prezzi diversi'],
  ['Problemi nascosti', 'Uno scarico rotto sotto la vasca si vede solo smontandola: il costo si concorda con te prima di andare avanti'],
  ['Accessori di sicurezza', 'Maniglioni, seggiolino e miscelatore termostatico cambiano il totale in base a quali scegli'],
];
