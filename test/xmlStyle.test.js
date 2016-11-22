'use strict';

import { expect } from 'chai';
import * as style from '../src/xmlStyle';

const { XstyleSheet, XnumFmts, Xfonts, Xfills, Xborders, XcellStyles, XcellStyleXfs, XcellXfs } = style;
const { XnumFmt, Xfont, Xfill, XpatternFill, Xborder, XcellStyle, Xxf, Xalignment } = style;

describe('Test: xmlSharedStrings.js', () => {
  it('should XstyleSheet render', () => {
    const styleSheet = new XstyleSheet({});
    const numFmts = new XnumFmts({ count: 0 });
    const fonts = new Xfonts({ count: 0 });
    const fills = new Xfills({ count: 0 });
    const borders = new Xborders({ count: 0 });
    const cellStyles = new XcellStyles({ count: 0 });
    const cellStyleXfs = new XcellStyleXfs({ count: 0 });
    const cellXfs = new XcellXfs({ count: 0 });
    styleSheet.children = [numFmts, fonts, fills, borders, cellStyles, cellStyleXfs, cellXfs];
    expect(styleSheet.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="0"/><fonts count="0"/><fills count="0"/><borders count="0"/><cellStyles count="0"/><cellStyleXfs count="0"/><cellXfs count="0"/></styleSheet>');

    // numFmts
    numFmts.children = [
      new XnumFmt({ formatCode: 'General', numFmtId: 0 })
    ];
    numFmts.count = 1;
    expect(numFmts.render()).to.equal('<numFmts count="1"><numFmt formatCode="General" numFmtId="0"/></numFmts>');
    // fonts
    fonts.children = [
      new Xfont({ sz: 1, color: 'ff000000', name: 'Avenir Next', b: true, i: true }),
      new Xfont({ sz: 2, color: 'ff000000', name: 'Avenir Next', b: true, u: true }),
      new Xfont({ sz: 3, color: 'ff000000', name: 'Avenir Next', u: true, i: true }),
      new Xfont({ sz: 3, color: 'ff000000', name: 'Avenir Next', family: '0' }),
      new Xfont({ sz: 3, color: 'ff000000', name: 'Avenir Next', charset: '0' })
    ];
    fonts.count = 3;
    expect(fonts.render()).to.equal('<fonts count="3"><font><sz val="1"/><name val="Avenir Next"/><color rgb="ff000000"/><b/><i/></font><font><sz val="2"/><name val="Avenir Next"/><color rgb="ff000000"/><b/><u/></font><font><sz val="3"/><name val="Avenir Next"/><color rgb="ff000000"/><i/><u/></font><font><sz val="3"/><name val="Avenir Next"/><family val="0"/><color rgb="ff000000"/></font><font><sz val="3"/><name val="Avenir Next"/><charset val="0"/><color rgb="ff000000"/></font></fonts>');
    // fills
    fills.children = [
      new Xfill({ patternFill: new XpatternFill({ patternType: 'solid', fgColor: 'ff000000', bgColor: 'ff000000' }) })
    ];
    fills.count = 1;
    expect(fills.render()).to.equal('<fills count="1"><fill><patternFill patternType="solid"><fgColor rgb="ff000000"/><bgColor rgb="ff000000"/></patternFill></fill></fills>');
    // borders
    borders.children = [
      new Xborder({
        left: { style: 'thin', color: 'ff000000' },
        right: { style: 'thin', color: 'ffffffff' }
      }),
      new Xborder({
        top: { style: 'thin', color: 'ff000000' },
        bottom: { style: 'thin', color: 'ffffffff' }
      })
    ];
    borders.count = 2;
    expect(borders.render()).to.equal('<borders count="2"><border><left style="thin"><color rgb="ff000000"/><left><right style="thin"><color rgb="ffffffff"/><right></border><border><top style="thin"><color rgb="ff000000"/><top><bottom style="thin"><color rgb="ffffffff"/><bottom></border></borders>');
    // cellStyles
    cellStyles.children = [
      new XcellStyle({ builtinId: 0, name: 'Normal', xfId: 0 })
    ];
    cellStyles.count = 1;
    expect(cellStyles.render()).to.equal('<cellStyles count="1"><cellStyle name="Normal" xfId="0"/></cellStyles>');
    // xfs
    const xf = new Xxf({
      applyAlignment: 1,
      applyBorder: 1,
      applyFill: 0,
      applyFont: 1,
      applyNumberFormat: 1,
      applyProtection: 0,
      borderId: 7,
      fontId: 0,
      numFmtId: 0
    });
    xf.alignment = new Xalignment({
      vertical: 'top',
      wrapText: 1
    });
    // cellStyleXfs
    cellStyleXfs.children = [xf];
    cellStyleXfs.count = 1;
    expect(cellStyleXfs.render()).to.equal('<cellStyleXfs count="1"><xf applyAlignment="1" applyBorder="1" applyFill="0" applyFont="1" applyNumberFormat="1" applyProtection="0" borderId="7" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="false" textRotation="0" vertical="top" wrapText="1"/></xf></cellStyleXfs>');
    // cellXfs
    cellXfs.children = [xf];
    cellXfs.count = 1;
    expect(cellXfs.render()).to.equal('<cellXfs count="1"><xf applyAlignment="1" applyBorder="1" applyFill="0" applyFont="1" applyNumberFormat="1" applyProtection="0" borderId="7" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="false" textRotation="0" vertical="top" wrapText="1"/></xf></cellXfs>');
  });
});
