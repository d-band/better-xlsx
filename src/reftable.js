import { Xsst, Xsi, Xt } from './xmlSharedStrings';

export class RefTable {
  constructor () {
    this.strings = [];
    this.known = {};
  }
  makeXsst () {
    const len = this.strings.length;
    const sst = new Xsst({
      count: len,
      uniqueCount: len
    });
    for (const str of this.strings) {
      const si = new Xsi({}, [new Xt({}, [str])]);
      sst.children.push(si);
    }
    return sst;
  }
  addString (str) {
    if (this.known[str] === undefined) {
      const index = this.strings.length;
      this.strings.push(str);
      this.known[str] = index;
      return index;
    }
    return this.known[str];
  }
  getString (index) {
    return this.strings[index];
  }
  length () {
    return this.strings.length;
  }
}
