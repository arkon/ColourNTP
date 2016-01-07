class Unsplash {
    static getImage (frequency, callback) {
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
        var req = new XMLHttpRequest();
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
