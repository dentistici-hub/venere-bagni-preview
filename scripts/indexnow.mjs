// Pings IndexNow (Bing, Yandex, Seznam, Naver...) with every URL in the sitemap, so new or changed pages are
// crawled within hours instead of waiting. Run after a production deploy:
//
//   npm run build && node scripts/indexnow.mjs           (URLs from dist/sitemap-0.xml)
//   node scripts/indexnow.mjs --live                      (URLs from the live sitemap on the domain)
//   node scripts/indexnow.mjs --dry                       (print the payload, send nothing)
//   node scripts/indexnow.mjs https://www.venerebagni.it/guide/x/   (ping only the URLs given)
//
// Needs site.indexNowKey and site.url set in src/data/site.ts, and the key file https://<domain>/<key>.txt live
// (the build writes it). Google does not use IndexNow: for Google, Search Console + the sitemap are enough.
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const live = args.includes('--live');
const given = args.filter((a) => /^https?:\/\//.test(a));

const src = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const key = (src.match(/indexNowKey:\s*'([^']*)'/) || [])[1] || '';
const siteUrl = (src.match(/\|\|\s*'(https:\/\/[^']+)'/) || [])[1] || '';
if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) { console.error('Set indexNowKey in src/data/site.ts first (8-128 chars, a-z A-Z 0-9 -).'); process.exit(1); }
if (!siteUrl) { console.error('Could not read the production url from src/data/site.ts.'); process.exit(1); }
const host = new URL(siteUrl).host;

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let urls = given;
if (!urls.length) {
  if (live) {
    const index = await (await fetch(`${siteUrl}/sitemap-index.xml`)).text();
    for (const sm of locs(index)) urls.push(...locs(await (await fetch(sm)).text()));
  } else {
    urls = locs(readFileSync(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8'));
  }
}
urls = urls.filter((x) => new URL(x).host === host);
if (!urls.length) { console.error(`No URLs for ${host}. Build with the production domain first.`); process.exit(1); }

const body = { host, key, keyLocation: `${siteUrl}/${key}.txt`, urlList: urls };
if (dry) { console.log(JSON.stringify(body, null, 2)); process.exit(0); }

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body),
});
// 200/202 = accepted. 403 = key file not found or wrong. 422 = URLs not on the host.
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status >= 300) console.log(await res.text());
