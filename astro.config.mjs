// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { pageUpdated } from './src/data/dates.mjs';

const base = process.env.PAGES_BASE || '/';

export default defineConfig({
  // Production domain: keep it equal to site.url in src/data/site.ts (CONFIRM: venerebagni.it looked free on 2026-11-09).
  // The GitHub Pages preview sets PAGES_SITE / PAGES_BASE.
  site: process.env.PAGES_SITE || 'https://www.venerebagni.it',
  base,
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // noindex pages stay out of the sitemap (grazie, offerta = ads landing, legal pages).
      filter: (p) => !/\/(grazie|offerta|privacy|cookie)\/$/.test(p),
      // <lastmod> from src/data/dates.mjs (honest content dates, not the build date).
      serialize(item) {
        const path = new URL(item.url).pathname.slice(base.replace(/\/$/, '').length) || '/';
        return { ...item, lastmod: new Date(`${pageUpdated(path)}T00:00:00Z`).toISOString() };
      },
    }),
  ],
});
