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

// 16 777 215 / 86 400 = 194.180729167


/**
 * Handle the showing/hiding of the panel and its contents.
 */
var visitedToggle   = document.getElementById('panel-toggle-visited'),
    closedToggle    = document.getElementById('panel-toggle-closed'),
    appsToggle      = document.getElementById('panel-toggle-apps');

visitedToggle.onclick   = function() { togglePanel(0); };
closedToggle.onclick    = function() { togglePanel(1); };
appsToggle.onclick      = function() { togglePanel(2); };

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

// Display panel depending on synced state
getConfigCallback('ntp_panel_visible', togglePanel);


/**
 * Given an array of URLs, build a DOM list of these URLs.
 */
function buildVisitedList(visitedURLs) {
  var visitedList = document.getElementById('visited');

  visitedURLs = visitedURLs.slice(0, getConfig('number_top') || 10);

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


/**
 * Given an array of recently closed sessions, build a DOM list of the pages.
 */
function buildClosedList(sessions) {
  var closedList = document.getElementById('closed');

  for (var i = 0; i < sessions.length; i++) {
    var li      = closedList.appendChild(document.createElement('li'));
    var a       = li.appendChild(document.createElement('a'));
    var session = sessions[i];

    if (session.window && session.window.tabs.length === 1)
      session.tab = session.window.tabs[0];

    a.style.backgroundImage = session.tab ? 'url(chrome://favicon/' + session.tab.url + ')' : null;
    a.href  = session.tab ? session.tab.url : null;
    a.title = session.tab ? session.tab.title : session.window.tabs.length + ' Tabs';
    a.innerHTML = session.tab ? session.tab.title : session.window.tabs.length + ' Tabs';
  }
}

// Get recently closed sessions
chrome.sessions.getRecentlyClosed({ maxResults: getConfig('max_results') || 10 }, buildClosedList);


/**
 * Given an array of apps, build a DOM list of the apps.
 */
function buildAppsList(list) {
  var appsList = document.getElementById('apps');

  // Only get active apps (no extensions)
  list = list.filter(function(a) {
    return a.enabled && a.type !== 'extension' && a.type !== 'theme' && a.isApp
  });

  // Sort them alphabetically
  list.sort(function (a, b) {
    if (a.name < b.name)      { return -1; }
    else if (a.name > b.name) { return 1; }
    else                      { return 0; }
  });

  for (var i in list) {
    var li = appsList.appendChild(document.createElement('li'));
    var a  = li.appendChild(document.createElement('a'));
    var extInf = list[i];

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

  var store       = appsList.appendChild(document.createElement('a'));
  store.id        = 'store-link';
  store.href      = 'https://chrome.google.com/webstore';
  store.innerHTML = 'Chrome Web Store';
}

// Finds an 128px x 128px icon for an app
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


/**
 * Storage helper
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
