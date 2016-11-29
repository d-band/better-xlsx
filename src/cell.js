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

export class Cell {
  _value = '';
  _style = null;
  formula = '';
  numFmt = '';
  date1904 = false;
  hidden = false;
  hMerge = 0;
  vMerge = 0;
  cellType = 'TypeString';

  constructor ({ row }) {
    this.row = row;
  }
  get style () {
    if (this._style === null) {
      this._style = new Style();
    }
    return this._style;
  }
  set style (s) {
    this._style = s;
  }
  get value () {
    return this._value;
  }
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
  setString (v) {
    this._value = v;
    this.formula = '';
    this.cellType = 'TypeString';
  }
  setDate (v) {
    this._value = parseInt(toExcelTime(v));
    this.formula = '';
    this.numFmt = NumFmt[14];
    this.cellType = 'TypeDate';
  }
  setDateTime (v) {
    this._value = toExcelTime(v);
    this.formula = '';
    this.numFmt = NumFmt[22];
    this.cellType = 'TypeDate';
  }
  setNumber (v) {
    this._value = v;
    this.formula = '';
    this.numFmt = NumFmt[0];
    this.cellType = 'TypeNumeric';
  }
  setBool (v) {
    this._value = v ? 1 : 0;
    this.cellType = 'TypeBool';
  }
  setFormula (f) {
    this.formula = f;
    this.cellType = 'TypeFormula';
  }
}
