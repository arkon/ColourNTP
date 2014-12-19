/**
 * Helper functions
 */

function getConfig(key, callback) {
  chrome.storage.sync.get(key, function (result) {
    if (key instanceof Array) {
      callback(result);
    } else {
      callback(result[key]);
    }
  });
}

function $(id) {
  return document.getElementById(id);
}

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
}

Element.prototype.append = function (type) {
  return this.appendChild(document.createElement(type));
}
