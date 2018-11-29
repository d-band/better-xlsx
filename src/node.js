function attrEscape (str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/\t/g, '&#x9;')
    .replace(/\n/g, '&#xA;')
    .replace(/\r/g, '&#xD;');
}
function escape (str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\r/g, '&#xD;');
}

export const HEAD = Symbol('head');

export function props (...keys) {
  return (target) => {
    for (const key of keys) {
      target.elements.push({
        key,
        kind: 'method',
        placement: 'prototype',
        descriptor: {
          get () {
            if (this.attributes) {
              return this.attributes[key];
            }
          },
          set (value) {
            if (this.attributes === undefined) {
              this.attributes = {};
            }
            this.attributes[key] = value;
          },
          configurable: true,
          enumerable: true
        }
      });
    }
    return target;
  };
}

export class Node {
  constructor (attributes = {}, children = [], name) {
    for (const key of Object.keys(attributes)) {
      this[key] = attributes[key];
    }
    this.children = children;
    this.__name = name || this.constructor.name.substring(1);
  }
  render () {
    function walk (tree) {
      const name = tree.__name;
      const { attributes, children } = tree;
      const tokens = [];

      if (tree[HEAD]) {
        tokens.push(tree[HEAD]);
      }
      tokens.push(`<${name}`);

      for (const key of Object.keys(attributes || {})) {
        let v = attributes[key];
        if (v === undefined) continue;
        if (typeof v === 'string') {
          v = attrEscape(v);
        }
        if (typeof v === 'boolean') {
          v = v ? 1 : 0;
        }
        tokens.push(` ${key}="${v}"`);
      }

      if (!children.length) {
        tokens.push('/>');
        return tokens;
      }
      tokens.push('>');
      for (const child of children) {
        if (child instanceof Node) {
          tokens.push(child.render());
        } else if (typeof child === 'string') {
          tokens.push(escape(child));
        } else {
          tokens.push(child.toString());
        }
      }
      tokens.push(`</${name}>`);
      return tokens;
    }
    return walk(this).join('');
  }
}
