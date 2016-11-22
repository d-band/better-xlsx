import { NumFmt } from './lib';
import { Style } from './style';

export class Col {
  outlineLevel = 0;
  numFmt = '';

  constructor ({ min, max, hidden = false, collapsed = false, width = 0 }) {
    this.min = min;
    this.max = max;
    this.hidden = hidden;
    this.collapsed = collapsed;
    this.width = width;
    this.style = new Style();
  }
  setType (cellType) {
    this.numFmt = NumFmt[cellType];
  }
}
