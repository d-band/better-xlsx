'use strict';

import { expect } from 'chai';
import { makeXworkbook, Xworkbook, makeWorkbookRels, XRelationships } from '../src/xmlWorkbook';

describe('Test: xmlWorkbook.js', () => {
  it('should makeXworkbook return Xworkbook', () => {
    const worksheet = makeXworkbook();
    expect(worksheet instanceof Xworkbook).to.be.true;
    expect(worksheet.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="JS XLSX"/><workbookPr showObjects="all"/><bookViews><workbookView showHorizontalScroll="1" showSheetTabs="1" showVerticalScroll="1" tabRatio="204" windowHeight="8192" windowWidth="16384" xWindow="0" yWindow="0"/></bookViews><calcPr iterateCount="100" iterate="0" iterateDelta="0.001" refMode="A1"/></workbook>');
  });

  it('should makeWorkbookRels return XRelationships', () => {
    const rels = makeWorkbookRels(1);
    expect(rels instanceof XRelationships).to.be.true;
    expect(rels.render()).to.equal('<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Target="worksheets/sheet1.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"/><Relationship Id="rId2" Target="sharedStrings.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings"/><Relationship Id="rId3" Target="theme/theme1.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme"/><Relationship Id="rId4" Target="styles.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles"/></Relationships>');
  });
});
