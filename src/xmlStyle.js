import { props, Node } from './node';

// const builtinNumFmtsCount = 163;
const builtInNumFmt = {
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
  41: `_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)`,
  42: `_("$"* #,##0_);_("$* (#,##0);_("$"* "-"_);_(@_)`,
  43: `_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)`,
  44: `_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)`,
  45: 'mm:ss',
  46: '[h]:mm:ss',
  47: 'mmss.0',
  48: '##0.0e+0',
  49: '@'
};
const builtInNumFmtInv = {};
for (const k of Object.keys(builtInNumFmt)) {
  builtInNumFmtInv[builtInNumFmt[k]] = k;
}

@props('xmlns', 'count', 'uniqueCount')
export class XstyleSheet extends Node {
  constructor ({ xmlns = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main' }, children) {
    super({ xmlns }, children);
  }
}

@props('count')
export class XnumFmts extends Node {}

@props('numFmtId', 'formatCode')
export class XnumFmt extends Node {}

@props('count')
export class Xfonts extends Node {}

@props('sz', 'name', 'family', 'charset', 'color', 'b', 'i', 'u')
export class Xfont extends Node {
  render () {
    let str = '<font>';
    if (this.sz) str += `<sz val="${this.sz}"/>`;
    if (this.name) str += `<name val="${this.name}"/>`;
    if (this.family) str += `<family val="${this.family}"/>`;
    if (this.charset) str += `<charset val="${this.charset}"/>`;
    if (this.color) str += `<color rgb="${this.color}"/>`;
    if (this.b) str += `<b/>`;
    if (this.i) str += `<i/>`;
    if (this.u) str += `<u/>`;
    return str + '</font>';
  }
}
