class ImageBase64 {

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

export = ImageBase64;
