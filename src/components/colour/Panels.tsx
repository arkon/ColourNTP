import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import CloseIcon from '../../icons/close.svg?react';
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
  margin: 1em auto 0;
  max-width: 60em;
  position: relative;
  width: auto;
  z-index: ${theme.zIndex.above};
`;

const Panel = styled.ul<{ $noFavicons?: boolean }>`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 5px;
  contain: content;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 0.5rem;

  li {
    contain: content;
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: left;
  }

  li a {
    background-color: #eee;
    background-position: 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1rem 1rem;
    border: 1px solid #ddd;
    color: ${theme.colors.darkGrey};
    display: inline-block;
    font-size: 1rem;
    height: 4rem;
    line-height: 2rem;
    margin: 0.5rem;
    overflow: hidden;
    padding: ${({ $noFavicons }) => ($noFavicons ? '1rem 0.5rem' : '1rem 0.5rem 1rem 1.85rem')};
    text-overflow: ellipsis;
    transition: box-shadow 0.3s;
    white-space: nowrap;
    width: 10rem;
    will-change: box-shadow;
    ${({ $noFavicons }) => $noFavicons && 'background-image: none !important;'}

    &:hover {
      box-shadow: 0 0 0 2px #777;
      color: #0e0e0e;
    }

    &:active {
      transform: scale(0.95);
    }

    @media (max-width: 600px) {
      background-position: center 0.5rem;
      font-size: 0.85rem;
      margin: 0.25rem;
      padding: 1.75rem 0.5rem;
      text-align: center;
      width: 6rem;
    }
  }
`;

const PanelMessage = styled.p`
  color: ${theme.colors.darkGrey};
  display: block;
  font-size: 0.9rem;
  padding: 0.5em 1em;
  text-align: center;
  width: 100%;
`;

const AppsPanel = styled(Panel)`
  li {
    height: 10em;
    text-align: center;
  }

  li a {
    align-items: center;
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
    justify-content: center;
    line-height: 1.25;
    padding: 1em;
    white-space: normal;
    width: 15em;
  }

  img {
    height: 3em;
    margin-bottom: 0.5em;
    width: 3em;
  }
`;

const DevicesPanel = styled(Panel)`
  > li {
    width: 100%;

    & + li {
      margin-top: 1em;
    }
  }
`;

const DeviceName = styled.p`
  color: ${theme.colors.darkGrey};
  text-align: center;
`;

const DeviceTabs = styled.ul`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  font-size: 0;
  height: 1.5rem;
  opacity: 0.5;
  position: absolute;
  right: 5px;
  top: 5px;
  transition: opacity 0.3s;
  width: 1.5rem;

  li:hover & {
    opacity: 1;
  }

  &:hover {
    opacity: 1;
  }
`;

const RemoveButtonCloseIcon = styled(CloseIcon)`
  height: 50%;
  width: 50%;
`;

const AppName = styled.div`
  color: ${theme.colors.darkGrey};
  font-size: 1rem;
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
            <Tab key="visited" name="Most visited" variant="panels">
                <Panel $noFavicons={!showFavicons}>
                    {topSites.map((site, i) => (
                        <li key={i}>
                            <a title={site.title} href={site.url} style={{ backgroundImage: `url('${site.img}')` }}>
                                {site.title}
                                <RemoveButton title="Hide" data-url={site.url} onClick={handleBlacklist}>
                                    <RemoveButtonCloseIcon />
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
            <Tab key="closed" name="Recently closed" variant="panels">
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
            <Tab key="devices" name="Other devices" variant="panels">
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
            <Tab key="apps" name="Apps" variant="panels">
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
            <Tab key="shortcuts" name="Shortcuts" variant="panels">
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
            <Tabs onToggle={handleTabClick} activeTab={open} canToggle variant="panels">
                {tabs}
            </Tabs>
        </PanelsWrapper>
    );
}
