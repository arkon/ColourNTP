/**
 * Helper functions
 */

function getConfig(key) {
  chrome.storage.sync.get(key, function (result) {
    return result[key];
  });
}

function getConfigCallback(key, callback) {
  chrome.storage.sync.get(key, function (result) {
    callback(result[key]);
  });
}

function $(id) {
  return document.getElementById(id);
}
