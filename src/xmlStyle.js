import { props, Node, HEAD } from './node';

@props('xmlns')
export class XstyleSheet extends Node {
  constructor ({ xmlns = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main' }, children) {
    super({ xmlns }, children);
    this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
  }
  addFont () {
    // TODO
  }
  addFill () {
    // TODO
  }
  addBorder () {
    // TODO
  }
  addXxf () {
    // TODO
  }
  newNumFmt () {
    // TODO
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

@props('count')
export class Xfills extends Node {}

@props('patternFill')
export class Xfill extends Node {
  render () {
    return `<fill>${this.patternFill.render()}</fill>`;
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
export class Xborders extends Node {}

@props('left', 'right', 'top', 'bottom')
export class Xborder extends Node {
  _renderLine (pos) {
    const posVal = this[pos];
    if (!posVal) return '';

    let str = `<${pos} style="${posVal.style}">`;
    if (posVal.color) str += `<color rgb="${posVal.color}"/>`;
    return str + `<${pos}>`;
  }
  render () {
    let str = '<border>';
    str += this._renderLine('left');
    str += this._renderLine('right');
    str += this._renderLine('top');
    str += this._renderLine('bottom');
    return str + '</border>';
  }
}

@props('count')
export class XcellStyles extends Node {}

@props('builtInId', 'customBuiltIn', 'hidden', 'iLevel', 'name', 'xfId')
export class XcellStyle extends Node {}

@props('count')
export class XcellStyleXfs extends Node {}

@props('count')
export class XcellXfs extends Node {}

@props('applyAlignment', 'applyBorder', 'applyFont', 'applyFill', 'applyNumberFormat', 'applyProtection', 'borderId', 'fillId', 'fontId', 'numFmtId', 'xfId')
export class Xxf extends Node {
  alignment = null;
  render () {
    if (this.alignment) {
      this.children = [this.alignment];
    }
    return super.render();
  }
}

@props('horizontal', 'indent', 'shrinkToFit', 'textRotation', 'vertical', 'wrapText')
export class Xalignment extends Node {}
