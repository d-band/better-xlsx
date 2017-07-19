import { Row } from './row';
import { Col } from './col';
import { num2col, handleStyle, handleNumFmtId } from './lib';
import { makeXworksheet, XsheetData, Xpane, Xcols, Xcol, Xrow, Xdimension, Xc, Xf, XmergeCells, XmergeCell } from './xmlWorksheet';

/**
 * Sheet of the xlsx file.
 * ```js
 * import { File } from 'better-xlsx';
 * const file = new File();
 * const sheet = file.addSheet('Sheet-1');
 * const row = sheet.addRow();
 * const cell = row.addCell();
 * ```
 */
export class Sheet {
  rows = [];
  cols = [];
  maxRow = 0;
  maxCol = 0;
  hidden = false;
  sheetViews = [];
  sheetFormat = {
    defaultColWidth: 0,
    defaultRowHeight: 0,
    outlineLevelCol: 0,
    outlineLevelRow: 0
  };
  constructor ({ name, file, selected }) {
    this.name = name;
    this.file = file;
    this.selected = selected;
  }
  /**
   * Create a Row and add it into the Sheet.
   * @return {Row}
   */
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
      this.maxCol = cellCount;
    }
  }
  /**
   * Get Col of the sheet with index and create cols when `index > maxCol`.
   * @param  {Number} idx Index of the Col [from 0].
   * @return {Col}
   */
  col (idx) {
    this.maybeAddCol(idx + 1);
    return this.cols[idx];
  }
  /**
   * Get Row of the sheet with index and create rows when `index > maxRow`.
   * @param  {Number} idx Index of the Row [from 0].
   * @return {Row}
   */
  row (idx) {
    for (let len = this.rows.length; len <= idx; len++) {
      this.addRow();
    }
    return this.rows[idx];
  }
  /**
   * Get Cell of the sheet with `(row, col)` and create cell when out of range.
   * @param  {Number} row
   * @param {Number} col
   * @return {Cell}
   */
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
  /**
   * Set columns width from `startcol` to `endcol`.
   * @param {Number} startcol
   * @param {Number} endcol
   * @param {Number} width
   */
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
  handleMerged () {
    const merged = [];
    for (let r = 0; r < this.rows.length; r++) {
      const row = this.rows[r];
      for (let c = 0; c < row.cells.length; c++) {
        const cell = row.cells[c];
        if (cell.hMerge > 0 || cell.vMerge > 0) {
          merged.push({ r, c, cell });
        }
      }
    }
    for (const { r, c, cell } of merged) {
      const left = cell.style.border.left;
      const right = cell.style.border.right;
      const top = cell.style.border.top;
      const bottom = cell.style.border.bottom;

      cell.style.border.left = 'none';
      cell.style.border.right = 'none';
      cell.style.border.top = 'none';
      cell.style.border.bottom = 'none';

      for (let rownum = 0; rownum <= cell.vMerge; rownum++) {
        for (let colnum = 0; colnum <= cell.hMerge; colnum++) {
          const tmpcell = this.cell(r + rownum, c + colnum);
          tmpcell.style.applyBorder = true;
          if (rownum === 0) {
            tmpcell.style.border.top = top;
          }
          if (rownum === cell.vMerge) {
            tmpcell.style.border.bottom = bottom;
          }
          if (colnum === 0) {
            tmpcell.style.border.left = left;
          }
          if (colnum === cell.hMerge) {
            tmpcell.style.border.right = right;
          }
        }
      }
    }
  }
  makeXSheet (refTable, styles) {
    const sheet = makeXworksheet();
    const xSheet = new XsheetData();
    let maxRow = 0;
    let maxCell = 0;
    let maxLevelCol;
    let maxLevelRow;

    this.handleMerged();

    for (let i = 0; i < this.sheetViews.length; i++) {
      const view = this.sheetViews[i];
      if (view && view.pane) {
        sheet.sheetViews.children[i].children.push(new Xpane({
          xSplit: view.pane.xSplit,
          ySplit: view.pane.ySplit,
          topLeftCell: view.pane.topLeftCell,
          activePane: view.pane.activePane,
          state: view.pane.state
        }));
      }
    }
    if (this.selected) {
      sheet.sheetViews.children[0].tabSelected = true;
    }
    if (this.sheetFormat.defaultRowHeight !== 0) {
      sheet.sheetFormatPr.defaultRowHeight = this.sheetFormat.defaultRowHeight;
    }
    if (this.sheetFormat.defaultColWidth !== 0) {
      sheet.sheetFormatPr.defaultColWidth = this.sheetFormat.defaultColWidth;
    }

    const fIdList = [];
    sheet.cols = new Xcols();
    for (let c = 0; c < this.cols.length; c++) {
      const col = this.cols[c];
      col.min = col.min || 1;
      col.max = col.max || 1;
      const xNumFmt = styles.newNumFmt(col.numFmt);
      const fId = handleStyle(col.style, xNumFmt.numFmtId, styles);

      fIdList.push(fId);

      let customWidth = 0;
      if (col.width === 0) {
        col.width = 9.5;
      } else {
        customWidth = 1;
      }
      sheet.cols.children.push(new Xcol({
        min: col.min,
        max: col.max,
        hidden: col.hidden,
        width: col.width,
        customWidth: customWidth,
        collapsed: col.collapsed,
        outlineLevel: col.outlineLevel,
        style: fId
      }));

      if (col.outlineLevel > maxLevelCol) {
        maxLevelCol = col.outlineLevel;
      }
    }
    for (let r = 0; r < this.rows.length; r++) {
      const row = this.rows[r];
      if (r > maxRow) maxRow = r;
      const xRow = new Xrow({ r: r + 1 });
      if (row.isCustom) {
        xRow.customHeight = true;
        xRow.ht = row.height;
      }
      xRow.outlineLevel = row.outlineLevel;
      if (row.outlineLevel > maxLevelRow) {
        maxLevelRow = row.outlineLevel;
      }
      for (let c = 0; c < row.cells.length; c++) {
        let fId = fIdList[c];
        const cell = row.cells[c];
        const xNumFmt = styles.newNumFmt(cell.numFmt);
        const style = cell.style;
        if (style !== null) {
          fId = handleStyle(style, xNumFmt.numFmtId, styles);
        } else if (cell.numFmt && this.cols[c].numFmt !== cell.numFmt) {
          fId = handleNumFmtId(xNumFmt.NumFmtId, styles);
        }

        if (c > maxCell) maxCell = c;

        const xC = new Xc({ r: `${num2col(c)}${r + 1}` });
        switch (cell.cellType) {
          case 'TypeString':
            if (cell.value) {
              xC.v = refTable.addString(cell.value);
            }
            xC.t = 's';
            xC.s = fId;
            break;
          case 'TypeBool':
            xC.v = cell.value;
            xC.t = 'b';
            xC.s = fId;
            break;
          case 'TypeNumeric':
            xC.v = cell.value;
            xC.s = fId;
            break;
          case 'TypeDate':
            xC.v = cell.value;
            xC.s = fId;
            break;
          case 'TypeFormula':
            xC.v = cell.value;
            xC.f = new Xf({}, [cell.formula]);
            xC.s = fId;
            break;
          case 'TypeError':
            xC.v = cell.value;
            xC.f = new Xf({}, [cell.formula]);
            xC.t = 'e';
            xC.s = fId;
            break;
          case 'TypeGeneral':
            xC.v = cell.value;
            xC.s = fId;
            break;
        }
        xRow.children.push(xC);
        if (cell.hMerge > 0 || cell.vMerge > 0) {
          // r == rownum, c == colnum
          const start = `${num2col(c)}${r + 1}`;
          const endcol = c + cell.hMerge;
          const endrow = r + cell.vMerge + 1;
          const end = `${num2col(endcol)}${endrow}`;
          const mc = new XmergeCell({ ref: start + ':' + end });
          if (sheet.mergeCells === null) {
            sheet.mergeCells = new XmergeCells();
          }
          sheet.mergeCells.children.push(mc);
        }
      }
      xSheet.children.push(xRow);
    }
    // Update sheet format with the freshly determined max levels
    this.sheetFormat.outlineLevelCol = maxLevelCol;
    this.sheetFormat.outlineLevelRow = maxLevelRow;
    // .. and then also apply this to the xml worksheet
    sheet.sheetFormatPr.outlineLevelCol = this.sheetFormat.outlineLevelCol;
    sheet.sheetFormatPr.outlineLevelRow = this.sheetFormat.outlineLevelRow;

    if (sheet.mergeCells !== null) {
      sheet.mergeCells.count = sheet.mergeCells.children.length;
    }

    sheet.sheetData = xSheet;

    const dimension = new Xdimension({
      ref: `A1:${num2col(maxCell)}${maxRow + 1}`
    });
    if (dimension.ref === 'A1:A1') {
      dimension.ref = 'A1';
    }
    sheet.dimension = dimension;
    return sheet;
  }
}
