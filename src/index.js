import { File } from './file';
import { Style } from './style';

const file = new File(process.env.HOME + '/Desktop/temp-xlsx/test.xlsx');

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

file.save();
