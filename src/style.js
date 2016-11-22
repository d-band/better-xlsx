export class Style {
  applyBorder = false;
  applyFill = false;
  applyFont = false;
  applyAlignment = false;
  namedStyleIndex = null;

  constructor () {
    this.border = new Border({});
    this.fill = new Fill({});
    this.font = new Font({});
    this.alignment = new Alignment({});
  }
  makeXStyleElements () {

  }
}

export class Border {
  leftColor = '';
  rightColor = '';
  topColor = '';
  bottomColor = '';

  constructor ({ left = 'none', right = 'none', top = 'none', bottom = 'none' }) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }
}

export class Fill {
  constructor ({ patternType = 'none', fgColor = 'FFFFFFFF', bgColor = '00000000' }) {
    this.patternType = patternType;
    this.fgColor = fgColor;
    this.bgColor = bgColor;
  }
}

export class Font {
  family = 0;
  charset = 0;
  color = '';
  bold = false;
  italic = false;
  underline = false;

  constructor ({ size = 12, name = 'Verdana' }) {
    this.size = size;
    this.name = name;
  }
}

export class Alignment {
  indent =0;
  shrinkToFit =false;
  textRotation =0;
  wrapText =false;

  constructor ({ h = 'general', v = 'bottom' }) {
    this.h = h;
    this.v = v;
  }
}
