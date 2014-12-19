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


/**
 * A "stack" with a fixed size. If an item is pushed to the stack and
 * the stack is "full", the first item is removed.
 */

function FixedStack(maxSize, initialValues) {
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
