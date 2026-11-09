// Content dates (YYYY-MM-DD). Used for JSON-LD dateModified/datePublished and the sitemap <lastmod>.
// Plain .mjs so astro.config.mjs can import it too. Bump a date when that page's content really changes:
// search engines trust lastmod only while it stays honest.
export const SITE_UPDATED = '2026-11-10';

// Per-page overrides (path with trailing slash). Pages not listed use SITE_UPDATED.
export const PAGE_UPDATED = {
  '/guide/doccia-a-norma-dm-236-detrazione/': '2026-11-10',
  '/guide/piatto-doccia-filo-pavimento-o-ribassato/': '2026-11-10',
  '/guide/giorno-trasformazione-vasca-in-doccia/': '2026-11-10',
};

export const pageUpdated = (path) => PAGE_UPDATED[path] || SITE_UPDATED;
