export function props (...attrs) {
  return function (clazz) {
    const target = clazz.prototype || clazz;

    for (const name of attrs) {
      Object.defineProperty(target, name, {
        get () {
          if (this.attributes) {
            return this.attributes[name];
          }
        },
        set (value) {
          if (this.attributes === undefined) {
            this.attributes = {};
          }
          this.attributes[name] = value;
        },
        configurable: true,
        enumerable: true
      });
    }

    return clazz;
  };
}

export class Node {
  constructor (attributes = {}, children = [], xmlName) {
    for (const key of Object.keys(attributes)) {
      this[key] = attributes[key];
    }
    this.children = children;
    this._xmlName = xmlName || this.constructor.name.substring(1);
  }
  render () {
    function walk (tree) {
      const name = tree._xmlName;

      let tokens = [];
      tokens.push(`<${name}`);

      const keys = tree.attributes && Object.keys(tree.attributes);
      if (keys && keys.length) {
        for (const key of keys) {
          const v = tree.attributes[key];
          tokens.push(` ${key}="${v}"`);
        }
      }

      const children = tree.children;
      if (!children.length) {
        tokens.push('/>');
        return tokens;
      }
      tokens.push('>');
      for (const child of tree.children) {
        tokens.push(child.render());
      }
      tokens.push(`</${name}>`);
      return tokens;
    }
    return walk(this).join('');
  }
}
