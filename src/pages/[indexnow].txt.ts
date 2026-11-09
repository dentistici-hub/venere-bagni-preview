// IndexNow key file: /<key>.txt containing the key, built only when site.indexNowKey is set.
// Search engines fetch it to check that our pings (scripts/indexnow.mjs) really come from the site owner.
import type { APIRoute, GetStaticPaths } from 'astro';
import { site } from '../data/site';

export const getStaticPaths: GetStaticPaths = () =>
  /^[A-Za-z0-9-]{8,128}$/.test(site.indexNowKey) ? [{ params: { indexnow: site.indexNowKey } }] : [];

export const GET: APIRoute = () => new Response(site.indexNowKey, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
