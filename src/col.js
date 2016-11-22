import { NumFmt } from './lib';

export class Col {
  outlineLevel = 0;
  numFmt = null;
  style = null;

  constructor ({ min, max, hidden = false, collapsed = false, width = 9.5 }) {
    this.min = min;
    this.max = max;
    this.hidden = hidden;
    this.collapsed = collapsed;
    this.width = width;
    // TODO
    this.style = null;
  }
  setType (cellType) {
    this.numFmt = NumFmt[cellType];
  }
}
