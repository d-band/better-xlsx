import { Cell } from './cell';

export class Row {
  cells = [];
  hidden = false;
  height = 0;
  outlineLevel = 0;
  isCustom = false;

  constructor ({ sheet }) {
    this.sheet = sheet;
  }
  setHeightCM (ht) {
    this.height = ht * 28.3464567;
    this.isCustom = true;
  }
  addCell () {
    const cell = new Cell({ row: this });
    this.cells.push(cell);
    this.sheet.maybeAddCol(this.cells.length);
    return cell;
  }
}
