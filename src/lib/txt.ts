import { isPreview } from './url';
import { exampleFor } from '../data/examples';
// Turns copy strings into safe HTML: **bold**, and [PLACEHOLDER] -> highlighted <mark> so the client
// sees at a glance what still needs real data. "[DA CONFERMARE...]" becomes a small "da confermare" tag.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Value placeholder -> <mark>. In preview builds the mark also carries an example value (data-ex, from
// src/data/examples.ts) for the presentation mode; production builds render the bare mark.
const mark = (hint?: string) => (_m: string, key: string, offset: number, str: string) => {
  const ex = isPreview ? exampleFor(key, str.slice(0, offset), str.slice(offset + _m.length), hint) : undefined;
  return ex ? `<mark class="ph" data-ex="${esc(ex)}">${key}</mark>` : `<mark class="ph">${key}</mark>`;
};
// Space before a "da confermare" tag: in preview builds it is wrapped so presentation mode hides it with the tag.
const gap = (sp: string) => (sp && isPreview ? `<span class="ph-gap">${sp}</span>` : sp);
// hint: optional context for the example value (e.g. a row name). Ignored in production.
export const h = (s: string, hint?: string): string =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(\s?)(\[DA CONFERMARE[^\]]*\])/g, (_m, sp: string, m: string) => `${gap(sp)}<mark class="ph ph--note" title="${m.slice(1, -1)}">da confermare</mark>`)
    .replace(/\[([^\]]+)\]/g, mark(hint));
// Plain text for meta tags and schema: placeholders and markdown removed.
export const plain = (s: string): string => s.replace(/\s*\[[^\]]*\]/g, '').replace(/\*\*/g, '').replace(/\s{2,}/g, ' ').trim();
// Same as h(), but "[DA CONFERMARE: detail]" keeps the detail visible ("da confermare: detail") instead of
// hiding it in a tooltip. Used on the inner pages, where the detail often says what the client must decide.
export const hv = (s: string, hint?: string): string =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(\s?)\[DA CONFERMARE([^\]]*)\]/g, (_m, sp: string, d: string) => `${gap(sp)}<mark class="ph ph--note">da confermare${d.trim().startsWith(':') ? d.trim().replace(/^:\s*/, ': ') : d.trim() ? ` ${d.trim()}` : ''}</mark>`)
    .replace(/\[([^\]]+)\]/g, mark(hint));
// Text for llms.txt / llms-full.txt. Returns null when the string still holds a value placeholder like [TELEFONO]
// or [EMAIL] (the caller leaves that item out). "[DA CONFERMARE...]" notes are kept: they mark a stated fact the
// client still has to confirm, and they disappear from the files once removed from the source text.
export const llm = (s: string): string | null => {
  // Markdown links [text](url) are not placeholders.
  const rest = s.replace(/\[DA CONFERMARE[^\]]*\]/g, '').replace(/\[[^\]]*\]\(/g, '(');
  if (/\[[^\]]*\]/.test(rest)) return null;
  return s.replace(/\*\*/g, '').replace(/\s{2,}/g, ' ').trim();
};
