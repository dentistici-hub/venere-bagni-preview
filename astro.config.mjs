// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // CONFIRM: final domain (venerebagni.it looked free on 2026-11-09). The GitHub Pages preview sets PAGES_SITE / PAGES_BASE.
  site: process.env.PAGES_SITE || 'https://www.venerebagni.it',
  base: process.env.PAGES_BASE || '/',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  integrations: [sitemap({ filter: (p) => !/\/(grazie|offerta|privacy|cookie)\/$/.test(p) })],
});
