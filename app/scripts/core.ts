/**
 * Helper functions
 */

function getLocalConfig (key, callback) {
    chrome.storage.local.get(key, function (result) {
        if (key instanceof Array) {
            callback(result);
        } else {
            callback(result[key]);
        }
    });
}

function getSyncConfig (key, callback) {
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

Element.prototype.removeClassByPrefix = function (prefix) {
    var classes = this.classList;
    for (var i = 0; i < classes.length; i++) {
        var className = classes[i];
        if (className.startsWith(prefix)) {
            this.classList.removve(className);
        }
    }
}
