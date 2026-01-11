import { ColourFormats, type ColourFormat } from '../constants/settings';

/**
 * Converts the second to a hex value, from 0x000000 to 0xFFFFFF.
 * 00:00:00 corresponds to #000000 and 23:59:59 corresponds to #ffffff.
 */
export function secondToHexColour(seconds: number): string {
  return valueToHex(seconds / (24 * 60 * 60 - 1));
}

/**
 * Converts the second to a hex value, as a point along the hue spectrum.
 * 00:00:00 corresponds to #FF0000, 12:00:00 corresponds to #00FEFF.
 */
export function secondToHueColour(seconds: number): string {
  const hue = seconds / (24 * 60 * 60);
  return rgbToHex(...hslToRgb(hue, 1, 0.5));
}

/**
 * Converts an HSL color value to RGB.
 */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

/**
 * Converts a hue color value to RGB.
 */
export function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) t++;
  if (t > 1) t--;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * Converts RGB values to a hex colour string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${(((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)) | 0).toString(16).slice(1)}`;
}

/**
 * Converts RGB to HSL.
 */
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [(h * 100 + 0.5) | 0, (s * 100 + 0.5) | 0, (l * 100 + 0.5) | 0];
}

/**
 * Converts RGB to HSV.
 */
export function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const v = Math.max(r, g, b);
  const diff = v - Math.min(r, g, b);

  const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;

  let h = 0;
  let s = 0;

  if (diff !== 0) {
    s = diff / v;
    const rr = diffc(r);
    const gg = diffc(g);
    const bb = diffc(b);

    if (r === v) {
      h = bb - gg;
    } else if (g === v) {
      h = 1 / 3 + rr - bb;
    } else if (b === v) {
      h = 2 / 3 + gg - rr;
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
export function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const k = Math.min(1 - r, 1 - g, 1 - b);
  const c = (1 - r - k) / (1 - k) || 0;
  const m = (1 - g - k) / (1 - k) || 0;
  const y = (1 - b - k) / (1 - k) || 0;

  return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

/**
 * Converts hex to HSL.
 */
export function hexToHsl(hex: string): [number, number, number] {
  if (hex.startsWith('#')) {
    hex = hex.substring(1);
  }
  return rgbToHsl(...hexToRgb(hex));
}

/**
 * Converts a hex colour string to an array of RGB values.
 */
export function hexToRgb(hex: string): [number, number, number] {
  if (hex.startsWith('#')) {
    hex = hex.substring(1);
  }

  const num = parseInt(hex, 16);
  const r = num >> 16;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;

  return [r, g, b];
}

/**
 * Converts a hex colour to an RGBA string with the provided alpha value.
 */
export function rgba(hex: string, alpha: number): string {
  if (hex.startsWith('#')) {
    hex = hex.substring(1);
  }

  const colour = hexToRgb(hex);

  return `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, ${alpha})`;
}

/**
 * Returns a random hex colour string.
 */
export function random(): string {
  return valueToHex(Math.random());
}

/**
 * Calculates whether a colour (given the RGB values) is considered dark.
 */
export function isDark(r: number, g: number, b: number): boolean {
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma < 128;
}

/**
 * Converts a hex colour string to RGB or HSL format, if that format is specified.
 */
export function format(hex: string, colourFormat: ColourFormat): string {
  let colour = hex;

  switch (colourFormat) {
    case ColourFormats.RGB: {
      const rgb = hexToRgb(colour);
      colour = `rgb(${rgb.join(', ')})`;
      break;
    }
    case ColourFormats.HSL: {
      const hsl = hexToHsl(colour.substring(1));
      colour = `hsl(${hsl[0]}°, ${hsl[1]}%, ${hsl[2]}%)`;
      break;
    }
    case ColourFormats.HSV: {
      const hsv = rgbToHsv(...hexToRgb(colour));
      colour = `hsv(${hsv[0]}°, ${hsv[1]}%, ${hsv[2]}%)`;
      break;
    }
    case ColourFormats.CMYK: {
      const cmyk = rgbToCmyk(...hexToRgb(colour));
      colour = `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`;
      break;
    }
    default:
      break;
  }

  return colour;
}

/**
 * Returns American-localized "colour" if needed.
 */
export function localize(capitalize: boolean, american = false): string {
  let word = american ? 'color' : 'colour';

  if (capitalize) {
    word = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return word;
}

/**
 * Returns a hex colour string using the given number.
 */
function valueToHex(value: number): string {
  return `#${('000000' + ((value * 0xffffff) | 0).toString(16)).slice(-6)}`;
}
