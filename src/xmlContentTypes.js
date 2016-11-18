import { props, Node } from './node';

@props('xmlns')
export class Types extends Node {
  constructor ({ xmlns = 'http://schemas.openxmlformats.org/package/2006/content-types' }, children) {
    super({ xmlns }, children);
  }
}

@props('Extension', 'ContentType')
export class Default extends Node {}

@props('PartName', 'ContentType')
export class Override extends Node {}

export function makeTypes (types = new Types({})) {
  types.children.push(new Default({
    Extension: 'rels',
    ContentType: 'application/vnd.openxmlformats-package.relationships+xml'
  }));
  types.children.push(new Default({
    Extension: 'xml',
    ContentType: 'application/xml'
  }));
  return types;
}
