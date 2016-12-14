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
    expect(borders.render()).to.equal('<borders count="2"><border><left style="thin"><color rgb="ff000000"/></left><right style="thin"><color rgb="ffffffff"/></right></border><border><top style="thin"><color rgb="ff000000"/></top><bottom style="thin"><color rgb="ffffffff"/></bottom></border></borders>');
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
    expect(cellStyleXfs.render()).to.equal('<cellStyleXfs count="1"><xf applyAlignment="1" applyBorder="1" applyFont="1" applyFill="0" applyNumberFormat="1" applyProtection="0" borderId="7" fillId="0" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="top" wrapText="1"/></xf></cellStyleXfs>');
    // cellXfs
    cellXfs.children = [xf];
    cellXfs.count = 1;
    expect(cellXfs.render()).to.equal('<cellXfs count="1"><xf applyAlignment="1" applyBorder="1" applyFont="1" applyFill="0" applyNumberFormat="1" applyProtection="0" borderId="7" fillId="0" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="top" wrapText="1"/></xf></cellXfs>');
  });

  it('should XstyleSheet add children', () => {
    const styleSheet = new XstyleSheet({});
    styleSheet.reset();
    expect(styleSheet.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts/><fills/><borders count="1"><border><left style="none"></left><right style="none"></right><top style="none"></top><bottom style="none"></bottom></border></borders><cellStyleXfs/><cellXfs count="1"><xf applyAlignment="0" applyBorder="0" applyFont="0" applyFill="0" applyNumberFormat="0" applyProtection="0" borderId="0" fillId="0" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="bottom" wrapText="0"/></xf></cellXfs><numFmts/></styleSheet>');

    const font1 = new Xfont({ sz: 3, color: 'ff000000', name: 'Avenir Next', family: '0' });
    const font2 = new Xfont({ sz: 3, color: 'ff000000', name: 'Avenir Next', family: '0', b: true });
    expect(styleSheet.addFont(font1)).to.equal(0);
    expect(styleSheet.addFont(font2)).to.equal(1);
    expect(styleSheet.addFont(font1)).to.equal(0);
    expect(styleSheet.addFont(font2)).to.equal(1);

    const fill1 = new Xfill({ patternFill: new XpatternFill({ patternType: 'solid', fgColor: 'ff000000', bgColor: 'ff000000' }) });
    const fill2 = new Xfill({ patternFill: new XpatternFill({ patternType: 'solid', fgColor: 'ffffffff', bgColor: 'ff000000' }) });
    expect(styleSheet.addFill(fill1)).to.equal(0);
    expect(styleSheet.addFill(fill2)).to.equal(1);
    expect(styleSheet.addFill(fill1)).to.equal(0);
    expect(styleSheet.addFill(fill2)).to.equal(1);

    const border1 = new Xborder({
      left: { style: 'thin', color: 'ff000000' },
      right: { style: 'thin', color: 'ffffffff' }
    });
    const border2 = new Xborder({
      left: { style: 'thin', color: 'ff000000' },
      top: { style: 'thin', color: 'ff000000' },
      bottom: { style: 'thin', color: 'ffffffff' }
    });
    expect(styleSheet.addBorder(border1)).to.equal(1);
    expect(styleSheet.addBorder(border2)).to.equal(2);
    expect(styleSheet.addBorder(border1)).to.equal(1);
    expect(styleSheet.addBorder(border2)).to.equal(2);

    const xf1 = new Xxf({
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
    xf1.alignment = new Xalignment({
      vertical: 'top',
      wrapText: 1
    });
    const xf2 = new Xxf({
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
    xf2.alignment = new Xalignment({
      vertical: 'bottom',
      wrapText: 1
    });
    expect(styleSheet.addCellXf(xf1)).to.equal(1);
    expect(styleSheet.addCellXf(xf2)).to.equal(2);
    expect(styleSheet.addCellXf(xf1)).to.equal(1);
    expect(styleSheet.addCellXf(xf2)).to.equal(2);

    expect(styleSheet.newNumFmt().numFmtId).to.equal(0);
    expect(styleSheet.newNumFmt('@').numFmtId).to.equal('49');
    expect(styleSheet.newNumFmt('test').numFmtId).to.equal(164);
  });
});
