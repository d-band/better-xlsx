import { Cell } from './cell';

/**
 * Row of the sheet.
 * ```js
 * const row = sheet.addRow();
 * row.setHeightCM(0.8);
 * ```
 */
export class Row {
  cells = [];
  hidden = false;
  /**
   * Row height
   * @type {Number}
   */
  height = 0;
  outlineLevel = 0;
  isCustom = false;

  constructor ({ sheet }) {
    this.sheet = sheet;
  }
  /**
   * Set height of the Row with `cm` unit.
   * @param {Number} ht Height with `cm` unit
   */
  setHeightCM (ht) {
    this.height = ht * 28.3464567;
    this.isCustom = true;
  }
  /**
   * Create a cell and add it into the Row.
   * @return {Cell}
   */
  addCell () {
    const cell = new Cell({ row: this });
    this.cells.push(cell);
    this.sheet.maybeAddCol(this.cells.length);
    return cell;
  }
}
