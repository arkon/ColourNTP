class Chrome {

    static getTopSites (max = 10) {
        chrome.topSites.get(function (visitedURLs) {
            visitedURLs = visitedURLs.slice(0, max);

            var items = [];

            for (var i in visitedURLs) {
                let site = visitedURLs[i];

                items.push({
                    title : site.title,
                    url   : site.url,
                    img   : `url(chrome://favicon/${site.url})`
                });
            }

            return items;
        });
    }

    static getRecentlyClosed (max = 10) {
        chrome.sessions.getRecentlyClosed({ maxResults: max }, function (sessions) {
            let items = [];

            for (var i in sessions) {
                let session = sessions[i];

                if (session.window && session.window.tabs.length === 1) {
                    session.tab = session.window.tabs[0];
                }

                items.push({
                    title   : session.tab ? session.tab.title : session.window.tabs.length + ' Tabs',
                    session : session.window ? session.window.sessionId : session.tab.sessionId,
                    img     : session.tab ? `url(chrome://favicon/${session.tab.url})` : null
                });

            }

            return items;
        });
    }

    static getApps () {
        let find128Image = function (icons) {
            for (var i in icons) {
                if (icons[i].size === 128) {
                    return icons[i].url;
                }
            }

            return '/noicon.png';
        };

        chrome.management.getAll(function (list) {
            // Only get active apps (no extensions)
            list = list.filter(function (a) {
                return a.enabled && a.type !== 'extension' && a.type !== 'theme' && a.isApp
            });

            // Sort them alphabetically
            list.sort(function (a, b) {
                if (a.name < b.name)      { return -1; }
                else if (a.name > b.name) { return 1; }
                else                      { return 0; }
            });

            let items = [];

            for (var i in list) {
                let extInf = list[i];

                items.push({
                    title : extInf.name,
                    id    : extInf.id,
                    img   : find128Image(extInf.icons)
                });
            }
        });
    }

    static getShortcuts () {
        let shortcuts = [
            {
                title: 'Bookmarks',
                url: 'chrome://bookmarks/',
                img: 'chrome://favicon/chrome://bookmarks/'
            },
            {
                title: 'History',
                url: 'chrome://history/',
                img: 'chrome://favicon/chrome://history/'
            },
            {
                title: 'Downloads',
                url: 'chrome://downloads/',
                img: 'chrome://favicon/chrome://downloads/'
            },
            {
                title: 'Extensions',
                url: 'chrome://extensions/',
                img: 'chrome://favicon/chrome://extensions/'
            },
            {
                title: 'Settings',
                url: 'chrome://settings/',
                img: 'chrome://favicon/chrome://settings/'
            }
        ];

        return shortcuts;
    }
}

export default Chrome;
