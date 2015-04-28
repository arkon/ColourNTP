(function() {

  var isOnline = navigator.onLine;

  // Check if new day (to limit getting a new Reddit background)
  var date = new Date().getDay();
  var new_day = false;

  if (localStorage['date'] == date)
    new_day = true;
  else
    localStorage['date'] = date;

  var dl_btn = document.getElementById('download');


  /**
   * Inject custom font.
   */
  getConfig(['font'], function (result) {
    if (isOnline && result['font'] && result['font'].indexOf('Default') <= -1) {

      document.head +=
        '<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/css?family=' +
        result['font'] +
        '">';

      var style = document.createElement('style');
      style.innerHTML += '*{font-family:' + result['font'] + '!important;}';

      document.head.appendChild(style);
    }
  });


  /**
   * Calculates and displays the time, along with the appropriate
   * background colour.
   */
  getConfig(['24-hour-time', 'bg', 'bg_reddit', 'bg_image', 'bg_opacity', 'animations',
             'time_normal', 'time_full', 'time_full_hue', 'time_solid',
             'history'], function (result) {

    var bgOpacity = 1;

    // Custom background image (only if online)
    if (isOnline) {
      if (result['bg']) {
        if (result['bg_reddit']) {
          if (!new_day && localStorage['reddit_img']) {
            document.body.style.backgroundImage = 'url("' + localStorage['reddit_img'] + '")';
            dl_btn.href = localStorage['reddit_img'];
          } else {
            getRedditImage();
          }
        } else {
          if (result['bg_image']) {
            document.body.style.backgroundImage = 'url("' + result['bg_image'] + '")';
          }
        }
      }

      if (result['bg_opacity']) {
        bgOpacity = result['bg_opacity'] / 100;
      }
    }

    if (!isOnline || !result['bg']) {
      dl_btn.remove();
    }

    if (result['animations'] === false) {
      document.body.addClass('notransition');
    }

    // Add text shadows to protect against backgroundss
    if (bgOpacity <= 0.25 || result['time_full'] || result['time_full_hue']) {
      $('#time').addClass('full');
    }

    // If solid background mode is chosen, use that colour
    if (result['time_solid']) {
      getConfig('solid_color', function (hex) {
        if (bgOpacity !== 0) {
          if (bgOpacity !== 1 && result['bg']) {
            $('#contents').style.backgroundColor = rgba(hex, bgOpacity);
          } else {
            $('#contents').style.backgroundColor = hex;
          }
        }
      });
    }

    // Stack for past colours
    else if (result['history']) {
      var stack = new FixedStack(10, new Array(10));
    }

    // Time + colours
    (function doTime() {
      var d     = new Date();
      var hours = d.getHours();
      var mins  = d.getMinutes();
      var secs  = d.getSeconds();

      var twentyFourHourTime = result['24-hour-time'] !== false;
      var isPM = hours >= 12;
      if (!twentyFourHourTime) {
        if (isPM) {
          hours -= 12;
        }

        // Instead of reading as 00 AM or PM, read as 12 AM/PM
        hours = hours === 0 ? 12 : hours;
      }

      if (hours < 10) { hours = '0' + hours; }
      if (mins < 10)  { mins  = '0' + mins;  }
      if (secs < 10)  { secs  = '0' + secs;  }

      // "What colour is it?"/normal mode: display corresponding (hexadecimal) colour
      if (!result['time_solid']) {
        var hex = '#' + hours + mins + secs;

        if (result['time_full']) {
          var seconds = ((parseInt(hours, 10) * 60 * 60) + (parseInt(mins, 10) * 60) + parseInt(secs, 10));
          var hex = secondToHexColour(seconds);
        }

        if (result['time_full_hue']) {
          var seconds = ((parseInt(hours, 10) * 60 * 60) + (parseInt(mins, 10) * 60) + parseInt(secs, 10));
          var hex = secondToHueColour(seconds);
        }

        $('#h').innerHTML = hex;

        if (bgOpacity !== 0) {
          if (bgOpacity !== 1 && result['bg']) {
            $('#contents').style.backgroundColor = rgba(hex, bgOpacity);
          } else {
            $('#contents').style.backgroundColor = hex;
          }
        }

        if (result['history']) {
          stack.push(hex);

          $('#history').innerHTML = '';
          for (var i = 0; i < 10; i++) {
            var past = $('#history').append('div');
            past.style.backgroundColor = stack.get(i);
            past.dataset.hex           = stack.get(i) || "Hold on...";
            past.className             = 'past-colour';

            past.addEventListener('click', function() {
              prompt('Copy to clipboard: Ctrl/⌘+C, Enter', this.dataset.hex);
            });
          }
        }
      }

      $('#t-hour').innerHTML = hours + ' : ';
      $('#t-min').innerHTML = mins + ' : ';
      $('#t-sec').innerHTML = secs;

      if (!twentyFourHourTime) {
        $('#t').setAttribute('time-postfix', isPM ? 'PM' : 'AM');
      }

      setTimeout(doTime, 1000);
    })();
  });


  /**
   * "Converts" the second to a hex value, from 0x000000 to 0xFFFFFF.
   * 00:00:00 corresponds to #000000 and 23:59:59 corresponds to #ffffff.
   *
   * @param   Number  secondInDay   The current second in the day.
   * @return  String                The hex colour value (e.g. #1fd531).
   */
  function secondToHexColour(secondInDay) {
    return '#' + ('00000' + (secondInDay / (24 * 60 * 60 - 1) * 0xFFFFFF | 0).toString(16)).slice(-6);
  }


  /**
   * Converts an HSL color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   *
   * @param   Number  h       The hue.
   * @param   Number  s       The saturation.
   * @param   Number  l       The lightness.
   * @return  Array           The RGB representation.
   */
  function hslToRgb(h, s, l){
    var r, g, b;

    if (s === 0){
      r = g = b = l;  // Achromatic
    } else {
      function hue2rgb(p, q, t){
        if (t < 0) t++;
        if (t > 1) t--;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
  }


  /**
   * Converts RGB values to a hex colour string.
   */
  function rgbToHex(r, g, b) {
    return '#' + (((1 << 24) + (r << 16) + (g << 8) + b) | 0).toString(16).slice(1);
  }


  /**
   * Converts a hex colour string to an array of RGB values.
   */
  function hexToRGB(hex) {
    var r = parseInt(hex, 16) >> 16;
    var g = parseInt(hex, 16) >> 8 & 0xFF;
    var b = parseInt(hex, 16) & 0xFF;
    return [r,g,b];
  }


  /**
   * "Converts" the second to a hex value, as a point along the hue spectrum.
   * 00:00:00 corresponds to #ff0000, 12:00:00 corresponds to #00feff.
   */
  function secondToHueColour(secondInDay) {
    var hue = secondInDay / (24 * 60 * 60);
    return rgbToHex.apply(null, hslToRgb(hue, 1, 0.5));
  }


  /**
   * Converts a hex colour to an RGBA string with the provided alpha value.
   */
  function rgba(hex, a) {
    var colour = hexToRGB(hex.substring(1, 7));
    return 'rgba(' + colour[0] + ',' + colour[1] + ',' + colour[2] + ',' + a + ')';
  }


  /**
   * Gets the top wallpaper from /r/wallpapers and sets it as the background image.
   */
  function getRedditImage() {
    getJSON('http://www.reddit.com/r/wallpapers/hot.json?sort=new&limit=1', function (data) {
      var img = data.data.children[0].data.url;

      // Imgur link, but directly to image file
      if (img.indexOf('imgur.com') >= 0 && (img.indexOf('.png') < 0 || img.indexOf('.jpg') < 0)) {
        img += '.png';
      }

      // "Cache" the image URL in local storage
      localStorage['reddit_img'] = img;

      document.body.style.backgroundImage = 'url("' + img + '")';

      dl_btn.href = img;
    }, function (status) {
      console.log('Something went wrong while fetching from Reddit.');
    });
  }


  /**
   * Handle the showing/hiding of the panel and its contents.
   */
  var visitedToggle   = $('#panel-toggle-visited'),
      closedToggle    = $('#panel-toggle-closed'),
      appsToggle      = $('#panel-toggle-apps'),
      shortcutsToggle = $('#panel-toggle-shortcuts');

  getConfig(['panel_visited', 'panel_closed', 'panel_apps', 'panel_shortcuts',
             'ntp_panel_visible'], function (results) {
    if (results['panel_visited'] === false) {
      visitedToggle.remove();
    }

    if (results['panel_closed'] === false) {
      closedToggle.remove();
    }

    if (results['panel_apps'] === false) {
      appsToggle.remove();
    }

    if (results['panel_shortcuts'] === false) {
      shortcutsToggle.remove();
    }

    if (results['panel_visited'] !== false ||
        results['panel_closed'] !== false ||
        results['panel_apps'] !== false ||
        results['panel_shortcuts'] !== false) {
      visitedToggle.onclick   = function() { togglePanel(0); };
      closedToggle.onclick    = function() { togglePanel(1); };
      appsToggle.onclick      = function() { togglePanel(2); };
      shortcutsToggle.onclick = function() { togglePanel(3); };

      function togglePanel(id) {
        if (id === -1) return;

        var toggle = document.body.hasClass('panel-' + id);

        document.body.removeClass('show-panel');
        document.body.removeClassByPrefix('panel-');

        if (toggle) {
          id = -1;
        } else {
          document.body.addClass('show-panel');
          document.body.addClass('panel-' + id);
        }

        // Save state
        chrome.storage.sync.set({ 'ntp_panel_visible': id });
      }

      // Display panel depending on synced state
      togglePanel(results['ntp_panel_visible']);
    }
  });


  /**
   * Given an array of URLs, build a DOM list of these URLs.
   */
  getConfig('max_visited', function (max) {
    chrome.topSites.get(function (visitedURLs) {
      var visitedList = $('#visited');

      // Consider the user's set maximum (default 10)
      visitedURLs = visitedURLs.slice(0, Number(max) || 10);

      for (var i in visitedURLs) {
        var li   = visitedList.append('li');
        var a    = li.append('a');
        var site = visitedURLs[i];

        a.style.backgroundImage = 'url(chrome://favicon/' + site.url + ')';
        a.className = 'item-' + i;
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
        var closedList = $('#closed');

        if (sessions.length === 0) {
          var p = closedList.append('p');
          p.id = 'no-closed'
          p.innerHTML = 'No recently closed sessions to show';
        }

        for (var i in sessions) {
          var li      = closedList.append('li');
          var a       = li.append('a');
          var session = sessions[i];

          if (session.window && session.window.tabs.length === 1)
            session.tab = session.window.tabs[0];

          a.style.backgroundImage = session.tab ? 'url(chrome://favicon/' + session.tab.url + ')' : null;
          a.className = 'item-' + i;
          a.title     = session.tab ? session.tab.title : session.window.tabs.length + ' Tabs';
          a.innerHTML = session.tab ? session.tab.title : session.window.tabs.length + ' Tabs';

          a.addEventListener('click', (function(session) {
            return function() {
              chrome.sessions.restore(session.window ? session.window.sessionId : session.tab.sessionId, null);
              return false;
            };
          })(session));
        }
      }
    );
  });


  /**
   * Given an array of apps, build a DOM list of the apps.
   */
  chrome.management.getAll(function (list) {
    var appsList = $('#apps');

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
      var li = appsList.append('li');
      var a  = li.append('a');
      var extInf = list[i];

      li.addEventListener('click', (function(id) {
        return function() {
          chrome.management.launchApp(id);
        };
      })(extInf.id));

      a.className = 'item-' + i;

      var img = a.appendChild(new Image());
      img.src = find128Image(extInf.icons);

      var name = a.append('div');
      name.className = 'app-name';
      name.innerHTML = extInf.name;
    }

    var store = appsList.append('a');
    store.id        = 'store-link';
    store.href      = 'https://chrome.google.com/webstore';
    store.innerHTML = 'Chrome Web Store';
  });


  /**
   * Finds an 128px x 128px icon for an app.
   */
  function find128Image(icons) {
    for (var i in icons) {
      if (icons[i].size === 128) {
        return icons[i].url;
      }
    }

    return '/noicon.png';
  }


  /**
   * Creates shortcuts list
   */
  (function createShortcuts() {
    var shortcutsList = $('#shortcuts');

    var shortcuts = [
      {
        title: 'Bookmarks',
        url: 'chrome://bookmarks/'
      },
      {
        title: 'History',
        url: 'chrome://history/'
      },
      {
        title: 'Downloads',
        url: 'chrome://downloads/'
      },
      {
        title: 'Extensions',
        url: 'chrome://extensions/'
      },
      {
        title: 'Settings',
        url: 'chrome://settings/'
      }
    ];

    for (var i in shortcuts) {
      var li = shortcutsList.append('li');
      var a  = li.append('a');
      var shortcutItem = shortcuts[i];

      li.addEventListener('click', (function(url) {
        return function() {
          chrome.tabs.update(null, { url: url });
        };
      })(shortcutItem.url));

      a.style.backgroundImage = 'url("chrome://favicon/' + shortcutItem.url + '")';
      a.className = 'item-' + i;
      a.title     = shortcutItem.title;
      a.innerHTML = shortcutItem.title;
    }
  })();

})();
