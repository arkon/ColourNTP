/**
 * Helper functions
 */

function getConfig (key, callback) {
  chrome.storage.sync.get(key, function (result) {
    if (key instanceof Array) {
      callback(result);
    } else {
      callback(result[key]);
    }
  });
}

function $ (selectors) {
  return document.querySelector(selectors);
}

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
}

Element.prototype.append = function (type) {
  return this.appendChild(document.createElement(type));
}

Element.prototype.hasClass = function (className) {
  return this.classList.contains(className);
}

Element.prototype.addClass = function (className) {
  this.classList.add(className);
}

Element.prototype.removeClass = function (className) {
  this.classList.remove(className);
}

Element.prototype.removeClassByPrefix = function (prefix) {
  var classes = this.classList;
  for (var i = 0; i < classes.length; i++) {
    var className = classes[i];
    if (className.startsWith(prefix)) {
      this.removeClass(className);
    }
  }
}


/**
 * A "stack" with a fixed size. If an item is pushed to the stack and
 * the stack is "full", the first item is removed.
 */

function FixedStack (maxSize, initialValues) {
  this.stack   = initialValues || [];
  this.maxSize = maxSize;
}

FixedStack.prototype.push = function (item) {
  this.stack.push(item);

  this.stack.splice(0, this.stack.length - this.maxSize);
}

FixedStack.prototype.get = function (index) {
  return this.stack[index];
}


/**
 * Gets a JSON object via a GET request.
 * Code from https://mathiasbynens.be/notes/xhr-responsetype-json
 */

function getJSON (url, successHandler, errorHandler) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = function () {
    var status, data;

    if (xhr.readyState === 4) {
      status = xhr.status;
      if (status === 200) {
        data = JSON.parse(xhr.responseText);
        successHandler && successHandler(data);
      } else {
        errorHandler && errorHandler(status);
      }
    }
  };

  xhr.send();
};


/**
 * Convert an image to a base64 url.
 * Code from http://stackoverflow.com/a/20285053/4421500
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat=image/png]
 */
function convertImgToBase64URL (url, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    var canvas = document.createElement('CANVAS'),
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
