import { props, Node } from './node';

@props('xmlns')
export class XmlTypes extends Node {
  constructor ({ xmlns = 'http://schemas.openxmlformats.org/package/2006/content-types' }, children) {
    super({ xmlns }, children);
  }
}

@props('Extension', 'ContentType')
export class XmlDefault extends Node {}

@props('PartName', 'ContentType')
export class XmlOverride extends Node {}

export function makeXmlTypes (types = new XmlTypes({})) {
  types.children.push(new XmlDefault({
    Extension: 'rels',
    ContentType: 'application/vnd.openxmlformats-package.relationships+xml'
  }));
  types.children.push(new XmlDefault({
    Extension: 'xml',
    ContentType: 'application/xml'
  }));
  return types;
}
