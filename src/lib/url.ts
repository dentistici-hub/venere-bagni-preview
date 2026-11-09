// Prefixes root-relative paths with the deploy base. In production the site lives at the domain root
// (BASE_URL is "/"); the client preview on GitHub Pages lives under "/genco-landing-preview/".
export const u = (path: string): string => import.meta.env.BASE_URL.replace(/\/$/, '') + path;
export const isPreview: boolean = import.meta.env.PUBLIC_PREVIEW === '1';
