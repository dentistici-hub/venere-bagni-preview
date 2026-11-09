# Venere Bagni: sito (anteprima per il cliente)

Sito statico Astro per Venere Bagni (Italprogetti srls): trasformazione vasca in doccia a Torino e in Piemonte.
Anteprima temporanea su GitHub Pages, `noindex`, con banda "Anteprima": il modulo non invia dati.

- Foto: segnaposto presi da siti internazionali di settore, solo come esempio visivo. Vanno tutti sostituiti con foto di lavori reali prima del lancio.
- Testi evidenziati in giallo: dati da confermare con il cliente (telefono, prezzi, garanzia, recensioni...).
- Collegamento CRM: `worker/index.js` (Cloudflare Worker) inoltra il modulo al CRM Profilo. Da attivare al lancio con il segreto `CRM_INGEST_TOKEN`.

- SEO e GEO: tutti i dati da compilare sono in `src/data/site.ts`; checklist di lancio in `SEO-GEO-LAUNCH.md`.

```
npm install
npm run dev      # http://localhost:4325
npm run build    # dist/
npm run og       # immagini social 1200x630 in public/og/
npm run indexnow # ping IndexNow (solo dopo il lancio)
```
