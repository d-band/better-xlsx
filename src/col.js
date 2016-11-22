export class Col {
  constructor ({ min, max, hidden = false, collapsed = false, width = 9.5 }) {
    this.min = min;
    this.max = max;
    this.hidden = hidden;
    this.collapsed = collapsed;
    this.width = width;
    // TODO
    this.style = null;
  }
}
