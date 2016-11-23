const fs = require('fs');
const xlsx = require('../lib').default;

const file = new xlsx.File();
const sheet = file.addSheet('Sheet1');
const data = [
  ['Auto', 200, 90],
  ['Entertainment', 200, 32],
  ['Food', 350, 205.75],
  ['Home', 300, 250],
  ['Medical', 100, 35],
  ['Personal Items', 300, 80],
  ['Travel', 500, 350],
  ['Utilities', 200, 100],
  ['Other', 50, 60]
];

for (let line of data) {
  const row = sheet.addRow();
  row.setHeightCM(0.8);

  const cell1 = row.addCell();
  cell1.value = line[0];
  cell1.style.border.left = 'thin';
  cell1.style.border.leftColor = 'ffded9d4';
  cell1.style.border.bottom = 'thin';
  cell1.style.border.bottomColor = 'ffded9d4';
  cell1.style.border.top = 'thin';
  cell1.style.border.topColor = 'ff7e6a54';
  cell1.style.border.right = 'thin';
  cell1.style.border.rightColor = 'ff7e6a54';
  cell1.style.fill.patternType='solid';
  cell1.style.fill.fgColor='ffa2917d';
  cell1.style.fill.bgColor='ffffffff';

  const cell2 = row.addCell();
  cell2.value = line[1];
  cell2.numFmt = 8;
  cell2.cellType = 'TypeNumeric';
  cell2.style.border.right = 'thin';
  cell2.style.border.rightColor = 'ffded9d4';
  cell2.style.border.bottom = 'thin';
  cell2.style.border.bottomColor = 'ffded9d4';
  cell2.style.border.top = 'thin';
  cell2.style.border.topColor = 'ff7e6a54';
  cell2.style.border.left = 'thin';
  cell2.style.border.leftColor = 'ff7e6a54';
  cell2.style.fill.patternType='solid';
  cell2.style.fill.fgColor='fffff8df';
  cell2.style.fill.bgColor='ffffffff';
}

file
  .saveAs()
  .pipe(fs.createWriteStream(__dirname + '/complex.xlsx'))
  .on('finish', () => console.log('Done.'));