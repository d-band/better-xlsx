import { props, Node, HEAD } from './node';

@props('xmlns', 'count', 'uniqueCount')
export class Xsst extends Node {
  constructor ({ xmlns = 'http://schemas.openxmlformats.org/spreadsheetml/2006/main' }, children) {
    super({ xmlns }, children);
    this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
  }
}

export class Xsi extends Node {}

@props('xml:space')
export class Xt extends Node {}

export class Xr extends Node {}
