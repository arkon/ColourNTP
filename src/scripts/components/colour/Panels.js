import autobind from 'autobind-decorator';
import React from 'react';

import Tabs from '../layout/Tabs';
import Tab from '../layout/Tab';

import Chrome from '../../modules/chrome';

@autobind
class Panels extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open           : -1,

            showVisited    : true,
            topSites       : [],

            showClosed     : true,
            recentlyClosed : [],

            showDevices    : true,
            devices        : [],

            showApps       : true,
            showAllApps    : true,
            showWebStore   : true,
            apps           : [],

            showShortcuts  : true,
            shortcuts      : [],

            showFavicons   : true
        };
    }

    componentDidMount () {
        this.fetchSettings();

        // Fetch new settings when changed
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.msg === 'saved') {
                this.fetchSettings();
            }
        });
    }

    fetchSettings () {
        Chrome.getSettings((settings) => {
            this.setState({
                open          : settings.openPanel,
                showVisited   : settings.panelVisited,
                showClosed    : settings.panelClosed,
                showDevices   : settings.panelDevices,
                showApps      : settings.panelApps,
                showAllApps   : settings.showAllApps,
                showWebStore  : settings.showWebStore,
                showShortcuts : settings.panelShortcuts,
                showFavicons  : settings.showFavicons
            });

            if (settings.panelVisited) {
                Chrome.getTopSites((items) => {
                    this.setState({
                        topSites: items
                    });
                }, settings.maxVisited);
            }

            if (settings.panelClosed) {
                Chrome.getRecentlyClosed((items) => {
                    this.setState({
                        recentlyClosed: items
                    });
                }, settings.maxClosed);
            }

            if (settings.panelDevices) {
                Chrome.getDevices((items) => {
                    this.setState({
                        devices: items
                    });
                });
            }

            if (settings.panelApps) {
                Chrome.getApps((items) => {
                    this.setState({
                        apps: items
                    });
                });
            }

            if (settings.panelShortcuts) {
                Chrome.getShortcuts((items) => {
                    this.setState({
                        shortcuts: items
                    });
                });
            }
        });
    }

    onClickTab (tab) {
        Chrome.setSetting('openPanel', tab);

        this.setState({
            open: tab
        });
    }

    onClickSession (session) {
        return function () {
            chrome.sessions.restore(session, null);
        };
    }

    onClickApp (id, href) {
        return function () {
            if (href) {
                chrome.tabs.update(null, { url: href });
            } else {
                chrome.management.launchApp(id);
            }
        };
    }

    onClickShortcut (url) {
        return function () {
            chrome.tabs.update(null, { url: url });
        };
    }

    render () {
        var state = this.state;

        var panelsClass = 'panels';

        if (!state.showFavicons) {
            panelsClass += ' panels--nofavicons';
        }

        return (
            <div className={panelsClass}>
                <Tabs onToggle={this.onClickTab} activeTab={state.open} canToggle>
                    { state.showVisited &&
                        <Tab name='Most visited'>
                            <ul className='panels__panel'>
                                { state.topSites.map((site, i) => {
                                    return (
                                        <li key={i}>
                                            <a className={`item-${i}`} title={site.title} href={site.url}
                                                style={{ backgroundImage: `url('${site.img}')` }}>
                                                {site.title}
                                            </a>
                                        </li>
                                    );
                                }) }
                            </ul>
                        </Tab>
                    }

                    { state.showClosed &&
                        <Tab name='Recently closed'>
                            <ul className='panels__panel'>
                                { (state.recentlyClosed.length === 0) ?
                                    <p className='panels__panel__message'>No recently closed sessions</p> :
                                    state.recentlyClosed.map((session, i) => {
                                        return (
                                            <li key={i} onClick={this.onClickSession(session.session)}>
                                                <a className={`item-${i}`} title={session.title}
                                                    style={{ backgroundImage: `url('${session.img}')` }} >
                                                    {session.title}
                                                </a>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </Tab>
                    }

                    { state.showDevices &&
                        <Tab name='Other devices'>
                            <ul className='panels__panel panels__panel--devices'>
                                { (state.devices.length === 0) ?
                                    <p className='panels__panel__message'>No tabs from other devices</p> :
                                    state.devices.map((device, i) => {
                                        return (
                                            <li key={i} className={`item-${i}`} >
                                                <p className='panels__panel--devices__name'>{device.title}</p>
                                                <ul>
                                                    { device.tabs.map((tab, j) => {
                                                        return (
                                                            <li key={j}>
                                                                <a title={tab.title} href={tab.url}
                                                                    style={{ backgroundImage: `url('${tab.img}')` }} >
                                                                    {tab.title}
                                                                </a>
                                                            </li>
                                                        );
                                                    }) }
                                                </ul>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </Tab>
                    }

                    { state.showApps &&
                        <Tab name='Apps'>
                            <ul className='panels__panel panels__panel--apps'>
                                { state.apps.map((app, i) => {
                                    if ((app.id === 'ntp-apps' && !this.state.showAllApps) ||
                                        (app.id === 'ntp-webstore' && !this.state.showWebStore)) {
                                        return null;
                                    }

                                    return (
                                        <li key={i} onClick={this.onClickApp(app.id, app.href)}>
                                            <a className={`item-${i}`}>
                                                <img src={app.img} alt={app.title} />
                                                <div className='panels__panel--apps__name'>{app.title}</div>
                                            </a>
                                        </li>
                                    );
                                }) }
                            </ul>
                        </Tab>
                    }

                    { state.showShortcuts &&
                        <Tab name='Shortcuts'>
                            <ul className='panels__panel'>
                                { state.shortcuts.map((shortcut, i) => {
                                    return (
                                        <li key={i} onClick={this.onClickShortcut(shortcut.url)}>
                                            <a className={`item-${i}`} title={shortcut.title}
                                                style={{ backgroundImage: `url('${shortcut.img}')` }} >
                                                {shortcut.title}
                                            </a>
                                        </li>
                                    );
                                }) }
                            </ul>
                        </Tab>
                    }
                </Tabs>
            </div>
        );
    }
}

export default Panels;
