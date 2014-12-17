/**
 * Calculates and displays the time and corresponding (hexadecimal) colour.
 */
(function doTime() {
  var d     = new Date();
  var hours = d.getHours();
  var mins  = d.getMinutes();
  var secs  = d.getSeconds();

  if (hours < 10) { hours = '0' + hours };
  if (mins < 10)  { mins  = '0' + mins  };
  if (secs < 10)  { secs  = '0' + secs  };

  hours.toString();
  mins.toString();
  secs.toString();

  var hex = '#' + hours + mins + secs;

  document.getElementById('t').innerHTML = hours + ' : ' + mins + ' : ' + secs;
  document.getElementById('h').innerHTML = hex;

  document.body.style.background = hex;

  setTimeout(doTime, 1000);
})();


/**
 * Handle the showing/hiding of the panel and its contents.
 */
var visitedToggle   = document.getElementById('panel-toggle-visited'),
    bookmarksToggle = document.getElementById('panel-toggle-bookmarks'),
    closedToggle    = document.getElementById('panel-toggle-closed'),
    appsToggle      = document.getElementById('panel-toggle-apps');

visitedToggle.onclick   = function() { togglePanel(0); };
bookmarksToggle.onclick = function() { togglePanel(1); };
closedToggle.onclick    = function() { togglePanel(2); };
appsToggle.onclick      = function() { togglePanel(3); };

function togglePanel(id) {
  if (id == -1) return;

  var toggle  = document.body.classList.contains('panel-' + id);

  document.body.className = '';

  if (toggle) {
    id = -1;
  } else {
    document.body.classList.add('show-panel');
    document.body.classList.add('panel-' + id);
  }

  // Save state
  chrome.storage.sync.set({ 'ntp_panel_visible': id });
}


/**
 * Given an array of URLs, build a DOM list of these URLs in the NTP.
 */
function buildVisitedList(visitedURLs) {
  var visitedList = document.getElementById('visited');

  for (var i = 0; i < visitedURLs.length; i++) {
    var li   = visitedList.appendChild(document.createElement('li'));
    var a    = li.appendChild(document.createElement('a'));
    var site = visitedURLs[i];

    a.style.backgroundImage = 'url(chrome://favicon/' + site.url + ')';
    a.href                  = site.url;
    a.title                 = site.title;
    a.innerHTML             = site.title;
  }
}

// Get most visited sites
chrome.topSites.get(buildVisitedList);

// Display panel depending on synced state
chrome.storage.sync.get('ntp_panel_visible', function (result) {
  togglePanel(result.ntp_panel_visible);
});


/**
 * Given an array of apps, build a DOM list of
 */
function buildAppsList(list) {
  var appsList = document.getElementById('apps');

  for (var i in list) {
    // Only get active apps (no extensions)
    var extInf = list[i];
    if (extInf.isApp && extInf.enabled) {
      var li = appsList.appendChild(document.createElement('li'));
      var a  = li.appendChild(document.createElement('a'));

      li.addEventListener('click', (function(ext) {
        return function() {
          chrome.management.launchApp(ext.id);
        };
      })(extInf));

      var img = a.appendChild(new Image());
      img.src = find128Image(extInf.icons);

      var name = a.appendChild(document.createElement('div'));
      name.className = 'app-name';
      name.innerHTML = extInf.name;
    }
  }
}

function find128Image(icons) {
  for (var icon in icons) {
    if (icons[icon].size == '128') {
      return icons[icon].url;
    }
  }

  return '/noicon.png';
}

// Get apps
chrome.management.getAll(buildAppsList);
