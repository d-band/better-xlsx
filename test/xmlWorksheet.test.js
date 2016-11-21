'use strict';

import { expect } from 'chai';
import { makeXworksheet, Xworksheet } from '../src/xmlWorksheet';

describe('Test: xmlWorksheet.js', () => {
  it('should makeXworksheet return Xworksheet', () => {
    const worksheet = makeXworksheet();
    expect(worksheet instanceof Xworksheet).to.be.true;
    expect(worksheet.render()).to.equal('<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetPr filterMode="false"><pageSetUpPr fitToPage="false"/></sheetPr><sheetViews><sheetView colorId="64" defaultGridColor="true" rightToLeft="false" showFormulas="false" showGridLines="true" showOutlineSymbols="true" showRowColHeaders="true" showZeros="true" tabSelected="false" topLeftCell="A1" view="normal" windowProtection="false" workbookViewId="0" zoomScale="100" zoomScaleNormal="100" zoomScalePageLayoutView="100"><selection activeCell="A1" activeCellId="0" pane="topLeft" sqref="A1"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="12.85"/><printOptions gridLines="false" gridLinesSet="true" headings="false" horizontalCentered="false" verticalCentered="false"/><pageMargins left="0.7875" right="0.7875" top="1.05277777777778" bottom="1.05277777777778" header="0.7875" footer="0.7875"/><pageSetup blackAndWhite="false" cellComments="none" copies="1" draft="false" firstPageNumber="1" fitToHeight="1" fitToWidth="1" horizontalDpi="300" orientation="portrait" pageOrder="downThenOver" paperSize="9" scale="100" useFirstPageNumber="true" usePrinterDefaults="false" verticalDpi="300"/><headerFooter><oddHeader>&amp;C&amp;"Times New Roman,Regular"&amp;12&amp;A</oddHeader><oddFooter>&amp;C&amp;"Times New Roman,Regular"&amp;12Page &amp;P</oddFooter></headerFooter></worksheet>');
  });
});
