// Turns copy strings into safe HTML: **bold**, and [PLACEHOLDER] -> highlighted <mark> so the client
// sees at a glance what still needs real data. "[DA CONFERMARE...]" becomes a small "da confermare" tag.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const h = (s: string): string =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[DA CONFERMARE[^\]]*\]/g, (m) => `<mark class="ph ph--note" title="${m.slice(1, -1)}">da confermare</mark>`)
    .replace(/\[([^\]]+)\]/g, '<mark class="ph">$1</mark>');
// Plain text for meta tags and schema: placeholders and markdown removed.
export const plain = (s: string): string => s.replace(/\s*\[[^\]]*\]/g, '').replace(/\*\*/g, '').replace(/\s{2,}/g, ' ').trim();
// Same as h(), but "[DA CONFERMARE: detail]" keeps the detail visible ("da confermare: detail") instead of
// hiding it in a tooltip. Used on the inner pages, where the detail often says what the client must decide.
export const hv = (s: string): string =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[DA CONFERMARE([^\]]*)\]/g, (_m, d: string) => `<mark class="ph ph--note">da confermare${d.trim().startsWith(':') ? d.trim().replace(/^:\s*/, ': ') : d.trim() ? ` ${d.trim()}` : ''}</mark>`)
    .replace(/\[([^\]]+)\]/g, '<mark class="ph">$1</mark>');
