export class Colours {
  /**
   * Converts the second to a hex value, from 0x000000 to 0xFFFFFF.
   * 00:00:00 corresponds to #000000 and 23:59:59 corresponds to #ffffff.
   *
   * @param {Number} seconds  The current second in the day.
   *
   * @return {String}  The hex colour value (e.g. #1fd531).
   */
  static secondToHexColour (seconds) {
    return Colours._valueToHex(seconds / (24 * 60 * 60 - 1));
  }

  /**
   * Converts the second to a hex value, as a point along the hue spectrum.
   * 00:00:00 corresponds to #FF0000, 12:00:00 corresponds to #00FEFF.
   */
  static secondToHueColour (seconds) {
    var hue = seconds / (24 * 60 * 60);

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
  static hslToRgb (h, s, l) {
    var r, g, b;

    if (s === 0){
      r = g = b = l;  // Achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
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
    if (t < 0) t++;
    if (t > 1) t--;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;

    return p;
  }

  /**
   * Converts RGB values to a hex colour string.
   */
  static rgbToHex (r, g, b) {
    return `#${(((1 << 24) + (r << 16) + (g << 8) + b) | 0).toString(16).slice(1)}`;
  }

  static rgbToHsl (r, g, b) {
    r /= 255, g /= 255, b /= 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max == min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return [(h * 100 + 0.5) | 0, (s * 100 + 0.5) | 0, (l * 100 + 0.5) | 0];
  }

  static hexToHsl (hex) {
    return Colours.rgbToHsl(...Colours.hexToRgb(hex));
  }

  /**
   * Converts a hex colour string to an array of RGB values.
   */
  static hexToRgb (hex) {
    const r = parseInt(hex, 16) >> 16,
      g = parseInt(hex, 16) >> 8 & 0xFF,
      b = parseInt(hex, 16) & 0xFF;

    return [r, g, b];
  }

  /**
   * Converts a hex colour to an RGBA string with the provided alpha value.
   */
  static rgba (hex, alpha) {
    const colour = Colours.hexToRgb(hex.substring(1, 7));

    return `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${alpha})`;
  }

  /**
   * Returns a random hex colour string.
   */
  static random () {
    return Colours._valueToHex(Math.random());
  }

  /**
   * Calculates whether a colour (given the RGB values) is considered dark.
   * Based on http://stackoverflow.com/a/12043228.
   */
  static isDark (r, g, b) {
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 40;
  }

  /**
   * Returns American-localized "colour" if needed.
   */
  static localize (capitalize, american = false) {
    const word = american ? 'color' : 'colour';

    if (capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return word;
  }

  /**
   * PRIVATE: returns a hex colour string using the given number.
   */
  static _valueToHex (value) {
    return `#${('000000' + (value * 0xFFFFFF | 0).toString(16)).slice(-6)}`;
  }
}
