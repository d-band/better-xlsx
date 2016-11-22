import { Row } from './row';
import { Col } from './col';
import { makeXworksheet } from './xmlWorksheet';

export class Sheet {
  rows = [];
  cols = [];
  maxRow = 0;
  maxCol = 0;
  hidden = false;
  sheetViews = [];
  sheetFormat = {
    defaultColWidth: null,
    defaultRowHeight: null,
    outlineLevelCol: null,
    outlineLevelRow: null
  };
  constructor ({ name, file, selected }) {
    this.name = name;
    this.file = file;
    this.selected = selected;
  }
  addRow () {
    const row = new Row({ sheet: this });
    this.rows.push(row);
    if (this.rows.length > this.maxRow) {
      this.maxRow = this.rows.length;
    }
    return row;
  }
  maybeAddCol (cellCount) {
    if (cellCount > this.maxCol) {
      const col = new Col({
        min: cellCount,
        max: cellCount,
        hidden: false,
        collapsed: false
      });
      this.cols.push(col);
      this.maxCol = this.cols.length;
    }
  }
  col (idx) {
    this.maybeAddCol(idx + 1);
    return this.cols[idx];
  }
  cell (row, col) {
    for (let len = this.rows.length; len <= row; len++) {
      this.addRow();
    }
    const r = this.rows[row];
    for (let len = r.cells.length; len <= col; len++) {
      r.addCell();
    }
    return r.cells[col];
  }
  setColWidth (startcol, endcol, width) {
    if (startcol > endcol) {
      throw new Error(`Could not set width for range ${startcol}-${endcol}: startcol must be less than endcol.`);
    }
    const col = new Col({
      min: startcol + 1,
      max: endcol + 1,
      hidden: false,
      collapsed: false,
      width: width
    });
    this.cols.push(col);
    if (endcol + 1 > this.maxCol) {
      this.maxCol = endcol + 1;
    }
  }
  makeXSheet (refTable, styles) {
    const sheet = makeXworksheet();
    return sheet;
  }
}
