import { NumFmt } from './lib';
import { Style } from './style';

/**
 * The column of the Sheet.
 *
 * ```js
 * const col = sheet.col(0);
 * col.width = 20;
 * col.style.fill.patternType = 'solid';
 * col.style.fill.fgColor = '00FF0000';
 * col.style.fill.bgColor = 'FF000000';
 * col.style.align.h = 'center';
 * col.style.align.v = 'center';
 * ```
 */
export class Col {
  outlineLevel = 0;
  /**
   * Number format for all column @see {@link NumFmt}
   * @type {String}
   */
  numFmt = '';

  constructor ({ min, max, hidden = false, collapsed = false, width = 0 }) {
    this.min = min;
    this.max = max;
    this.hidden = hidden;
    this.collapsed = collapsed;
    /**
     * Column width [default 9.5]
     * @type {Number}
     */
    this.width = width;
    /**
     * Style of the column.
     * @type {Style}
     */
    this.style = new Style();
  }
  setType (cellType) {
    this.numFmt = NumFmt[cellType];
  }
}
