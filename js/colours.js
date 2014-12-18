/**
 * Calculates and displays the time.
 */
getConfig(['time_normal', 'time_full', 'time_solid'], function (result) {
  // To add text shadows for full spectrum
  if (result['time_full']) {
    $('time').classList.add('full');
  }

  // If solid background mode is chosen, use that colour
  if (result['time_solid']) {
    getConfig('solid_color', function (hex) {
      document.body.style.background = hex;
    });
  }

  (function doTime() {
    var d     = new Date();
    var hours = d.getHours();
    var mins  = d.getMinutes();
    var secs  = d.getSeconds();

    if (hours < 10) { hours = '0' + hours };
    if (mins < 10)  { mins  = '0' + mins  };
    if (secs < 10)  { secs  = '0' + secs  };

    if (!result['time_solid']) {
      // "What colour is it?"/normal mode: display corresponding (hexadecimal) colour
      if (result['time_normal']) {
        var hex = '#' + hours + mins + secs;
      }

      /*
        Full spectrum (go from #000000 -> #FFFFFF in 1 day (approx))
        16 777 215 hex values
            86 400 seconds in a day

        16 777 215 / 86 400 = 194.180729167
      */
      if (result['time_full']) {
        var seconds = ((parseInt(hours, 10) * 60 * 60) +
                       (parseInt(mins, 10) * 60) +
                       parseInt(secs, 10)) * 194;
        var hex = '#' + seconds.toString(16);
      }

      $('h').innerHTML = hex;
      document.body.style.background = hex;
    }

    $('t').innerHTML = hours + ' : ' + mins + ' : ' + secs;

    setTimeout(doTime, 1000);
  })();
});

/**
 * Handle the showing/hiding of the panel and its contents.
 */
var visitedToggle = $('panel-toggle-visited'),
    closedToggle  = $('panel-toggle-closed'),
    appsToggle    = $('panel-toggle-apps');

getConfig('panel_visited', function (visible) {
  if (!visible) {
    visitedToggle.remove();
  }
});

getConfig('panel_closed', function (visible) {
  if (!visible) {
    closedToggle.remove();
  }
});

getConfig('panel_apps', function (visible) {
  if (!visible) {
    appsToggle.remove();
  }
});

visitedToggle.onclick = function() { togglePanel(0); };
closedToggle.onclick  = function() { togglePanel(1); };
appsToggle.onclick    = function() { togglePanel(2); };

function togglePanel(id) {
  if (id == -1) return;

  var toggle = document.body.classList.contains('panel-' + id);

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
getConfig('ntp_panel_visible', togglePanel);


/**
 * Given an array of URLs, build a DOM list of these URLs.
 */
getConfig('max_visited', function (max) {
  chrome.topSites.get(function (visitedURLs) {
    var visitedList = $('visited');

    // Consider the user's set maximum (default 10)
    visitedURLs = visitedURLs.slice(0, Number(max) || 10);

    for (var i in visitedURLs) {
      var li   = visitedList.appendChild(document.createElement('li'));
      var a    = li.appendChild(document.createElement('a'));
      var site = visitedURLs[i];

      a.style.backgroundImage = 'url(chrome://favicon/' + site.url + ')';
      a.href      = site.url;
      a.title     = site.title;
      a.innerHTML = site.title;
    }
  });
});


/**
 * Given an array of recently closed sessions, build a DOM list of the pages.
 */
getConfig('max_closed', function (max) {
  chrome.sessions.getRecentlyClosed(
    {
      maxResults: Number(max) || 10
    },
    function (sessions) {
      var closedList = $('closed');

      for (var i in sessions) {
        var li      = closedList.appendChild(document.createElement('li'));
        var a       = li.appendChild(document.createElement('a'));
        var session = sessions[i];

        if (session.window && session.window.tabs.length === 1)
          session.tab = session.window.tabs[0];

        a.style.backgroundImage = session.tab ? 'url(chrome://favicon/' + session.tab.url + ')' : null;
        a.href      = session.tab ? session.tab.url : null;
        a.title     = session.tab ? session.tab.title : session.window.tabs.length + ' Tabs';
        a.innerHTML = session.tab ? session.tab.title : session.window.tabs.length + ' Tabs';
      }
    }
  );
});


/**
 * Given an array of apps, build a DOM list of the apps.
 */
chrome.management.getAll(function (list) {
  var appsList = $('apps');

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

  var store = appsList.appendChild(document.createElement('a'));
  store.id        = 'store-link';
  store.href      = 'https://chrome.google.com/webstore';
  store.innerHTML = 'Chrome Web Store';
});

// Finds an 128px x 128px icon for an app
function find128Image(icons) {
  for (var i in icons) {
    if (icons[i].size == '128') {
      return icons[i].url;
    }
  }

  return '/noicon.png';
}
