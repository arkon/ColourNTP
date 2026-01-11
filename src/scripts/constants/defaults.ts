import {
  ColourFormats,
  ColourTypes,
  BackgroundImage,
  UnsplashFrequency,
  FontType,
  type ColourFormat,
  type ColourType,
  type BackgroundImageType,
  type UnsplashFrequencyType,
  type FontTypeValue,
} from './settings';

export interface Settings {
  time24hr: boolean;
  animations: boolean;
  adjustColour: boolean;
  flashSeparators: boolean;
  showTime: boolean;
  showTimeSec: boolean;
  showTimePost: boolean;
  showColour: boolean;
  colourFormat: ColourFormat;
  showDate: boolean;
  padHour: boolean;
  colour: ColourType;
  colourSolid: string;
  ticker: boolean;
  american: boolean;
  bg: BackgroundImageType;
  bgUnsplashFreq: UnsplashFrequencyType;
  bgCustomUrl: string;
  bgOpacity: number;
  font: FontTypeValue;
  fontWeb: string;
  shortcutOpts: boolean;
  shortcutNewTab: boolean;
  shortcutImage: boolean;
  panelVisited: boolean;
  panelClosed: boolean;
  panelDevices: boolean;
  panelApps: boolean;
  panelShortcuts: boolean;
  showAllApps: boolean;
  showWebStore: boolean;
  maxVisited: number;
  maxClosed: number;
  showFavicons: boolean;
  blacklist: Record<string, number>;
  openPanel?: number;
  saved?: string[];
}

export const DEFAULTS: Settings = {
  time24hr: true,
  animations: true,
  adjustColour: false,
  flashSeparators: false,
  showTime: true,
  showTimeSec: true,
  showTimePost: true,
  showColour: true,
  colourFormat: ColourFormats.HEX,
  showDate: false,
  padHour: true,
  colour: ColourTypes.REGULAR,
  colourSolid: '',
  ticker: false,
  american: false,
  bg: BackgroundImage.NONE,
  bgUnsplashFreq: UnsplashFrequency.DAILY,
  bgCustomUrl: '',
  bgOpacity: 75,
  font: FontType.DEFAULT,
  fontWeb: 'Anonymous Pro',
  shortcutOpts: true,
  shortcutNewTab: true,
  shortcutImage: true,
  panelVisited: true,
  panelClosed: true,
  panelDevices: false,
  panelApps: true,
  panelShortcuts: true,
  showAllApps: true,
  showWebStore: true,
  maxVisited: 10,
  maxClosed: 10,
  showFavicons: true,
  blacklist: {},
};
