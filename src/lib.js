export const NumFmtsCount = 163;
/**
 * Number format table
 *
 * ```js
 * {
 *   0: 'general',
 *   1: '0',
 *   2: '0.00',
 *   3: '#,##0',
 *   4: '#,##0.00',
 *   9: '0%',
 *   10: '0.00%',
 *   11: '0.00e+00',
 *   12: '# ?/?',
 *   13: '# ??/??',
 *   14: 'mm-dd-yy',
 *   15: 'd-mmm-yy',
 *   16: 'd-mmm',
 *   17: 'mmm-yy',
 *   18: 'h:mm am/pm',
 *   19: 'h:mm:ss am/pm',
 *   20: 'h:mm',
 *   21: 'h:mm:ss',
 *   22: 'm/d/yy h:mm',
 *   37: '#,##0 ;(#,##0)',
 *   38: '#,##0 ;[red](#,##0)',
 *   39: '#,##0.00;(#,##0.00)',
 *   40: '#,##0.00;[red](#,##0.00)',
 *   41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
 *   42: '_("$"* #,##0_);_("$* (#,##0);_("$"* "-"_);_(@_)',
 *   43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
 *   44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
 *   45: 'mm:ss',
 *   46: '[h]:mm:ss',
 *   47: 'mmss.0',
 *   48: '##0.0e+0',
 *   49: '@'
 * }
 * ```
 *
 * @type {Object}
 */
export const NumFmt = {
  0: 'general',
  1: '0',
  2: '0.00',
  3: '#,##0',
  4: '#,##0.00',
  9: '0%',
  10: '0.00%',
  11: '0.00e+00',
  12: '# ?/?',
  13: '# ??/??',
  14: 'mm-dd-yy',
  15: 'd-mmm-yy',
  16: 'd-mmm',
  17: 'mmm-yy',
  18: 'h:mm am/pm',
  19: 'h:mm:ss am/pm',
  20: 'h:mm',
  21: 'h:mm:ss',
  22: 'm/d/yy h:mm',
  37: '#,##0 ;(#,##0)',
  38: '#,##0 ;[red](#,##0)',
  39: '#,##0.00;(#,##0.00)',
  40: '#,##0.00;[red](#,##0.00)',
  41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
  42: '_("$"* #,##0_);_("$* (#,##0);_("$"* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
  44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
  45: 'mm:ss',
  46: '[h]:mm:ss',
  47: 'mmss.0',
  48: '##0.0e+0',
  49: '@'
};

export const NumFmtInv = {};
for (const k of Object.keys(NumFmt)) {
  NumFmtInv[NumFmt[k]] = k;
}
// AA => 26
export function col2num (colstr) {
  let d = 0;
  for (let i = 0; i !== colstr.length; ++i) {
    d = 26 * d + colstr.charCodeAt(i) - 64;
  }
  return d - 1;
}
// 26 => AA
export function num2col (col) {
  let s = '';
  for (++col; col; col = Math.floor((col - 1) / 26)) {
    s = String.fromCharCode(((col - 1) % 26) + 65) + s;
  }
  return s;
}
// B3 => {x: 1, y: 2}
export function cid2coord (cid) {
  const temp = cid.match(/([A-Z]+)(\d+)/);
  return {
    x: col2num(temp[1]),
    y: parseInt(temp[2], 10) - 1
  };
}

export function toExcelTime (d) {
  const unix = d.getTime() / 1000;
  return unix / 86400.0 + 25569.0;
}
