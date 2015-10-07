class Http {

    /**
     * Perform an XMLHttpRequest GET call and passes the response to the success handler.
     *
     * @param  {string}   url             The web URI to perform the call with.
     * @param  {Function} successHandler  Function callback upon success, with the response data.
     * @param  {Function} errorHandler    (Optional) Function callback upon error, with the request status.
     * @param  {boolean}  isJSON          (Optional) True if the data to be retrieved is JSON.
     */
    get (url, successHandler, errorHandler, isJSON) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            var status, data;

            if (xhr.readyState === 4) {
                status = xhr.status;

                if (status < 400 && xhr.responseText) {
                    data = isJSON ? JSON.parse(xhr.responseText) : xhr.responseText;

                    if (successHandler) {
                        successHandler(data);
                    }
                } else if (errorHandler) {
                    errorHandler(status);
                }
            }
        };

        xhr.send();
    }

    /**
     * Perform an XMLHttpRequest GET call and passes the response as a parsed JSON object to the success handler.
     *
     * @param  {string}   url             The web URI to perform the call with.
     * @param  {Function} successHandler  Function callback upon success, with the response data.
     * @param  {Function} errorHandler    (Optional) Function callback upon error, with the request status.
     */
    getJSON (url, successHandler, errorHandler) {
        this.get(url, successHandler, errorHandler, true);
    }
}

export default Http;
