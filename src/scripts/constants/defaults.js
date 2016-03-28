const Defaults = {
  time24hr       : true,
  animations     : true,
  showTime       : true,
  showTimeSec    : true,
  showColour     : true,
  colourFormat   : 'hex',      // hex, rgb
  showDate       : false,

  colour         : 'regular',  // regular, full, hue, solid, random
  colourSolid    : '',
  ticker         : false,

  bg             : 'none',     // none, unsplash, custom
  bgUnsplashFreq : 'daily',    // perSession, daily, weekly
  bgCustomUrl    : '',
  bgOpacity      : 75,

  font           : 'default',  // default,  web
  fontWeb        : '',

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

export default Defaults;
