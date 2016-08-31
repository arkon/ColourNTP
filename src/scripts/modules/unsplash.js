import { UnsplashFrequency } from '../constants/settings';

export default class Unsplash {
  static getImage (frequency) {
    return new Promise((resolve, reject) => {
      // Set proper frequency in URL + screen size
      let unsplashUrl = `https://source.unsplash.com/${screen.width}x${screen.height}/`;

      switch (frequency) {
        case UnsplashFrequency.DAILY:
          unsplashUrl += 'daily';
          break;

        case UnsplashFrequency.WEEKLY:
          unsplashUrl += 'weekly';
          break;
      }

      // Follow redirect to get actual image URL
      fetch(unsplashUrl)
        .then((res) => {
          if (!res.ok || res.status < 200 || res.status >= 300) {
            reject('Fetching Unsplash image failed');
          }

          resolve(res.url);
        });
    });
  }
}
