import {
  ColourFormats,
  ColourTypes,
  BackgroundImage,
  UnsplashFrequency,
  FontType
} from './settings';

export const DEFAULTS = {
  time24hr       : true,
  animations     : true,
  showTime       : true,
  showTimeSec    : true,
  showTimePost   : true,
  showColour     : true,
  colourFormat   : ColourFormats.HEX,
  showDate       : false,
  padHour        : true,

  colour         : ColourTypes.REGULAR,
  colourSolid    : '',
  ticker         : false,
  american       : false,

  bg             : BackgroundImage.NONE,
  bgUnsplashFreq : UnsplashFrequency.DAILY,
  bgCustomUrl    : '',
  bgOpacity      : 75,

  font           : FontType.DEFAULT,
  fontWeb        : 'Anonymous Pro',

  shortcutOpts   : true,
  shortcutNewTab : true,
  shortcutImage  : true,

  panelVisited   : true,
  panelClosed    : true,
  panelDevices   : false,
  panelApps      : true,
  panelShortcuts : true,

  showAllApps    : true,
  showWebStore   : true,

  maxVisited     : 10,
  maxClosed      : 10,

  showFavicons   : true
};
