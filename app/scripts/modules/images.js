class Images {

    /**
     * Gets the top wallpaper from /r/wallpapers and sets it as the background image.
     */
    getRedditImage () {
        getJSON('http://www.reddit.com/r/wallpapers/hot.json?sort=new&limit=1', function (data) {
            var url = data.data.children[0].data.url;

            // Imgur link, but directly to image file
            if (url.indexOf('imgur.com') >= 0 &&
                    (url.indexOf('.png') < 0 && url.indexOf('.jpg') < 0)) {
                url += '.png';
            }

            // 'Cache' the image URL in local storage
            convertImgToBase64URL(url, function (base64url) {
                chrome.storage.local.set({
                    'reddit_img': base64url,
                    'reddit_img_url': url
                });

                document.body.style.backgroundImage = `url('${base64url}')`;
            });

            dl_btn.href = url;
        }, function (status) {
            console.error('ColourNTP: Something went wrong while fetching data from Reddit.');
        });
    }

    /**
     * Convert an image to a base64 url.
     * Code from http://stackoverflow.com/a/20285053/4421500
     * @param  {String}   url
     * @param  {Function} callback
     * @param  {String}   [outputFormat=image/png]
     */
    convertImgToBase64URL (url, callback, outputFormat) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = function () {
            var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'), dataURL;

            canvas.height = img.height;
            canvas.width = img.width;

            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);

            callback(dataURL);
            canvas = null;
        };

        img.src = url;
    }
}

export default Images;
