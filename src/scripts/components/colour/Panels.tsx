import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import {
    getSettings,
    getTopSites,
    getRecentlyClosed,
    getDevices,
    getApps,
    getShortcuts,
    setSetting,
    type TopSite,
    type RecentlyClosedSession,
    type Device,
    type App,
    type Shortcut,
} from '../../modules/browser';
import { theme } from '../../styles/theme';
import { Tab } from '../layout/Tab';
import { Tabs } from '../layout/Tabs';

const PanelsWrapper = styled.div`
  margin-top: 2em;
  position: relative;
  z-index: ${theme.zIndex.above};
`;

const Panel = styled.ul<{ $noFavicons?: boolean }>`
  animation: shiftUp 0.3s ease-out forwards;
  background-color: rgba(17, 17, 17, 0.85);
  border-radius: 3px;
  display: flex;
  flex-wrap: wrap;
  max-height: 300px;
  overflow: auto;
  padding: 0.5em;

  li {
    flex: 1 0 50%;
    max-width: 50%;
    position: relative;

    @media (min-width: 700px) {
      flex: 1 0 33.33%;
      max-width: 33.33%;
    }
  }

  li a {
    background-position: 0.5em center;
    background-repeat: no-repeat;
    background-size: 16px;
    border-radius: 3px;
    display: block;
    overflow: hidden;
    padding: ${({ $noFavicons }) => ($noFavicons ? '0.5em' : '0.5em 0.5em 0.5em 2em')};
    text-overflow: ellipsis;
    transition: background-color 0.2s;
    white-space: nowrap;
    ${({ $noFavicons }) => $noFavicons && 'background-image: none !important;'}

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const PanelMessage = styled.p`
  color: ${theme.colors.lightGrey};
  padding: 0.5em;
  text-align: center;
  width: 100%;
`;

const AppsPanel = styled(Panel)`
  li {
    flex: 0 0 100px;
    max-width: 100px;
    padding: 0.5em;
    text-align: center;
  }

  li a {
    background: none;
    padding: 0.5em;
  }

  img {
    display: block;
    height: 48px;
    margin: 0 auto 0.5em;
    width: 48px;
  }
`;

const DevicesPanel = styled(Panel)`
  flex-direction: column;
`;

const DeviceName = styled.p`
  font-weight: bold;
  padding: 0.5em;
`;

const DeviceTabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const RemoveButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 0.8em;
  opacity: 0;
  padding: 0.25em 0.5em;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.2s;

  li:hover & {
    opacity: 0.5;
  }

  &:hover {
    opacity: 1 !important;
  }
`;

const AppName = styled.div`
  font-size: 0.75em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export function Panels() {
    const [open, setOpen] = useState<number | null>(-1);
    const [showVisited, setShowVisited] = useState(true);
    const [topSites, setTopSites] = useState<TopSite[]>([]);
    const [showClosed, setShowClosed] = useState(true);
    const [recentlyClosed, setRecentlyClosed] = useState<RecentlyClosedSession[]>([]);
    const [showDevices, setShowDevices] = useState(true);
    const [devices, setDevices] = useState<Device[]>([]);
    const [showApps, setShowApps] = useState(true);
    const [showAllApps, setShowAllApps] = useState(true);
    const [showWebStore, setShowWebStore] = useState(true);
    const [apps, setApps] = useState<App[]>([]);
    const [showShortcuts, setShowShortcuts] = useState(true);
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
    const [showFavicons, setShowFavicons] = useState(true);
    const [blacklist, setBlacklist] = useState<Record<string, number>>({});

    const fetchSettings = useCallback(async () => {
        const settings = await getSettings();

        setOpen(settings.openPanel ?? -1);
        setShowVisited(settings.panelVisited);
        setShowClosed(settings.panelClosed);
        setShowDevices(settings.panelDevices);
        setShowApps(settings.panelApps);
        setShowAllApps(settings.showAllApps);
        setShowWebStore(settings.showWebStore);
        setShowShortcuts(settings.panelShortcuts);
        setShowFavicons(settings.showFavicons);
        setBlacklist(settings.blacklist);

        if (settings.panelVisited) {
            const sites = await getTopSites(settings.maxVisited, settings.blacklist);
            setTopSites(sites);
        }

        if (settings.panelClosed) {
            const closed = await getRecentlyClosed(settings.maxClosed);
            setRecentlyClosed(closed);
        }

        if (settings.panelDevices) {
            const devs = await getDevices();
            setDevices(devs);
        }

        if (settings.panelApps) {
            const appList = await getApps();
            setApps(appList);
        }

        if (settings.panelShortcuts) {
            const shortcutList = await getShortcuts();
            setShortcuts(shortcutList);
        }
    }, []);

    useEffect(() => {
        fetchSettings();

        const messageListener = (request: { msg: string }) => {
            if (request.msg === 'saved') {
                fetchSettings();
            }
        };

        chrome.runtime.onMessage.addListener(messageListener);
        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
        };
    }, [fetchSettings]);

    const handleTabClick = (tab: number | null) => {
        setSetting('openPanel', tab as never);
        setOpen(tab);
    };

    const handleSession = (session: string) => () => {
        chrome.sessions.restore(session);
    };

    const handleApp = (id: string, href?: string) => () => {
        if (href) {
            chrome.tabs.update(undefined as never, { url: href });
        } else {
            chrome.management.launchApp(id);
        }
    };

    const handleShortcut = (url: string) => () => {
        chrome.tabs.update(undefined as never, { url });
    };

    const handleBlacklist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const url = (e.target as HTMLButtonElement).dataset.url;
        if (!url) return;

        const newBlacklist = { ...blacklist, [url]: Date.now() };
        setBlacklist(newBlacklist);
        setSetting('blacklist', newBlacklist);
        fetchSettings();
    };

    const tabs: React.ReactElement<{ name: string }>[] = [];

    if (showVisited) {
        tabs.push(
            <Tab key="visited" name="Most visited">
                <Panel $noFavicons={!showFavicons}>
                    {topSites.map((site, i) => (
                        <li key={i}>
                            <a title={site.title} href={site.url} style={{ backgroundImage: `url('${site.img}')` }}>
                                {site.title}
                                <RemoveButton title="Hide" data-url={site.url} onClick={handleBlacklist}>
                                    ×
                                </RemoveButton>
                            </a>
                        </li>
                    ))}
                </Panel>
            </Tab>,
        );
    }

    if (showClosed) {
        tabs.push(
            <Tab key="closed" name="Recently closed">
                <Panel $noFavicons={!showFavicons}>
                    {recentlyClosed.length === 0 ? (
                        <PanelMessage>No recently closed sessions</PanelMessage>
                    ) : (
                        recentlyClosed.map((session, i) => (
                            <li key={i} onClick={handleSession(session.session)}>
                                <a
                                    title={session.title}
                                    style={{ backgroundImage: session.img ? `url('${session.img}')` : undefined }}
                                >
                                    {session.title}
                                </a>
                            </li>
                        ))
                    )}
                </Panel>
            </Tab>,
        );
    }

    if (showDevices) {
        tabs.push(
            <Tab key="devices" name="Other devices">
                <DevicesPanel $noFavicons={!showFavicons}>
                    {devices.length === 0 ? (
                        <PanelMessage>No tabs from other devices</PanelMessage>
                    ) : (
                        devices.map((device, i) => (
                            <li key={i}>
                                <DeviceName>{device.title}</DeviceName>
                                <DeviceTabs>
                                    {device.tabs.map((tab, j) => (
                                        <li key={j}>
                                            <a
                                                title={tab.title}
                                                href={tab.url}
                                                style={{ backgroundImage: `url('${tab.img}')` }}
                                            >
                                                {tab.title}
                                            </a>
                                        </li>
                                    ))}
                                </DeviceTabs>
                            </li>
                        ))
                    )}
                </DevicesPanel>
            </Tab>,
        );
    }

    if (showApps) {
        tabs.push(
            <Tab key="apps" name="Apps">
                <AppsPanel>
                    {apps.map((app, i) => {
                        if ((app.id === 'ntp-apps' && !showAllApps) || (app.id === 'ntp-webstore' && !showWebStore)) {
                            return null;
                        }

                        return (
                            <li key={i} onClick={handleApp(app.id, app.href)}>
                                <a>
                                    <img src={app.img} alt={app.title} />
                                    <AppName>{app.title}</AppName>
                                </a>
                            </li>
                        );
                    })}
                </AppsPanel>
            </Tab>,
        );
    }

    if (showShortcuts) {
        tabs.push(
            <Tab key="shortcuts" name="Shortcuts">
                <Panel $noFavicons={!showFavicons}>
                    {shortcuts.map((shortcut, i) => (
                        <li key={i} onClick={handleShortcut(shortcut.url)}>
                            <a title={shortcut.title} style={{ backgroundImage: `url('${shortcut.img}')` }}>
                                {shortcut.title}
                            </a>
                        </li>
                    ))}
                </Panel>
            </Tab>,
        );
    }

    if (tabs.length === 0) {
        return null;
    }

    return (
        <PanelsWrapper>
            <Tabs onToggle={handleTabClick} activeTab={open} canToggle>
                {tabs}
            </Tabs>
        </PanelsWrapper>
    );
}
