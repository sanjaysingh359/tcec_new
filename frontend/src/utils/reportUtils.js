import { useEffect } from 'react';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const NUMERIC = /^-?\d+(\.\d+)?$/;
/* computed "rgb(r, g, b)" / "rgba(r, g, b, a)" → "#rrggbb" (alpha blended over white); null if fully transparent */
function toHex(css) {
  const m = css && css.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(',').map(Number);
  if (a === 0) return null;
  const mix = v => Math.round(v * a + 255 * (1 - a)).toString(16).padStart(2, '0');
  return `#${mix(r)}${mix(g)}${mix(b)}`;
}

/**
 * Export a report table to Excel (.xls, HTML-table format — same as the legacy app).
 * - Adds the report title (the page's .rpt-header-title, i.e. report name + month/year) on top
 *   and any notes shown under the table (e.g. the "* No record found" legend) at the bottom.
 * - Copies each cell's on-screen colours/alignment/bold inline and draws borders, since Excel
 *   does not see the page's CSS.
 * - Non-numeric cells are forced to Text so Excel does not turn labels like "12-2026" into dates.
 * - Downloads through a Blob (data: URIs are length-capped and fail on large reports).
 */
export function exportToExcel(tableId, filename, { title } = {}) {
  const src = document.getElementById(tableId);
  if (!src) return;

  const clone = src.cloneNode(true);
  const srcCells = src.querySelectorAll('th, td');
  clone.querySelectorAll('th, td').forEach((cell, i) => {
    const cs = getComputedStyle(srcCells[i]);
    const text = cell.textContent.trim();
    const st = [
      'border:0.5pt solid #7f8c9d',
      'vertical-align:middle',
      `text-align:${cs.textAlign === 'start' ? 'left' : cs.textAlign}`,
      `font-weight:${Number(cs.fontWeight) >= 600 || cs.fontWeight === 'bold' ? 'bold' : 'normal'}`,
    ];
    const bg = toHex(cs.backgroundColor), fg = toHex(cs.color);
    if (bg) st.push(`background:${bg}`);
    if (fg) st.push(`color:${fg}`);
    if (!NUMERIC.test(text)) st.push("mso-number-format:'\\@'");
    cell.setAttribute('style', st.join(';'));
    cell.removeAttribute('class');
  });

  // widest row (with colspans) — title / notes span the full table
  const cols = Math.max(1, ...[...src.rows].map(r => [...r.cells].reduce((s, c) => s + c.colSpan, 0)));
  const heading = title ?? src.closest('.rpt-page')?.querySelector('.rpt-header-title')?.textContent?.trim() ?? '';
  const wrap  = src.closest('.rpt-table-wrap');
  const notes = wrap ? [...wrap.children].filter(el => el !== src && !el.contains(src))
                          .map(el => el.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean) : [];

  const titleRow = heading
    ? `<tr><td colspan="${cols}" style="font-size:14pt;font-weight:bold;color:#660000;text-align:center;height:28px">${esc(heading)}</td></tr><tr><td colspan="${cols}"></td></tr>`
    : '';
  const noteRows = notes.map(t =>
    `<tr><td colspan="${cols}" style="color:#c00000;font-weight:bold;mso-number-format:'\\@'">${esc(t)}</td></tr>`).join('');

  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8">
<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Report</x:Name>
<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
<style>table{border-collapse:collapse;font-family:Arial;font-size:10pt} td,th{padding:3px 6px}</style>
</head><body><table>${titleRow}</table>${clone.outerHTML.replace(/^<table[^>]*>/, '<table border="1">')}${noteRows ? `<table>${noteRows}</table>` : ''}</body></html>`;

  const blob = new Blob(['\ufeff', html], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * While the browser prints (Print button or Ctrl+P), tag <body> with `rpt-printing`
 * so the print rules in index.css output only the report — no sidebar, top bar,
 * footer or action buttons. Rules are scoped to that class, so other screens are unaffected.
 */
export function usePrintOnlyReport() {
  useEffect(() => {
    const on  = () => document.body.classList.add('rpt-printing');
    const off = () => document.body.classList.remove('rpt-printing');
    window.addEventListener('beforeprint', on);
    window.addEventListener('afterprint', off);
    return () => {
      window.removeEventListener('beforeprint', on);
      window.removeEventListener('afterprint', off);
      off();
    };
  }, []);
}
