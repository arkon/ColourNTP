/**
 * Helper functions
 */

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
