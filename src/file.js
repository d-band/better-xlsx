import { Sheet } from './sheet';
import * as templates from './templates';
import { RefTable } from './reftable';
import { makeXworkbook, Xsheets, Xsheet, makeWorkbookRels } from './xmlWorkbook';
import { makeXTypes, XOverride } from './xmlContentTypes';
import { XstyleSheet } from './xmlStyle';

export class File {
  sheet = {};
  sheets = [];
  definedNames = [];

  constructor (name) {
    this.name = name;
    this.styles = new XstyleSheet({});
  }
  addSheet (name) {
    if (this.sheet[name]) {
      throw new Error(`duplicate sheet name ${name}.`);
    }
    const sheet = new Sheet({
      name,
      file: this,
      selected: this.sheets.length === 0
    });
    this.sheet[name] = sheet;
    this.sheets.push(sheet);
    return sheet;
  }
  makeParts () {
    const parts = {};
    const refTable = new RefTable();
    const types = makeXTypes();
    const workbook = makeXworkbook();

    this.styles.reset();

    let i = 1;
    const sheets = new Xsheets();
    for (const sheet of this.sheets) {
      const xSheet = sheet.makeXSheet(refTable, this.styles);
      types.children.push(new XOverride({
        PartName: `/xl/worksheets/sheet${i}.xml`,
        ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml'
      }));
      sheets.children.push(new Xsheet({
        name: sheet.name,
        sheetId: i,
        'r:id': `rId${i}`,
        state: 'visible'
      }));
      parts[`xl/worksheets/sheet${i}.xml`] = xSheet.render();
      i++;
    }
    workbook.children.push(sheets);

    parts['xl/workbook.xml'] = workbook.render();
    parts['_rels/.rels'] = templates.DOT_RELS;
    parts['docProps/app.xml'] = templates.DOCPROPS_APP;
    parts['docProps/core.xml'] = templates.DOCPROPS_CORE;
    parts['xl/theme/theme1.xml'] = templates.XL_THEME_THEME;

    parts['xl/sharedStrings.xml'] = refTable.makeXsst().render();
    parts['xl/_rels/workbook.xml.rels'] = makeWorkbookRels(this.sheets.length).render();
    parts['[Content_Types].xml'] = types.render();
    parts['xl/styles.xml'] = this.styles.render();

    return parts;
  }
}
