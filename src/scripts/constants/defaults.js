const Defaults = {
    time24hr       : true,
    animations     : true,
    showTime       : true,
    showHex        : true,
    showOpts       : true,

    colour         : 'regular',  // regular, full, hue, solid
    colourSolid    : '',
    ticker         : false,

    bg             : 'none',     // none, unsplash, custom
    bgUnsplashFreq : 'daily',    // perSession, daily, weekly
    bgCustomUrl    : '',
    bgOpacity      : 75,

    font           : 'default',  // default, web
    fontWeb        : '',

    panelVisited   : true,
    panelClosed    : true,
    panelDevices   : false,
    panelApps      : true,
    panelShortcuts : true,

    showWebStore   : true,

    maxVisited     : 10,
    maxClosed      : 10
};

export default Defaults;