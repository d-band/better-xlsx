import { props, Node } from './node';

@props('xmlns')
export class XRelationships extends Node {
  constructor ({ xmlns = 'http://schemas.openxmlformats.org/package/2006/relationships' }, children) {
    super({ xmlns }, children);
  }
}

@props('Id', 'Target', 'Type')
export class XRelationship extends Node {}

@props('xmlns', 'xmlns:r')
export class Xworkbook extends Node {
  constructor (attrs = {}, children) {
    attrs['xmlns'] = attrs['xmlns'] || 'http://schemas.openxmlformats.org/spreadsheetml/2006/main';
    attrs['xmlns:r'] = attrs['xmlns:r'] || 'http://schemas.openxmlformats.org/officeDocument/2006/relationships';
    super(attrs, children);
  }
}

@props('appName', 'lastEdited', 'lowestEdited', 'rupBuild')
export class XfileVersion extends Node {}

@props('defaultThemeVersion', 'backupFile', 'showObjects', 'date1904')
export class XworkbookPr extends Node {}

export class XworkbookProtection extends Node {}

export class XbookViews extends Node {}

@props('activeTab', 'firstSheet', 'showHorizontalScroll', 'showVerticalScroll', 'showSheetTabs', 'tabRatio', 'windowHeight', 'windowWidth', 'xWindow', 'yWindow')
export class XworkbookView extends Node {}

export class Xsheets extends Node {}

@props('name', 'sheetId', 'r:id', 'state')
export class Xsheet extends Node {}

@props('calcId', 'iterateCount', 'refMode', 'iterate', 'iterateDelta')
export class XcalcPr extends Node {}

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
  const fileVersion = new XfileVersion({ appName: 'JS XLSX' });
  const workbookPr = new XworkbookPr({ showObjects: 'all' });
  const bookViews = new XbookViews({}, [
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
  const calcPr = new XcalcPr({
    iterateCount: 100,
    iterate: false,
    iterateDelta: 0.001,
    refMode: 'A1'
  });

  workbook.children = [fileVersion, workbookPr, bookViews, calcPr];

  return workbook;
}
