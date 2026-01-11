export function loadFont(font: string): void {
  if (navigator.onLine) {
    let elLinkFont = document.getElementById('webfont') as HTMLLinkElement | null;

    if (!elLinkFont) {
      elLinkFont = document.createElement('link');
      elLinkFont.rel = 'stylesheet';
      elLinkFont.id = 'webfont';
      document.head.appendChild(elLinkFont);
    }

    elLinkFont.href = `https://fonts.googleapis.com/css?family=${font}:400,300`;
  }
}
