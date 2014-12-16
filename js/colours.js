/**
 * Calculates and displays the time and corresponding (hexadecimal) colour.
 */
(function doTime() {
  var d     = new Date();
  var hours = d.getHours();
  var mins  = d.getMinutes();
  var secs  = d.getSeconds();

  if (hours < 10) { hours = "0" + hours };
  if (mins < 10)  { mins  = "0" + mins  };
  if (secs < 10)  { secs  = "0" + secs  };

  hours.toString();
  mins.toString();
  secs.toString();

  var hex = "#" + hours + mins + secs;

  document.getElementById("t").innerHTML = hours + " : " + mins + " : " + secs;
  document.getElementById("h").innerHTML = hex;

  document.body.style.background = hex;

  setTimeout(doTime, 1000);
})();

/**
 * Handle the showing/hiding of the Most Visited Pages panel.
 */
var mostVisited       = document.getElementById('chrome-contents');
var mostVisitedToggle = document.getElementById('chrome-contents-toggle');
mostVisitedToggle.onclick = function() {
  var visible = document.body.classList.contains('show-chrome-contents');

  if (visible)
    document.body.classList.remove('show-chrome-contents');
  else
    document.body.classList.add('show-chrome-contents');

  this.innerHTML = visible ? 'Show most visited' : 'Hide most visited';
};

/**
 * Given an array of URLs, build a DOM list of these URLs in the NTP.
 */
function buildVisitedList(mostVisitedURLs) {
  var visitedList = document.getElementById('mostVisited');

  for (var i = 0; i < mostVisitedURLs.length; i++) {
    var li   = visitedList.appendChild(document.createElement('li'));
    var a    = li.appendChild(document.createElement('a'));
    var site = mostVisitedURLs[i];

    a.style.backgroundImage = 'url(chrome://favicon/' + site.url + ')';
    a.href                  = site.url;
    a.title                 = site.url;
    a.innerHTML             = site.title;
  }
}

chrome.topSites.get(buildVisitedList);
