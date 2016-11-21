import { File } from './file';

const file = new File('test.xlsx');

file.addSheet('hello');
file.addSheet('world');

console.log(file.makeParts());
