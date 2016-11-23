'use strict';

import { expect } from 'chai';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import streamEqual from 'stream-equal';
import { File } from '../src/file';
import { Style } from '../src/style';
import Zip from 'jszip';

Zip.defaults.date = new Date(Date.UTC(2016, 10, 23, 0, 0, 0));

describe('Test: file.js', () => {
  it('should saveAs buffer', (done) => {
    const file = new File();
    const sheet = file.addSheet('hello');
    const row = sheet.addRow();

    const cell = row.addCell();
    cell.value = 'I am a cell!';
    cell.hMerge = 2;
    cell.vMerge = 1;

    const style = new Style();
    style.fill.patternType = 'solid';
    style.fill.fgColor = '00FF0000';
    style.fill.bgColor = 'FF000000';
    style.align.h = 'center';
    style.align.v = 'center';

    cell.style = style;

    const tmpfile = join(tmpdir(), 'file-test.xlsx');
    const expfile = join(__dirname, 'expect/file-test.xlsx');
    file
      .saveAs()
      .pipe(fs.createWriteStream(tmpfile))
      .on('finish', () => {
        const expectFile = fs.createReadStream(expfile);
        const actualFile = fs.createReadStream(tmpfile);
        streamEqual(expectFile, actualFile, function (err, ok) {
          expect(err).to.be.null;
          expect(ok).to.be.true;
          done();
        });
      });
  });
});
