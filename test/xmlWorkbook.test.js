'use strict';

import { expect } from 'chai';
import { makeXworkbook, Xworkbook } from '../src/xmlWorkbook';

describe('Test: xmlWorkbook.js', () => {
  it('should makeXworkbook return Xworkbook', () => {
    const worksheet = makeXworkbook();
    expect(worksheet instanceof Xworkbook).to.be.true;
    expect(worksheet.render()).to.equal('<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="JS XLSX"/><workbookPr showObjects="all"/><bookViews><workbookView showHorizontalScroll="true" showSheetTabs="true" showVerticalScroll="true" tabRatio="204" windowHeight="8192" windowWidth="16384" xWindow="0" yWindow="0"/></bookViews><calcPr iterateCount="100" iterate="false" iterateDelta="0.001" refMode="A1"/></workbook>');
  });
});
