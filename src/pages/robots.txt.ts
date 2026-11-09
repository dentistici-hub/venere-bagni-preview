// robots.txt, built from site.ts so the sitemap line follows the production domain.
// Everything is allowed: the "noindex" meta tag (site.indexable = false, preview build) is what keeps pages out
// of the index before launch. A Disallow here would stop crawlers from seeing that noindex.
// Content-Signal (Cloudflare's content-use declaration): search and AI answers yes, model training no.
// Client decision, change ai-train to yes if they want to be in training data too.
import type { APIRoute } from 'astro';
import { abs } from '../lib/schema';

// Search engines and AI assistants that fetch pages to answer or cite (list checked 2026-11-10).
const bots = [
  'Googlebot', 'Bingbot', 'DuckDuckBot', 'Applebot', 'YandexBot',
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'Claude-Web', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended',
  'DuckAssistBot', 'Amazonbot', 'meta-externalagent', 'MistralAI-User',
];

export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    '',
    '# Search engines and AI search / citation crawlers: explicitly welcome',
    ...bots.flatMap((b) => [`User-agent: ${b}`, 'Allow: /']),
    '',
    `Sitemap: ${abs('/sitemap-index.xml')}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
