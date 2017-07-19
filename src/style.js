import { Xfont, Xfill, XpatternFill, Xborder, Xxf, Xalignment } from './xmlStyle';

/**
 * Style class for set Cell styles.
 */
export class Style {
  applyBorder = false;
  applyFill = false;
  applyFont = false;
  applyAlignment = false;
  namedStyleIndex = null;

  constructor () {
    /**
     * Cell border
     * @type {Border}
     */
    this.border = new Border({});
    /**
     * Cell fill background or foreground
     * @type {Fill}
     */
    this.fill = new Fill({});
    /**
     * Cell font
     * @type {Font}
     */
    this.font = new Font({});
    /**
     * Cell alignment
     * @type {Alignment}
     */
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

/**
 * Border of the Style and border type have: `none`, `thin`, `medium`, `thick`, `dashed`, `dotted`, `double`
 * 
 */
export class Border {
  /**
   * left border color
   * @type {String}
   */
  leftColor = undefined;
  /**
   * right border color
   * @type {String}
   */
  rightColor = undefined;
  /**
   * top border color
   * @type {String}
   */
  topColor = undefined;
  /**
   * bottom border color
   * @type {String}
   */
  bottomColor = undefined;

  constructor ({ left = 'none', right = 'none', top = 'none', bottom = 'none' }) {
    /**
     * left border type
     * @type {String}
     */
    this.left = left;
    /**
     * right border type
     * @type {String}
     */
    this.right = right;
    /**
     * top border type
     * @type {String}
     */
    this.top = top;
    /**
     * bottom border type
     * @type {String}
     */
    this.bottom = bottom;
  }
}
/**
 * Fill of the Style
 */
export class Fill {
  constructor ({ patternType = 'none', fgColor = 'FFFFFFFF', bgColor = '00000000' }) {
    /**
     * pattern type of the fill
     * @type {String}
     */
    this.patternType = patternType;
    /**
     * foreground color of the fill
     * @type {String}
     */
    this.fgColor = fgColor;
    /**
     * background color of the fill
     * @type {String}
     */
    this.bgColor = bgColor;
  }
}
/**
 * Font of the Style
 */
export class Font {
  family = 0;
  charset = 0;
  /**
   * font color
   * @type {String}
   */
  color = undefined;
  /**
   * Is bold style
   * @type {Boolean}
   */
  bold = false;
  /**
   * Is italic style
   * @type {Boolean}
   */
  italic = false;
  /**
   * IS underline style
   * @type {Boolean}
   */
  underline = false;

  constructor ({ size = 12, name = 'Verdana' }) {
    /**
     * font size [default 12]
     * @type {Number}
     */
    this.size = size;
    this.name = name;
  }
}
/**
 * Alignment of the Style.
 */
export class Alignment {
  indent = 0;
  shrinkToFit = false;
  textRotation = 0;
  wrapText = false;

  constructor ({ h = 'general', v = 'bottom' }) {
    /**
     * Horizontal align: `general`, `center`, `left`, `right`
     * @type {String}
     */
    this.h = h;
    /**
     * Vertical align: `general`, `top`, `bottom`, `center`
     * @type {String}
     */
    this.v = v;
  }
}
