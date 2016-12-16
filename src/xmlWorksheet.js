import { props, Node, HEAD } from './node';

@props('xmlns', 'xmlns:r')
export class Xworksheet extends Node {
  sheetPr = null;
  sheetViews = null;
  sheetFormatPr = null;
  printOptions = null;
  pageMargins = null;
  pageSetup = null;
  headerFooter = null;
  mergeCells = null;
  dimension = null;
  cols = null;
  sheetData = null;

  constructor (attrs = {}, children) {
    attrs['xmlns'] = attrs['xmlns'] || 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
    attrs['xmlns:r'] = attrs['xmlns:r'] || 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
    super(attrs, children);
    this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
  }
  render () {
    this.children = [];
    if (this.sheetPr) this.children.push(this.sheetPr);
    if (this.dimension) this.children.push(this.dimension);
    if (this.sheetViews) this.children.push(this.sheetViews);
    if (this.sheetFormatPr) this.children.push(this.sheetFormatPr);
    if (this.cols) this.children.push(this.cols);
    if (this.sheetData) this.children.push(this.sheetData);
    if (this.mergeCells) this.children.push(this.mergeCells);
    if (this.printOptions) this.children.push(this.printOptions);
    if (this.pageMargins) this.children.push(this.pageMargins);
    if (this.pageSetup) this.children.push(this.pageSetup);
    if (this.headerFooter) this.children.push(this.headerFooter);
    return super.render();
  }
}

@props('filterMode')
export class XsheetPr extends Node {}

@props('fitToPage')
export class XpageSetUpPr extends Node {}

@props('ref')
export class Xdimension extends Node {}

export class XsheetViews extends Node {}

@props('windowProtection', 'showFormulas', 'showGridLines', 'showRowColHeaders', 'showZeros', 'rightToLeft', 'tabSelected', 'showOutlineSymbols', 'defaultGridColor', 'view', 'topLeftCell', 'colorId', 'zoomScale', 'zoomScaleNormal', 'zoomScalePageLayoutView', 'workbookViewId')
export class XsheetView extends Node {}

@props('pane', 'activeCell', 'activeCellId', 'sqref')
export class Xselection extends Node {}

@props('xSplit', 'ySplit', 'topLeftCell', 'activePane', 'state')
export class Xpane extends Node {}

@props('defaultColWidth', 'defaultRowHeight', 'outlineLevelCol', 'outlineLevelRow')
export class XsheetFormatPr extends Node {}

export class Xcols extends Node {}

@props('collapsed', 'hidden', 'max', 'min', 'style', 'width', 'customWidth', 'outlineLevel')
export class Xcol extends Node {}

export class XsheetData extends Node {}

@props('r', 'spans', 'hidden', 'ht', 'customHeight', 'outlineLevel')
export class Xrow extends Node {}

@props('r', 's', 't')
export class Xc extends Node {
  constructor (attrs, children) {
    super(attrs, children);
    this.f = null;
    this.v = null;
  }
  render () {
    if (this.f !== null) this.children.push(this.f);
    if (this.v !== null) this.children.push(new Node({}, [this.v], 'v'));
    return super.render();
  }
}

@props('t', 'ref', 'si')
export class Xf extends Node {}

@props('count')
export class XmergeCells extends Node {}

@props('ref')
export class XmergeCell extends Node {}

@props('headings', 'gridLines', 'gridLinesSet', 'horizontalCentered', 'verticalCentered')
export class XprintOptions extends Node {}

@props('left', 'right', 'top', 'bottom', 'header', 'footer')
export class XpageMargins extends Node {}

@props('paperSize', 'scale', 'firstPageNumber', 'fitToWidth', 'fitToHeight', 'pageOrder', 'orientation', 'usePrinterDefaults', 'blackAndWhite', 'draft', 'cellComments', 'useFirstPageNumber', 'horizontalDpi', 'verticalDpi', 'copies')
export class XpageSetup extends Node {}

@props('differentFirst', 'differentOddEven')
export class XheaderFooter extends Node {
  constructor (attrs, children) {
    super(attrs, children);
    this.oddHeader = null;
    this.oddFooter = null;
  }
  render () {
    if (this.oddHeader !== null) this.children.push(new Node({}, [this.oddHeader], 'oddHeader'));
    if (this.oddFooter !== null) this.children.push(new Node({}, [this.oddFooter], 'oddFooter'));
    return super.render();
  }
}

export function makeXworksheet (sheet = new Xworksheet()) {
  sheet.sheetPr = new XsheetPr({ filterMode: false }, [
    new XpageSetUpPr({ fitToPage: false })
  ]);
  sheet.sheetViews = new XsheetViews({}, [
    new XsheetView({
      colorId: 64,
      defaultGridColor: true,
      rightToLeft: false,
      showFormulas: false,
      showGridLines: true,
      showOutlineSymbols: true,
      showRowColHeaders: true,
      showZeros: true,
      tabSelected: false,
      topLeftCell: 'A1',
      view: 'normal',
      windowProtection: false,
      workbookViewId: 0,
      zoomScale: 100,
      zoomScaleNormal: 100,
      zoomScalePageLayoutView: 100
    }, [
      new Xselection({
        activeCell: 'A1',
        activeCellId: 0,
        pane: 'topLeft',
        sqref: 'A1'
      })
    ])
  ]);
  sheet.sheetFormatPr = new XsheetFormatPr({ defaultRowHeight: '12.85' });
  sheet.printOptions = new XprintOptions({
    gridLines: false,
    gridLinesSet: true,
    headings: false,
    horizontalCentered: false,
    verticalCentered: false
  });
  sheet.pageMargins = new XpageMargins({
    left: 0.7875,
    right: 0.7875,
    top: 1.05277777777778,
    bottom: 1.05277777777778,
    header: 0.7875,
    footer: 0.7875
  });
  sheet.pageSetup = new XpageSetup({
    blackAndWhite: false,
    cellComments: 'none',
    copies: 1,
    draft: false,
    firstPageNumber: 1,
    fitToHeight: 1,
    fitToWidth: 1,
    horizontalDpi: 300,
    orientation: 'portrait',
    pageOrder: 'downThenOver',
    paperSize: 9,
    scale: 100,
    useFirstPageNumber: true,
    usePrinterDefaults: false,
    verticalDpi: 300
  });
  const headerFooter = new XheaderFooter();
  headerFooter.oddHeader = '&C&"Times New Roman,Regular"&12&A';
  headerFooter.oddFooter = '&C&"Times New Roman,Regular"&12Page &P';

  sheet.headerFooter = headerFooter;
  return sheet;
}
