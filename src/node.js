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
            this.attributes = new Map();
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
  constructor (attributes, children) {
    for (const key of Object.keys(attributes)) {
      this[key] = attributes[key];
    }
    this.children = children || [];
  }
  _xmlName () {
    return this.constructor.name.substring(3);
  }
  render () {
    function walk (tree) {
      const name = tree._xmlName();
      let tokens = [];
      tokens.push(`<${name}`);
      const keys = tree.attributes && Object.keys(tree.attributes);
      if (keys && keys.length) {
        for (let i = 0; i < keys.length; i++) {
          const v = tree.attributes[keys[i]];
          tokens.push(` ${keys[i]}="${v}"`);
        }
      }
      const children = tree.children;
      if (!(children && children.length)) {
        tokens.push('/>');
        return tokens;
      }
      tokens.push('>');
      for (const child of tree.children) {
        tokens = tokens.concat(walk(child));
      }
      tokens.push(`</${name}>`);
      return tokens;
    }
    return walk(this).join('');
  }
}
