better-xlsx
===========

> A better xlsx lib for read / write / toTable / from Table

[![NPM version](https://img.shields.io/npm/v/better-xlsx.svg)](https://www.npmjs.com/package/better-xlsx)
[![NPM downloads](https://img.shields.io/npm/dm/better-xlsx.svg)](https://www.npmjs.com/package/better-xlsx)
[![Build Status](https://travis-ci.org/d-band/better-xlsx.svg?branch=master)](https://travis-ci.org/d-band/better-xlsx)
[![Coverage Status](https://coveralls.io/repos/github/d-band/better-xlsx/badge.svg?branch=master)](https://coveralls.io/github/d-band/better-xlsx?branch=master)
[![Dependency Status](https://david-dm.org/d-band/better-xlsx.svg)](https://david-dm.org/d-band/better-xlsx)
[![Greenkeeper badge](https://badges.greenkeeper.io/d-band/better-xlsx.svg)](https://greenkeeper.io/)

---

## Install

```bash
$ npm install better-xlsx
```

## Usage

- [More Examples](examples)

```javascript
const fs = require('fs');
const xlsx = require('better-xlsx');

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

file
  .saveAs()
  .pipe(fs.createWriteStream('test.xlsx'))
  .on('finish', () => console.log('Done.'));
```

## Todo

- [ ] xlsx parser
- [ ] read excel file
- [x] write excel file
- [x] transform html table to excel file [html2xlsx](https://github.com/d-band/html2xlsx)

## Report a issue

* [All issues](https://github.com/d-band/better-xlsx/issues)
* [New issue](https://github.com/d-band/better-xlsx/issues/new)

## Reference

- http://www.ecma-international.org/publications/standards/Ecma-376.htm
- https://github.com/tealeg/xlsx

## License

better-xlsx is available under the terms of the MIT License.