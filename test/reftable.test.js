'use strict';

import { expect } from 'chai';
import { RefTable } from '../src/reftable';

describe('Test: reftable.js', () => {
  it('should reftable work ok', () => {
    const rt = new RefTable();
    // addString
    expect(rt.addString('foo')).to.equal(0);
    expect(rt.addString('bar')).to.equal(1);
    expect(rt.addString('foo')).to.equal(0);
    expect(rt.addString('bar')).to.equal(1);
    // getString
    expect(rt.getString(0)).to.equal('foo');
    expect(rt.getString(1)).to.equal('bar');
    // length
    expect(rt.length()).to.equal(2);
    // makeXsst
    const sst = rt.makeXsst();
    expect(sst.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><si><t>foo</t></si><si><t>bar</t></si></sst>');
  });
});
