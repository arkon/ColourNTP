export const ColourFormats = {
  HEX: 'hex',
  RGB: 'rgb',
  HSL: 'hsl',
  HSV: 'hsv',
  CMYK: 'cmyk',
} as const;

export type ColourFormat = (typeof ColourFormats)[keyof typeof ColourFormats];

export const ColourTypes = {
  REGULAR: 'regular',
  FULL: 'full',
  HUE: 'hue',
  SOLID: 'solid',
  RANDOM: 'random',
} as const;

export type ColourType = (typeof ColourTypes)[keyof typeof ColourTypes];

export const BackgroundImage = {
  NONE: 'none',
  UNSPLASH: 'unsplash',
  CUSTOM: 'custom',
} as const;

export type BackgroundImageType = (typeof BackgroundImage)[keyof typeof BackgroundImage];

export const UnsplashFrequency = {
  SESSION: 'perSession',
  DAILY: 'daily',
  WEEKLY: 'weekly',
} as const;

export type UnsplashFrequencyType = (typeof UnsplashFrequency)[keyof typeof UnsplashFrequency];

export const FontType = {
  DEFAULT: 'default',
  WEB: 'web',
} as const;

export type FontTypeValue = (typeof FontType)[keyof typeof FontType];
