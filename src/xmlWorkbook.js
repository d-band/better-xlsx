import { props, Node, HEAD } from './node';

export @props('xmlns')
class XRelationships extends Node {
  constructor ({ xmlns = 'http://schemas.openxmlformats.org/package/2006/relationships' }, children) {
    super({ xmlns }, children);
    this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
  }
}

export @props('Id', 'Target', 'Type')
class XRelationship extends Node {}

export @props('xmlns', 'xmlns:r')
class Xworkbook extends Node {
  fileVersion = null;
  workbookPr = null;
  bookViews = null;
  sheets = null;
  calcPr = null;

  constructor (attrs = {}, children) {
    attrs['xmlns'] = attrs['xmlns'] || 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
    attrs['xmlns:r'] = attrs['xmlns:r'] || 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
    super(attrs, children);
    this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
  }
  render () {
    this.children = [];
    if (this.fileVersion) this.children.push(this.fileVersion);
    if (this.workbookPr) this.children.push(this.workbookPr);
    if (this.bookViews) this.children.push(this.bookViews);
    if (this.sheets) this.children.push(this.sheets);
    if (this.calcPr) this.children.push(this.calcPr);
    return super.render();
  }
}

export @props('appName', 'lastEdited', 'lowestEdited', 'rupBuild')
class XfileVersion extends Node {}

export @props('defaultThemeVersion', 'backupFile', 'showObjects', 'date1904')
class XworkbookPr extends Node {}

export class XworkbookProtection extends Node {}

export class XbookViews extends Node {}

export @props('activeTab', 'firstSheet', 'showHorizontalScroll', 'showVerticalScroll', 'showSheetTabs', 'tabRatio', 'windowHeight', 'windowWidth', 'xWindow', 'yWindow')
class XworkbookView extends Node {}

export class Xsheets extends Node {}

export @props('name', 'sheetId', 'r:id', 'state')
class Xsheet extends Node {}

export @props('calcId', 'iterateCount', 'refMode', 'iterate', 'iterateDelta')
class XcalcPr extends Node {}

export function makeWorkbookRels (sheetCount) {
  const rels = new XRelationships({});
  for (let i = 1; i <= sheetCount; i++) {
    rels.children.push(new XRelationship({
      Id: `rId${i}`,
      Target: `worksheets/sheet${i}.xml`,
      Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet'
    }));
  }
  rels.children.push(new XRelationship({
    Id: `rId${sheetCount + 1}`,
    Target: 'sharedStrings.xml',
    Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings'
  }));
  rels.children.push(new XRelationship({
    Id: `rId${sheetCount + 2}`,
    Target: 'theme/theme1.xml',
    Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme'
  }));
  rels.children.push(new XRelationship({
    Id: `rId${sheetCount + 3}`,
    Target: 'styles.xml',
    Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles'
  }));
  return rels;
}

export function makeXworkbook () {
  const workbook = new Xworkbook();
  workbook.fileVersion = new XfileVersion({ appName: 'JS XLSX' });
  workbook.workbookPr = new XworkbookPr({ showObjects: 'all' });
  workbook.bookViews = new XbookViews({}, [
    new XworkbookView({
      showHorizontalScroll: true,
      showSheetTabs: true,
      showVerticalScroll: true,
      tabRatio: 204,
      windowHeight: 8192,
      windowWidth: 16384,
      xWindow: 0,
      yWindow: 0
    })
  ]);
  workbook.calcPr = new XcalcPr({
    iterateCount: 100,
    iterate: false,
    iterateDelta: 0.001,
    refMode: 'A1'
  });

  return workbook;
}
