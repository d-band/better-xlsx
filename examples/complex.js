const fs = require('fs');
const xlsx = require('../lib');

const file = new xlsx.File();
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

function border(cell, top, left, bottom, right) {
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

function fill(cell, type) {
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

file
  .saveAs()
  .pipe(fs.createWriteStream(__dirname + '/complex.xlsx'))
  .on('finish', () => console.log('Done.'));