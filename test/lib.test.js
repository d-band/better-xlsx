'use strict';

import { expect } from 'chai';
import { Style } from '../src/style';
import { XstyleSheet } from '../src/xmlStyle';
import { col2num, num2col, cid2coord, handleStyle, handleNumFmtId } from '../src/lib';

describe('Test: lib.js', () => {
  it('should col2num ok', () => {
    expect(col2num('B')).to.equal(1);
    expect(col2num('AA')).to.equal(26);
    expect(col2num('AB')).to.equal(27);
  });

  it('should num2col ok', () => {
    expect(num2col(1)).to.equal('B');
    expect(num2col(26)).to.equal('AA');
    expect(num2col(27)).to.equal('AB');
  });

  it('should cid2coord ok', () => {
    expect(cid2coord('A1')).to.deep.equal({ x: 0, y: 0 });
    expect(cid2coord('AA2')).to.deep.equal({ x: 26, y: 1 });
    expect(cid2coord('AB3')).to.deep.equal({ x: 27, y: 2 });
  });

  it('should handleStyle ok', () => {
    const style = new Style();
    const styles = new XstyleSheet({});

    styles.reset();
    handleStyle(style, 0, styles);
    expect(styles.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="12"/><name val="Verdana"/></font></fonts><fills count="2"><fill><patternFill patternType="none"><fgColor rgb="FFFFFFFF"/><bgColor rgb="00000000"/></patternFill></fill><fill><patternFill patternType="lightGray"></patternFill></fill></fills><borders count="2"><border><left style="none"></left><right style="none"></right><top style="none"></top><bottom style="none"></bottom></border><border><left style="none"></left><right style="none"></right><top style="none"></top><bottom style="none"></bottom></border></borders><cellXfs count="2"><xf applyAlignment="0" applyBorder="0" applyFont="0" applyFill="0" applyNumberFormat="0" applyProtection="0" borderId="0" fillId="0" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="bottom" wrapText="0"/></xf><xf applyAlignment="0" applyBorder="0" applyFont="0" applyFill="0" applyNumberFormat="0" applyProtection="0" borderId="1" fillId="0" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="bottom" wrapText="0"/></xf></cellXfs><numFmts/></styleSheet>');

    styles.reset();
    handleStyle(style, 3, styles);
    expect(styles.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="1"><font><sz val="12"/><name val="Verdana"/></font></fonts><fills count="2"><fill><patternFill patternType="none"><fgColor rgb="FFFFFFFF"/><bgColor rgb="00000000"/></patternFill></fill><fill><patternFill patternType="lightGray"></patternFill></fill></fills><borders count="2"><border><left style="none"></left><right style="none"></right><top style="none"></top><bottom style="none"></bottom></border><border><left style="none"></left><right style="none"></right><top style="none"></top><bottom style="none"></bottom></border></borders><cellXfs count="2"><xf applyAlignment="0" applyBorder="0" applyFont="0" applyFill="0" applyNumberFormat="0" applyProtection="0" borderId="0" fillId="0" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="bottom" wrapText="0"/></xf><xf applyAlignment="0" applyBorder="0" applyFont="0" applyFill="0" applyNumberFormat="1" applyProtection="0" borderId="1" fillId="0" fontId="0" numFmtId="3"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="bottom" wrapText="0"/></xf></cellXfs><numFmts/></styleSheet>');
  });

  it('should handleNumFmtId ok', () => {
    const styles = new XstyleSheet({});

    styles.reset();
    handleNumFmtId(0, styles);
    expect(styles.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts/><fills/><borders count="1"><border><left style="none"></left><right style="none"></right><top style="none"></top><bottom style="none"></bottom></border></borders><cellXfs count="1"><xf applyAlignment="0" applyBorder="0" applyFont="0" applyFill="0" applyNumberFormat="0" applyProtection="0" borderId="0" fillId="0" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="bottom" wrapText="0"/></xf></cellXfs><numFmts/></styleSheet>');

    styles.reset();
    handleNumFmtId(3, styles);
    expect(styles.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts/><fills/><borders count="1"><border><left style="none"></left><right style="none"></right><top style="none"></top><bottom style="none"></bottom></border></borders><cellXfs count="2"><xf applyAlignment="0" applyBorder="0" applyFont="0" applyFill="0" applyNumberFormat="0" applyProtection="0" borderId="0" fillId="0" fontId="0" numFmtId="0"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="bottom" wrapText="0"/></xf><xf applyAlignment="0" applyBorder="0" applyFont="0" applyFill="0" applyNumberFormat="1" applyProtection="0" borderId="0" fillId="0" fontId="0" numFmtId="3"><alignment horizontal="general" indent="0" shrinkToFit="0" textRotation="0" vertical="bottom" wrapText="0"/></xf></cellXfs><numFmts/></styleSheet>');
  });
});
