import { props, Node, HEAD } from './node';
import { NumFmtInv, NumFmtsCount } from './lib';

@props('xmlns')
export class XstyleSheet extends Node {
  fonts = null;
  fills = null;
  borders = null;
  cellStyles = null;
  cellStyleXfs = null;
  cellXfs = null;
  numFmts = null;
  numFmtRefTable = {};

  constructor ({ xmlns = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main' }, children) {
    super({ xmlns }, children);
    this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
  }
  render () {
    this.children = [];
    if (this.numFmts) this.children.push(this.numFmts);
    if (this.fonts) this.children.push(this.fonts);
    if (this.fills) this.children.push(this.fills);
    if (this.borders) this.children.push(this.borders);
    if (this.cellStyleXfs) this.children.push(this.cellStyleXfs);
    if (this.cellXfs) this.children.push(this.cellXfs);
    if (this.cellStyles) this.children.push(this.cellStyles);
    return super.render();
  }
  reset () {
    this.children = [];
    this.fonts = new Xfonts();
    this.fills = new Xfills();
    this.borders = new Xborders();
    this.cellXfs = new XcellXfs({ count: 1 }, [new Xxf()]);
    this.numFmts = new XnumFmts();
    this.addBorder(new Xborder({
      left: { style: 'none' },
      right: { style: 'none' },
      top: { style: 'none' },
      bottom: { style: 'none' }
    }));
  }
  addFont (xFont) {
    if (!xFont.name) return 0;
    const list = this.fonts.children;
    const len = list.length;
    for (let i = 0; i < list.length; i++) {
      if (xFont.equals(list[i])) return i;
    }
    list.push(xFont);
    this.fonts.count = list.length;
    return len;
  }
  addFill (xFill) {
    const list = this.fills.children;
    const len = list.length;
    for (let i = 0; i < list.length; i++) {
      if (xFill.equals(list[i])) return i;
    }
    list.push(xFill);
    this.fills.count = list.length;
    return len;
  }
  addBorder (xBorder) {
    const list = this.borders.children;
    const len = list.length;
    for (let i = 0; i < list.length; i++) {
      if (xBorder.equals(list[i])) return i;
    }
    list.push(xBorder);
    this.borders.count = list.length;
    return len;
  }
  addCellXf (xXf) {
    const list = this.cellXfs.children;
    const len = list.length;
    for (let i = 0; i < list.length; i++) {
      if (xXf.equals(list[i])) return i;
    }
    list.push(xXf);
    this.cellXfs.count = list.length;
    return len;
  }
  addNumFmt (xNumFmt) {
    if (xNumFmt.numFmtId <= NumFmtsCount) return;
    if (this.numFmtRefTable[xNumFmt.numFmtId] === undefined) {
      this.numFmts.children.push(xNumFmt);
      this.numFmts.count = this.numFmts.children.length;
      this.numFmtRefTable[xNumFmt.numFmtId] = xNumFmt;
    }
  }
  newNumFmt (formatCode) {
    if (!formatCode) return new XnumFmt({ numFmtId: 0, formatCode: 'general' });
    let numFmtId = NumFmtInv[formatCode];
    if (numFmtId !== undefined) {
      return new XnumFmt({ numFmtId, formatCode });
    }
    for (const numFmt of this.numFmts.children) {
      if (formatCode === numFmt.formatCode) return numFmt;
    }

    numFmtId = NumFmtsCount + 1;
    do {
      if (this.numFmtRefTable[numFmtId]) {
        numFmtId++;
      } else {
        this.addNumFmt(new XnumFmt({ numFmtId, formatCode }));
        break;
      }
    } while (1);
    return new XnumFmt({ numFmtId, formatCode });
  }
}

@props('count')
export class XnumFmts extends Node {
  render () {
    if (this.count) return super.render();
    return '';
  }
}

@props('numFmtId', 'formatCode')
export class XnumFmt extends Node {}

@props('count')
export class Xfonts extends Node {
  render () {
    if (this.count) return super.render();
    return '';
  }
}

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
  equals (o) {
    return this.sz === o.sz &&
      this.name === o.name &&
      this.family === o.family &&
      this.charset === o.charset &&
      this.color === o.color &&
      this.b === o.b &&
      this.i === o.i &&
      this.u === o.u;
  }
}

@props('count')
export class Xfills extends Node {
  render () {
    if (this.count) return super.render();
    return '';
  }
}

@props('patternFill')
export class Xfill extends Node {
  render () {
    return `<fill>${this.patternFill.render()}</fill>`;
  }
  equals (o) {
    const pf1 = this.patternFill;
    const pf2 = o.patternFill;
    if (pf1 && pf2) {
      return pf1.patternType === pf2.patternType &&
        pf1.fgColor === pf2.fgColor &&
        pf1.bgColor === pf2.bgColor;
    }
    return !pf1 && !pf2;
  }
}

@props('patternType', 'fgColor', 'bgColor')
export class XpatternFill extends Node {
  render () {
    let str = `<patternFill patternType="${this.patternType}">`;
    if (this.fgColor) str += `<fgColor rgb="${this.fgColor}"/>`;
    if (this.bgColor) str += `<bgColor rgb="${this.bgColor}"/>`;
    return str + '</patternFill>';
  }
}

@props('count')
export class Xborders extends Node {
  render () {
    if (this.count) return super.render();
    return '';
  }
}

@props('left', 'right', 'top', 'bottom')
export class Xborder extends Node {
  _renderLine (pos) {
    const posVal = this[pos];
    if (!posVal) return '';

    let str = `<${pos} style="${posVal.style}">`;
    if (posVal.color) str += `<color rgb="${posVal.color}"/>`;
    return str + `</${pos}>`;
  }
  render () {
    let str = '<border>';
    str += this._renderLine('left');
    str += this._renderLine('right');
    str += this._renderLine('top');
    str += this._renderLine('bottom');
    return str + '</border>';
  }
  equals (o) {
    const check = (a, b) => {
      if (a && b) {
        return a.style === b.style && a.color === b.color;
      }
      return !a && !b;
    };
    return check(this.left, o.left) &&
      check(this.right, o.right) &&
      check(this.top, o.top) &&
      check(this.bottom, o.bottom);
  }
}

@props('count')
export class XcellStyles extends Node {
  render () {
    if (this.count) return super.render();
    return '';
  }
}

@props('builtInId', 'customBuiltIn', 'hidden', 'iLevel', 'name', 'xfId')
export class XcellStyle extends Node {}

@props('count')
export class XcellStyleXfs extends Node {
  render () {
    if (this.count) return super.render();
    return '';
  }
}

@props('count')
export class XcellXfs extends Node {
  render () {
    if (this.count) return super.render();
    return '';
  }
}

@props('applyAlignment', 'applyBorder', 'applyFont', 'applyFill', 'applyNumberFormat', 'applyProtection', 'borderId', 'fillId', 'fontId', 'numFmtId', 'xfId')
export class Xxf extends Node {
  constructor (attrs, children) {
    const defaults = {
      applyAlignment: false,
      applyBorder: false,
      applyFont: false,
      applyFill: false,
      applyNumberFormat: false,
      applyProtection: false,
      borderId: 0,
      fillId: 0,
      fontId: 0,
      numFmtId: 0
    };
    super({ ...defaults, ...attrs }, children);
    this.alignment = new Xalignment();
  }
  render () {
    if (this.alignment) {
      this.children = [this.alignment];
    }
    return super.render();
  }
  equals (o) {
    return this.applyAlignment === o.applyAlignment &&
      this.applyBorder === o.applyBorder &&
      this.applyFont === o.applyFont &&
      this.applyFill === o.applyFill &&
      this.applyProtection === o.applyProtection &&
      this.borderId === o.borderId &&
      this.fillId === o.fillId &&
      this.fontId === o.fontId &&
      this.numFmtId === o.numFmtId &&
      this.xfId === o.xfId &&
      this.alignment.equals(o.alignment);
  }
}

@props('horizontal', 'indent', 'shrinkToFit', 'textRotation', 'vertical', 'wrapText')
export class Xalignment extends Node {
  constructor (attrs, children = []) {
    const defaults = {
      horizontal: 'general',
      indent: 0,
      shrinkToFit: false,
      textRotation: 0,
      vertical: 'bottom',
      wrapText: false
    };
    super({ ...defaults, ...attrs }, children);
  }
  equals (o) {
    return this.horizontal === o.horizontal &&
      this.indent === o.indent &&
      this.shrinkToFit === o.shrinkToFit &&
      this.textRotation === o.textRotation &&
      this.vertical === o.vertical &&
      this.wrapText === o.wrapText;
  }
}
