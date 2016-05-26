class Unsplash {
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
      const req = new XMLHttpRequest();
      req.timeout = 2000;
      req.onreadystatechange = () => {
        if (req.readyState === 4 && (req.status >= 200 && req.status < 300)) {
          resolve(req.responseURL);
        }
      };
      req.ontimeout = (e) => {
        reject(e);
      };
      req.open('GET', unsplashUrl, true);
      req.send(null);
    });
  }
}

export default Unsplash;
