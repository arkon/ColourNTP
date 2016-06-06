export class WebFont {
  static loadFont (font) {
    if (navigator.onLine) {
      let elLinkFont = document.getElementById('webfont');

      if (!elLinkFont) {
        elLinkFont  = document.createElement('link');
        elLinkFont.rel = 'stylesheet';
        elLinkFont.id  = 'webfont';

        document.head.appendChild(elLinkFont);
      }

      elLinkFont.href = `https://fonts.googleapis.com/css?family=${font}:400,300`;
    }
  }
}
