/** Export an HTML table to Excel (.xls) via data URI */
export function exportToExcel(tableId, filename) {
  const uri = 'data:application/vnd.ms-excel;base64,';
  const tpl = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:x="urn:schemas-microsoft-com:office:excel"
    xmlns="http://www.w3.org/TR/REC-html40">
    <head><meta charset="UTF-8"></head>
    <body><table>{table}</table></body></html>`;
  const tbl = document.getElementById(tableId);
  if (!tbl) return;
  const html = tpl.replace('{table}', tbl.innerHTML);
  const b64  = btoa(unescape(encodeURIComponent(html)));
  const a    = document.createElement('a');
  a.href     = uri + b64;
  a.download = filename;
  a.click();
}
