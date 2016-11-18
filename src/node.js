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
  render () {
    return `<${this.constructor.name} />`;
  }
}
