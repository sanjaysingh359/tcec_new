/* Significant-achievement data helpers, shared by the MPR report and the Achievement report.
   The entry form (AchievementPage) saves one JSON object per institute/month in tbl_budget.significant. */

export const INIT_ACH = {
  note: '', importRows: [], technical: '',
  highEndDtm: '0', highEndCum: '0', masterDtm: '0', masterCum: '0',
  mous: '', earlierMous: '', academia: '', awards: '',
};

/* JSON from the entry form; older plain-text entries are shown as the technical achievements. */
export function parseAch(raw) {
  if (!raw) return INIT_ACH;
  try { return { ...INIT_ACH, ...JSON.parse(raw) }; }
  catch { return { ...INIT_ACH, technical: raw }; }
}

/* Rich text from the Achievement editor → safe HTML: keep only basic formatting tags,
   drop every attribute and anything else (scripts, links, styles, event handlers). */
const SAFE_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'UL', 'OL', 'LI', 'BR', 'P', 'DIV', 'SPAN']);
export function safeHtml(html) {
  const doc = new DOMParser().parseFromString(`<div>${html || ''}</div>`, 'text/html');
  const clean = node => {
    [...node.childNodes].forEach(ch => {
      if (ch.nodeType === Node.TEXT_NODE) return;
      if (ch.nodeType !== Node.ELEMENT_NODE) { ch.remove(); return; }
      if (!SAFE_TAGS.has(ch.tagName)) {
        if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT'].includes(ch.tagName)) ch.remove();
        else { clean(ch); ch.replaceWith(...ch.childNodes); }   // unwrap, keep cleaned content
        return;
      }
      [...ch.attributes].forEach(a => ch.removeAttribute(a.name));
      clean(ch);
    });
  };
  const root = doc.body.firstChild;
  clean(root);
  return root.innerHTML;
}

/* true when the editor HTML has no visible text (e.g. "<br>" or "<div></div>") */
export const isBlankHtml = html => !String(html || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
