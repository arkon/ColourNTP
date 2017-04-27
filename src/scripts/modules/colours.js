import { ColourFormats } from '../constants/settings';

export default class Colours {
  /**
   * Converts the second to a hex value, from 0x000000 to 0xFFFFFF.
   * 00:00:00 corresponds to #000000 and 23:59:59 corresponds to #ffffff.
   *
   * @param {Number} seconds  The current second in the day.
   *
   * @return {String}  The hex colour value (e.g. #1fd531).
   */
  static secondToHexColour(seconds) {
    return Colours._valueToHex(seconds / (24 * 60 * 60 - 1));
  }

  /**
   * Converts the second to a hex value, as a point along the hue spectrum.
   * 00:00:00 corresponds to #FF0000, 12:00:00 corresponds to #00FEFF.
   */
  static secondToHueColour(seconds) {
    let hue = seconds / (24 * 60 * 60);

    return Colours.rgbToHex(...Colours.hslToRgb(hue, 1, 0.5));
  }

  /**
   * Converts an HSL color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param {Number} h  The hue.
   * @param {Number} s  The saturation.
   * @param {Number} l  The lightness.
   *
   * @return {Array}  The RGB representation.
   */
  static hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0){
      r = g = b = l;  // Achromatic
    } else {
      let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      let p = 2 * l - q;
      r = Colours.hueToRgb(p, q, h + 1/3);
      g = Colours.hueToRgb(p, q, h);
      b = Colours.hueToRgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
  }

  /**
   * Converts a hue color value to RGB.
   */
  static hueToRgb (p, q, t) {
    if (t < 0) {
      t++;
    }
    if (t > 1) {
      t--;
    }
    if (t < 1/6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1/2) {
      return q;
    }
    if (t < 2/3) {
      return p + (q - p) * (2/3 - t) * 6;
    }

    return p;
  }

  /**
   * Converts RGB values to a hex colour string.
   */
  static rgbToHex(r, g, b) {
    return `#${(((1 << 24) + (r << 16) + (g << 8) + b) | 0).toString(16).slice(1)}`;
  }

  /**
   * Converts RGB to HSL.
   */
  static rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
      case r: {
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      }
      case g: {
        h = (b - r) / d + 2;
        break;
      }
      case b: {
        h = (r - g) / d + 4;
        break;
      }
      }

      h /= 6;
    }

    return [(h * 100 + 0.5) | 0, (s * 100 + 0.5) | 0, (l * 100 + 0.5) | 0];
  }

  /**
   * Converts RGB to HSV.
   */
  static rgbToHsv (r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let rr, gg, bb,
      h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = function (c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

    if (diff === 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) {
        h = bb - gg;
      } else if (g === v) {
        h = (1 / 3) + rr - bb;
      } else if (b === v) {
        h = (2 / 3) + gg - rr;
      }

      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
  }

  /**
   * Converts RGB to CMYK.
   */
  static rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let k = Math.min(1 - r, 1 - g, 1 - b);
    let c = (1 - r - k) / (1 - k);
    let m = (1 - g - k) / (1 - k);
    let y = (1 - b - k) / (1 - k);

    c = Math.round(c * 100);
    m = Math.round(m * 100);
    y = Math.round(y * 100);
    k = Math.round(k * 100);

    return [c, m, y, k];
  }

  /**
   * Converts hex to HSL.
   */
  static hexToHsl(hex) {
    if (hex.startsWith('#')) {
      hex = hex.substring(1);
    }

    return Colours.rgbToHsl(...Colours.hexToRgb(hex));
  }

  /**
   * Converts a hex colour string to an array of RGB values.
   */
  static hexToRgb(hex) {
    if (hex.startsWith('#')) {
      hex = hex.substring(1);
    }

    const r = parseInt(hex, 16) >> 16,
      g = parseInt(hex, 16) >> 8 & 0xFF,
      b = parseInt(hex, 16) & 0xFF;

    return [r, g, b];
  }

  /**
   * Converts a hex colour to an RGBA string with the provided alpha value.
   */
  static rgba(hex, alpha) {
    if (hex.startsWith('#')) {
      hex = hex.substring(1);
    }

    const colour = Colours.hexToRgb(hex);

    return `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${alpha})`;
  }

  /**
   * Returns a random hex colour string.
   */
  static random() {
    return Colours._valueToHex(Math.random());
  }

  /**
   * Calculates whether a colour (given the RGB values) is considered dark.
   * Based on http://stackoverflow.com/a/12043228.
   */
  static isDark(r, g, b) {
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 128;
  }

  /**
   * Converts a hex colour string to RGB or HSL format, of that format
   * is specified.
   */
  static format(hex, format) {
    let colour = hex;

    switch (format) {
    case ColourFormats.RGB: {
      const rgb = Colours.hexToRgb(colour);
      colour = `rgb(${rgb.join(', ')})`;
      break;
    }

    case ColourFormats.HSL: {
      const hsl = Colours.hexToHsl(colour.substring(1));
      colour = `hsl(${hsl[0]}°, ${hsl[1]}%, ${hsl[2]}%)`;
      break;
    }

    case ColourFormats.HSV: {
      const hsv = Colours.rgbToHsv(...Colours.hexToRgb(colour));
      colour = `hsv(${hsv[0]}°, ${hsv[1]}%, ${hsv[2]}%)`;
      break;
    }

    case ColourFormats.CMYK: {
      const cmyk = Colours.rgbToCmyk(...Colours.hexToRgb(colour));
      colour = `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`;
      break;
    }

    default: {
      break;
    }
    }

    return colour;
  }

  /**
   * Returns American-localized "colour" if needed.
   */
  static localize(capitalize, american = false) {
    let word = american ? 'color' : 'colour';

    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return word;
  }

  /**
   * PRIVATE: returns a hex colour string using the given number.
   */
  static _valueToHex(value) {
    return `#${('000000' + (value * 0xFFFFFF | 0).toString(16)).slice(-6)}`;
  }
}
