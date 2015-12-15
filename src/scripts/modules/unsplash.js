class Unsplash {
    static getImage (frequency, callback) {
        // Set proper frequency in URL + screen size
        let unsplashUrl = `https://source.unsplash.com/${screen.width}x${screen.height}/`;

        switch (frequency) {
            case 'daily':
                unsplashUrl += 'daily';
                break;

            case 'weekly':
                unsplashUrl += 'weekly';
                break;

            default:  // perSession
                unsplashUrl += 'random';
                break;
        }

        // Follow redirect to get actual image URL
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState === 4 && (req.status >= 200 && req.status < 300)) {
                callback(req.responseURL);
            }
        };
        req.open('GET', unsplashUrl, true);
        req.send(null);
    }
}

export default Unsplash;
