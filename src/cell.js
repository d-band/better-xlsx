import { Style } from './style';

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
  value = '';
  formula = '';
  numFmt = '';
  date1904 = false;
  hidden = false;
  hMerge = 0;
  vMerge = 0;
  _style = null;
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
}
