import { Style } from './style';
import { toExcelTime, NumFmt } from './lib';
import kind from 'kind-of';

export const CellType = {
  TypeString: 49,
  TypeFormula: 0,
  TypeNumeric: 1,
  TypeBool: 0,
  TypeInline: 0,
  TypeError: 0,
  TypeDate: 14,
  TypeGeneral: 0
};

/**
 * Cell intended to provide user access to the contents of Cell within an xlsx.Row.
 *
 * ```js
 * const cell = row.addCell();
 * cell.value = 'I am a cell!';
 * cell.hMerge = 2;
 * cell.vMerge = 1;
 * cell.style.fill.patternType = 'solid';
 * cell.style.fill.fgColor = '00FF0000';
 * cell.style.fill.bgColor = 'FF000000';
 * cell.style.align.h = 'center';
 * cell.style.align.v = 'center';
 * ```
 *
 * Set the cell value
 *
 * ```js
 * const cell = row.addCell();
 * // Date type
 * cell.setDate(new Date());
 * // Number type
 * cell.setNumber(123456);
 * cell.numFmt = '$#,##0.00';
 * ```
 */
export class Cell {
  _value = '';
  _style = null;
  formula = '';
  /**
   * Number format @see {@link NumFmt}
   * @type {String}
   */
  numFmt = '';
  date1904 = false;
  /**
   * Hide the cell.
   * @type {Boolean}
   */
  hidden = false;
  /**
   * Horizontal merge with other cells.
   * @type {Number}
   */
  hMerge = 0;
  /**
   * Vertical merge with other cells.
   * @type {Number}
   */
  vMerge = 0;
  cellType = 'TypeString';

  /**
   * Create a cell and add it to a row.
   * @private
   * @param  {Object} options.row Row of add to
   */
  constructor ({ row }) {
    this.row = row;
  }
  /**
   * Get the cell style.
   * @return {Style}
   */
  get style () {
    if (this._style === null) {
      this._style = new Style();
    }
    return this._style;
  }
  /**
   * Set the style of the cell.
   * @param  {Style} s
   */
  set style (s) {
    this._style = s;
  }
  /**
   * Get the cell value.
   */
  get value () {
    return this._value;
  }
  /**
   * Set the cell value.
   * @param  {String|Date|Number|Boolean} v
   */
  set value (v) {
    const t = kind(v);
    if (t === 'null' || t === 'undefined') {
      return this.setString('');
    }
    if (t === 'date') {
      return this.setDateTime(v);
    }
    if (t === 'number') {
      return this.setNumber(v);
    }
    if (t === 'string') {
      return this.setString(v);
    }
    if (t === 'boolean') {
      return this.setBool(v);
    }
    return this.setString(v.toString());
  }
  /**
   * Set cell value with String type.
   * @param {String} v
   */
  setString (v) {
    this._value = v;
    this.formula = '';
    this.cellType = 'TypeString';
  }
  /**
   * Set cell value with Date type.
   * @param {Date} v
   */
  setDate (v) {
    this._value = parseInt(toExcelTime(v));
    this.formula = '';
    this.numFmt = NumFmt[14];
    this.cellType = 'TypeDate';
  }
  /**
   * Set cell value with DateTime type.
   * @param {Date} v
   */
  setDateTime (v) {
    this._value = toExcelTime(v);
    this.formula = '';
    this.numFmt = NumFmt[22];
    this.cellType = 'TypeDate';
  }
  /**
   * Set cell value with Number type.
   * @param {Number} v
   */
  setNumber (v) {
    this._value = v;
    this.formula = '';
    this.numFmt = NumFmt[0];
    this.cellType = 'TypeNumeric';
  }
  /**
   * Set cell value with Boolean type.
   * @param {Boolean} v
   */
  setBool (v) {
    this._value = v ? 1 : 0;
    this.cellType = 'TypeBool';
  }
  /**
   * Set cell formula.
   * @param {String} f - Formula like `B2*C2-D2`.
   */
  setFormula (f) {
    this.formula = f;
    this.cellType = 'TypeFormula';
  }
}
