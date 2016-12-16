import { Xfont, Xfill, XpatternFill, Xborder, Xxf, Xalignment } from './xmlStyle';

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
    this.align = new Alignment({});
  }
  makeXStyleElements () {
    const xFont = new Xfont({
      sz: this.font.size,
      name: this.font.name,
      family: this.font.family,
      charset: this.font.charset,
      color: this.font.color,
      b: this.font.bold,
      i: this.font.italic,
      u: this.font.underline
    });
    const xFill = new Xfill({
      patternFill: new XpatternFill({
        patternType: this.fill.patternType,
        fgColor: this.fill.fgColor,
        bgColor: this.fill.bgColor
      })
    });
    const xBorder = new Xborder({
      left: { style: this.border.left, color: this.border.leftColor },
      right: { style: this.border.right, color: this.border.rightColor },
      top: { style: this.border.top, color: this.border.topColor },
      bottom: { style: this.border.bottom, color: this.border.bottomColor }
    });
    const xXf = new Xxf({
      numFmtId: 0,
      applyBorder: this.applyBorder,
      applyFill: this.applyFill,
      applyFont: this.applyFont,
      applyAlignment: this.applyAlignment
    });

    xXf.alignment = new Xalignment({
      horizontal: this.align.h,
      indent: this.align.indent,
      shrinkToFit: this.align.shrinkToFit,
      textRotation: this.align.textRotation,
      vertical: this.align.v,
      wrapText: this.align.wrapText
    });

    if (this.namedStyleIndex !== null) {
      xXf.xfId = this.namedStyleIndex;
    }

    return { xFont, xFill, xBorder, xXf };
  }
}

export class Border {
  leftColor = undefined;
  rightColor = undefined;
  topColor = undefined;
  bottomColor = undefined;

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
  color = undefined;
  bold = false;
  italic = false;
  underline = false;

  constructor ({ size = 12, name = 'Verdana' }) {
    this.size = size;
    this.name = name;
  }
}

export class Alignment {
  indent = 0;
  shrinkToFit = false;
  textRotation = 0;
  wrapText = false;

  constructor ({ h = 'general', v = 'bottom' }) {
    this.h = h;
    this.v = v;
  }
}
