const fs = require('fs');
const yazl = require('yazl');
const xlsx = require('../lib');

const file = new xlsx.File();

const sheet = file.addSheet('Sheet1');
const row = sheet.addRow();
const cell = row.addCell();

cell.value = 'I am a cell!';
cell.hMerge = 2;
cell.vMerge = 1;

const style = new xlsx.Style();

style.fill.patternType = 'solid';
style.fill.fgColor = '00FF0000';
style.fill.bgColor = 'FF000000';
style.align.h = 'center';
style.align.v = 'center';

cell.style = style;

const zip = new yazl.ZipFile();
const parts = file.makeParts();
for (const key of Object.keys(parts)) {
  zip.addBuffer(parts[key], key, {
    mtime: new Date()
  });
}
zip.end();

zip.outputStream.pipe(fs.createWriteStream(__dirname + '/simple.xlsx'))
  .on('finish', () => console.log('Done.'));