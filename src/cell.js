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
  style = null;
  cellType = 'TypeString';

  constructor ({ row }) {
    this.row = row;
  }
}
