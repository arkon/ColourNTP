import { DEFAULTS } from '../constants/defaults';

const _SHORTCUTS = [
  {
    title : 'Bookmarks',
    url   : 'chrome://bookmarks/',
    img   : 'chrome://favicon/size/16@2x/chrome://bookmarks/'
  },
  {
    title : 'History',
    url   : 'chrome://history/',
    img   : 'chrome://favicon/size/16@2x/chrome://history/'
  },
  {
    title : 'Downloads',
    url   : 'chrome://downloads/',
    img   : 'chrome://favicon/size/16@2x/chrome://downloads/'
  },
  {
    title : 'Extensions',
    url   : 'chrome://extensions/',
    img   : 'chrome://favicon/size/16@2x/chrome://extensions/'
  },
  {
    title : 'Settings',
    url   : 'chrome://settings/',
    img   : 'chrome://favicon/size/16@2x/chrome://settings/'
  }
];

export default class Chrome {
  // Panel helpers
  // ============================================================================================

  static getTopSites(max = 10, blacklist = {}) {
    return new Promise((resolve) => {
      chrome.topSites.get((visitedURLs) => {
        visitedURLs = visitedURLs.filter((site) => !blacklist[site.url]);

        let items = visitedURLs.map((site) => ({
          title : site.title,
          url   : site.url,
          img   : Chrome._favicon(site.url)
        }));

        resolve(items.slice(0, parseInt(max, 10)));
      });
    });
  }

  static getRecentlyClosed(max = 10) {
    return new Promise((resolve) => {
      chrome.sessions.getRecentlyClosed((sessions) => {
        sessions = sessions.slice(0, parseInt(max, 10));

        let items = sessions.map((session) => {
          if (session.window && session.window.tabs.length === 1) {
            session.tab = session.window.tabs[0];
          }

          return {
            title   : session.tab ? session.tab.title : `${session.window.tabs.length} Tabs`,
            session : session.window ? session.window.sessionId : session.tab.sessionId,
            img     : session.tab ? Chrome._favicon(session.tab.url) : null
          };
        });

        resolve(items);
      });
    });
  }

  static getApps() {
    return new Promise((resolve) => {
      chrome.management.getAll((list) => {
        // Only get active apps (no extensions)
        list = list.filter((a) => a.enabled && a.type !== 'extension' && a.type !== 'theme' && a.isApp);

        // Sort them alphabetically
        list.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });

        let items = list.map(((extInf) => ({
          title : extInf.name,
          id    : extInf.id,
          img   : Chrome._find128Image(extInf.icons)
        })));

        items.push({
          title : 'All apps',
          id    : 'ntp-apps',
          img   : '../assets/img/apps128.png',
          href  : 'chrome://apps'
        });

        items.push({
          title : 'Web store',
          id    : 'ntp-webstore',
          img   : '../assets/img/webstore128.png',
          href  : 'https://chrome.google.com/webstore'
        });

        resolve(items);
      });
    });
  }

  static getShortcuts() {
    return new Promise((resolve) => {
      resolve(_SHORTCUTS);
    })
  }

  static getDevices() {
    return new Promise((resolve) => {
      chrome.sessions.getDevices((devices) => {
        let items = devices.map((device) => {
          let tabs = [];

          for (let session of device.sessions) {
            let sessionTabs = session.window ? session.window.tabs : [session.tab];

            for (let tab of sessionTabs) {
              tabs.push({
                title : tab.title,
                url   : tab.url,
                img   : Chrome._favicon(tab.url)
              });
            }
          }

          return {
            title : device.deviceName,
            tabs  : tabs
          };
        });

        resolve(items);
      });
    });
  }

  static _favicon(url) {
    const prefix = window.devicePixelRatio > 1.5 ? 'chrome://favicon/size/16@2x' : 'chrome://favicon';
    return `${prefix}/${url}`;
  }

  static _find128Image(icons) {
    for (let icon of icons) {
      if (icon.size === 128) {
        return icon.url;
      }
    }

    return '/noicon.png';
  }


  // Settings helpers (Chrome extension storage)
  // ============================================================================================

  static getSettings() {
    return Chrome.getSetting(null);
  }

  static getSetting(key) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (results) => {
        if (key === null) {
          results = Object.assign({}, DEFAULTS, results);
        }

        resolve(results);
      });
    });
  }

  static setSetting(key, value) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({
        [key]: value
      }, () => {
        // Used to trigger components to fetch updated settings
        chrome.runtime.sendMessage({
          msg : 'saved',
          key : key
        });

        resolve();
      });
    });
  }
}
