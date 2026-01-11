import { DEFAULTS, type Settings } from '../constants/defaults';

export interface TopSite {
    title: string;
    url: string;
    img: string;
}

export interface RecentlyClosedSession {
    title: string;
    session: string;
    img: string | null;
}

export interface App {
    title: string;
    id: string;
    img: string;
    href?: string;
}

export interface DeviceTab {
    title: string;
    url: string;
    img: string;
}

export interface Device {
    title: string;
    tabs: DeviceTab[];
}

export interface Shortcut {
    title: string;
    url: string;
    img: string;
}

function favicon(url: string): string {
    return `/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
}

function find128Image(icons: chrome.management.IconInfo[]): string {
    for (const icon of icons) {
        if (icon.size === 128) {
            return icon.url;
        }
    }
    return '/noicon.png';
}

const SHORTCUTS: Shortcut[] = [
    {
        title: 'Bookmarks',
        url: 'chrome://bookmarks/',
        img: favicon('chrome://bookmarks/'),
    },
    {
        title: 'History',
        url: 'chrome://history/',
        img: favicon('chrome://history/'),
    },
    {
        title: 'Downloads',
        url: 'chrome://downloads/',
        img: favicon('chrome://downloads/'),
    },
    {
        title: 'Extensions',
        url: 'chrome://extensions/',
        img: favicon('chrome://extensions/'),
    },
    {
        title: 'Settings',
        url: 'chrome://settings/',
        img: favicon('chrome://settings/'),
    },
];

export function getTopSites(max = 10, blacklist: Record<string, number> = {}): Promise<TopSite[]> {
    return new Promise((resolve) => {
        chrome.topSites.get((visitedURLs) => {
            const filtered = visitedURLs.filter((site) => !blacklist[site.url]);

            const items = filtered.map((site) => ({
                title: site.title,
                url: site.url,
                img: favicon(site.url),
            }));

            resolve(items.slice(0, parseInt(String(max), 10)));
        });
    });
}

export function getRecentlyClosed(max = 10): Promise<RecentlyClosedSession[]> {
    return new Promise((resolve) => {
        chrome.sessions.getRecentlyClosed((sessions) => {
            const sliced = sessions.slice(0, parseInt(String(max), 10));

            const items = sliced.map((session) => {
                let tab = session.tab;
                if (session.window && session.window.tabs && session.window.tabs.length === 1) {
                    tab = session.window.tabs[0];
                }

                return {
                    title: tab ? tab.title || '' : `${session.window?.tabs?.length || 0} Tabs`,
                    session: session.window ? session.window.sessionId || '' : tab?.sessionId || '',
                    img: tab ? favicon(tab.url || '') : null,
                };
            });

            resolve(items);
        });
    });
}

export function getApps(): Promise<App[]> {
    return new Promise((resolve) => {
        chrome.management.getAll((list) => {
            const filtered = list.filter((a) => a.enabled && a.type !== 'extension' && a.type !== 'theme' && a.isApp);

            filtered.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });

            const items: App[] = filtered.map((extInf) => ({
                title: extInf.name,
                id: extInf.id,
                img: find128Image(extInf.icons || []),
            }));

            items.push({
                title: 'All apps',
                id: 'ntp-apps',
                img: '../assets/img/apps128.png',
                href: 'chrome://apps',
            });

            items.push({
                title: 'Web store',
                id: 'ntp-webstore',
                img: '../assets/img/webstore128.png',
                href: 'https://chrome.google.com/webstore',
            });

            resolve(items);
        });
    });
}

export function getShortcuts(): Promise<Shortcut[]> {
    return Promise.resolve(SHORTCUTS);
}

export function getDevices(): Promise<Device[]> {
    return new Promise((resolve) => {
        chrome.sessions.getDevices((devices) => {
            const items = devices.map((device) => {
                const tabs: DeviceTab[] = [];

                for (const session of device.sessions) {
                    const sessionTabs = session.window ? session.window.tabs : session.tab ? [session.tab] : [];

                    for (const tab of sessionTabs || []) {
                        tabs.push({
                            title: tab.title || '',
                            url: tab.url || '',
                            img: favicon(tab.url || ''),
                        });
                    }
                }

                return {
                    title: device.deviceName,
                    tabs,
                };
            });

            resolve(items);
        });
    });
}

export function getSettings(): Promise<Settings> {
    return getSetting(null) as Promise<Settings>;
}

export function getSetting<K extends keyof Settings>(key: K): Promise<Pick<Settings, K>>;
export function getSetting(key: null): Promise<Settings>;
export function getSetting(key: string | null): Promise<Settings | Partial<Settings>> {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, (results) => {
            if (key === null) {
                resolve({ ...DEFAULTS, ...results } as Settings);
            } else {
                resolve(results as Partial<Settings>);
            }
        });
    });
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]): Promise<void> {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ [key]: value }, () => {
            chrome.runtime.sendMessage({
                msg: 'saved',
                key,
            });
            resolve();
        });
    });
}
