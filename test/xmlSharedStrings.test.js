'use strict';

import { expect } from 'chai';
import { Xsst, Xsi, Xt, Xr } from '../src/xmlSharedStrings';

describe('Test: xmlSharedStrings.js', () => {
  it('should Xsst render', () => {
    const sst = new Xsst({});
    const si1 = new Xsi();
    const si2 = new Xsi();
    sst.children = [si1, si2];
    si1.children = [new Xt({ 'xml:space': 'preserve' })];
    si2.children = [new Xr()];
    expect(sst.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><si><t xml:space="preserve"/></si><si><r/></si></sst>');
  });
});
