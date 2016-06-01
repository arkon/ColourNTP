export class Unsplash {
  static getImage (frequency) {
    return new Promise((resolve, reject) => {
      // Set proper frequency in URL + screen size
      var unsplashUrl = `https://source.unsplash.com/${screen.width}x${screen.height}/`;

      switch (frequency) {
        case 'daily':
          unsplashUrl += 'daily';
          break;

        case 'weekly':
          unsplashUrl += 'weekly';
          break;
      }

      // Follow redirect to get actual image URL
      fetch(unsplashUrl)
        .then((res) => {
          if (res.ok && (res.status >= 200 && res.status < 300)) {
            resolve(res.url);
          } else {
            reject('Fetching Unsplash image failed');
          }
        });
    });
  }
}
