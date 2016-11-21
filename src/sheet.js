import { makeXworksheet } from './xmlWorksheet';

export class Sheet {
  constructor ({ name, file, selected }) {
    this.name = name;
    this.file = file;
    this.selected = selected;
  }
  makeXSheet (refTable, styles) {
    const sheet = makeXworksheet();
    return sheet;
  }
}
