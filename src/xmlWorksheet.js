import { props, Node } from './node';

@props('xmlns', 'xmlns:r')
export class Xworksheet extends Node {
  constructor (attrs = {}, children) {
    attrs['xmlns'] = attrs['xmlns'] || 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
    attrs['xmlns:r'] = attrs['xmlns:r'] || 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
    super(attrs, children);
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
  f = null;
  v = null;
  render () {
    this.children = [];
    if (this.f) this.children.push(this.f);
    if (this.v) this.children.push(new Node({}, [this.v], 'v'));
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
  oddHeader = null;
  oddFooter = null;
  render () {
    this.children = [];
    if (this.oddHeader) this.children.push(new Node({}, [this.oddHeader], 'oddHeader'));
    if (this.oddFooter) this.children.push(new Node({}, [this.oddFooter], 'oddFooter'));
    return super.render();
  }
}
