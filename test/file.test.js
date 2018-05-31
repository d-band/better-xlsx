'use strict';

import { expect } from 'chai';
import fs from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import streamEqual from 'stream-equal';
import { File } from '../src/file';
import { Style } from '../src/style';
import Zip from 'jszip';

const DATE = new Date(Date.UTC(2016, 10, 23, 0, 0, 0));
Zip.defaults.date = DATE;

describe('Test: file.js', () => {
  it('should saveAs simple excel file', (done) => {
    const file = new File();
    const sheet = file.addSheet('hello');
    const row = sheet.addRow();

    expect(sheet.row(0) === row).to.be.true;

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

    const tmpfile = join(tmpdir(), 'simple.xlsx');
    const expfile = join(__dirname, 'expect/simple.xlsx');
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
  it('should saveAs simple excel file with colWidth', (done) => {
    const file = new File();
    const sheet = file.addSheet('sheet1');
    sheet.setColWidth(0, 1, 20);

    const row = sheet.addRow();
    const cell = row.addCell();
    cell.value = 'I am a cell!';

    const tmpfile = join(tmpdir(), 'simple2.xlsx');
    const expfile = join(__dirname, 'expect/simple2.xlsx');
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
  it('should saveAs simple excel file with multi types', (done) => {
    const file = new File();
    const sheet = file.addSheet('sheet1');
    sheet.setColWidth(0, 5, 20);

    const data1 = [null, DATE, 123, 'abc', true, [1, 2, 3]];
    const data2 = [undefined, DATE, 123.456, 'abc', false, { foo: 'bar' }];
    const data3 = ['0.00e+00', '#,##0', '#,##0.00', '0%', '0.00%', '$#,##0.00'];

    const row1 = sheet.addRow();
    for (const v of data1) {
      const cell = row1.addCell();
      cell.value = v;
    }
    const row2 = sheet.addRow();
    for (const v of data2) {
      const cell = row2.addCell();
      cell.value = v;
    }
    const row3 = sheet.addRow();
    for (const v of data3) {
      const cell = row3.addCell();
      cell.value = 12345678.87654321;
      cell.numFmt = v;
    }
    const row4 = sheet.addRow();
    const c1 = row4.addCell();
    c1.setDate(DATE);
    const c2 = row4.addCell();
    c2.setFormula('SUM(C1:C3)');

    const tmpfile = join(tmpdir(), 'simple3.xlsx');
    const expfile = join(__dirname, 'expect/simple3.xlsx');
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
  it('should saveAs simple excel file with col style', (done) => {
    const file = new File();
    const sheet = file.addSheet('sheet1');

    for (let i = 10000; i <= 20000; i += 2000) {
      const row = sheet.addRow();
      const cell = row.addCell();
      cell.value = i;
    }

    sheet.col(0).setType(3);

    const tmpfile = join(tmpdir(), 'simple4.xlsx');
    const expfile = join(__dirname, 'expect/simple4.xlsx');
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
  it('should saveAs simple excel file with page setup', (done) => {
    const file = new File();
    const sheet = file.addSheet('hello');
    sheet.afterMake = (st) => {
      st.sheetPr.children.forEach(v => {
        v.fitToPage = true;
      });
      st.pageSetup.fitToHeight = 3;
      st.pageSetup.orientation = 'landscape';
      st.pageSetup.usePrinterDefaults = true;
      st.headerFooter.oddHeader = '';
    };
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 50; j++) {
        const cell = sheet.cell(i, j);
        cell.value = `${i}-${j}`;
      }
    }

    const tmpfile = join(tmpdir(), 'simple5.xlsx');
    const expfile = join(__dirname, 'expect/simple5.xlsx');
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
  it('should saveAs complex excel file', (done) => {
    const file = new File();
    const sheet = file.addSheet('Sheet1');
    const data = [
      ['Auto', 200, 90, 'B2-C2'],
      ['Entertainment', 200, 32, 'B3-C3'],
      ['Food', 350, 205.75, 'B4-C4'],
      ['Home', 300, 250, 'B5-C5'],
      ['Medical', 100, 35, 'B6-C6'],
      ['Personal Items', 300, 80, 'B7-C7'],
      ['Travel', 500, 350, 'B8-C8'],
      ['Utilities', 200, 100, 'B9-C9'],
      ['Other', 50, 60, 'B10-C10']
    ];

    function border (cell, top, left, bottom, right) {
      const light = 'ffded9d4';
      const dark = 'ff7e6a54';
      cell.style.border.top = 'thin';
      cell.style.border.topColor = top ? dark : light;
      cell.style.border.left = 'thin';
      cell.style.border.leftColor = left ? dark : light;
      cell.style.border.bottom = 'thin';
      cell.style.border.bottomColor = bottom ? dark : light;
      cell.style.border.right = 'thin';
      cell.style.border.rightColor = right ? dark : light;
    }

    function fill (cell, type) {
      type = type || 0;
      const colors = ['ffffffff', 'ffa2917d', 'ffe4e2de', 'fffff8df', 'fff1eeec'];
      // 1: header, 2: first col, 3: second col, 4: gray, 0: white
      cell.style.fill.patternType = 'solid';
      cell.style.fill.fgColor = colors[type];
      cell.style.fill.bgColor = 'ffffffff';
    }

    const header = sheet.addRow();
    header.setHeightCM(0.8);
    const headers = ['Category', 'Budget', 'Actual', 'Difference'];
    for (let i = 0; i < headers.length; i++) {
      const hc = header.addCell();
      hc.value = headers[i];
      hc.style.align.v = 'center';
      if (i > 0) hc.style.align.h = 'right';
      hc.style.font.color = 'ffffffff';
      border(hc, 0, 0, 1, 0);
      fill(hc, 1);
    }

    const len = data.length;
    for (let i = 0; i < len; i++) {
      const line = data[i];
      const row = sheet.addRow();
      row.setHeightCM(0.8);
      // Col 1
      const cell1 = row.addCell();
      cell1.value = line[0];
      cell1.style.align.v = 'center';
      if (i === 0) {
        border(cell1, 1, 0, 0, 1);
      } else if (i === len - 1) {
        border(cell1, 0, 0, 1, 1);
      } else {
        border(cell1, 0, 0, 0, 1);
      }
      fill(cell1, 2);
      // Col 2
      const cell2 = row.addCell();
      cell2.value = line[1];
      cell2.numFmt = '$#,##0.00';
      cell2.cellType = 'TypeNumeric';
      cell2.style.align.v = 'center';
      if (i === 0) {
        border(cell2, 1, 1, 0, 0);
      } else if (i === len - 1) {
        border(cell2, 0, 1, 1, 0);
      } else {
        border(cell2, 0, 1, 0, 0);
      }
      fill(cell2, 3);
      // Col 3
      const cell3 = row.addCell();
      cell3.value = line[2];
      cell3.numFmt = '$#,##0.00';
      cell3.cellType = 'TypeNumeric';
      cell3.style.align.v = 'center';
      if (i === 0) {
        border(cell3, 1, 0, 0, 0);
      } else if (i === len - 1) {
        border(cell3, 0, 0, 1, 0);
      } else {
        border(cell3, 0, 0, 0, 0);
      }
      fill(cell3, i % 2 === 0 ? 0 : 4);
      // Col 4
      const cell4 = row.addCell();
      cell4.formula = line[3];
      cell4.numFmt = '$#,##0.00';
      cell4.cellType = 'TypeFormula';
      cell4.style.align.v = 'center';
      if (i === 0) {
        border(cell4, 1, 0, 0, 0);
      } else if (i === len - 1) {
        border(cell4, 0, 0, 1, 0);
      } else {
        border(cell4, 0, 0, 0, 0);
      }
      fill(cell4, i % 2 === 0 ? 0 : 4);
    }

    for (let i = 0; i < 4; i++) {
      sheet.col(i).width = 20;
    }

    const tmpfile = join(tmpdir(), 'complex.xlsx');
    const expfile = join(__dirname, 'expect/complex.xlsx');
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
