import { props, Node, HEAD } from './node';

@props('xmlns')
export class XTypes extends Node {
  constructor ({ xmlns = 'http://schemas.openxmlformats.org/package/2006/content-types' }, children) {
    super({ xmlns }, children);
    this[HEAD] = '<?xml version="1.0" encoding="UTF-8"?>';
  }
}

@props('Extension', 'ContentType')
export class XDefault extends Node {}

@props('PartName', 'ContentType')
export class XOverride extends Node {}

export function makeXTypes (types = new XTypes({})) {
  const defaults = [{
    Extension: 'rels',
    ContentType: 'application/vnd.openxmlformats-package.relationships+xml'
  }, {
    Extension: 'xml',
    ContentType: 'application/xml'
  }];

  for (const item of defaults) {
    types.children.push(new XDefault(item));
  }

  const overrides = [{
    PartName: '/_rels/.rels',
    ContentType: 'application/vnd.openxmlformats-package.relationships+xml'
  }, {
    PartName: '/docProps/app.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.extended-properties+xml'
  }, {
    PartName: '/docProps/core.xml',
    ContentType: 'application/vnd.openxmlformats-package.core-properties+xml'
  }, {
    PartName: '/xl/_rels/workbook.xml.rels',
    ContentType: 'application/vnd.openxmlformats-package.relationships+xml'
  }, {
    PartName: '/xl/sharedStrings.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml'
  }, {
    PartName: '/xl/styles.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml'
  }, {
    PartName: '/xl/workbook.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml'
  }, {
    PartName: '/xl/theme/theme1.xml',
    ContentType: 'application/vnd.openxmlformats-officedocument.theme+xml'
  }];

  for (const override of overrides) {
    types.children.push(new XOverride(override));
  }
  return types;
}
