'use strict';

import { expect } from 'chai';
import { add, syncRun } from '../src';

describe('Test: index.js', () => {
  it('should add return 3', () => {
    expect(add(1, 2)).to.equal(3);
  });
  it('should syncRun return 1', (done) => {
    syncRun().then((data) => {
      expect(data).to.equal(1);
      done();
    });
  });
});
