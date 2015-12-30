import autobind from 'autobind-decorator';
import React from 'react';

import Tabs from '../layout/tabs';
import Tab from '../layout/tab';

import Chrome from '../../modules/chrome';

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
            shortcuts      : []
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
                open          : settings.openPanel || -1,
                showVisited   : settings.panelVisited,
                showClosed    : settings.panelClosed,
                showDevices   : settings.panelDevices,
                showApps      : settings.panelApps,
                showAllApps   : settings.showAllApps,
                showWebStore  : settings.showWebStore,
                showShortcuts : settings.panelShortcuts
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

        return (
            <div className='panels'>
                <Tabs onToggle={this.onClickTab} activeTab={this.state.open} canToggle>
                    { state.showVisited &&
                        <Tab name='Most visited'>
                            <ul className='panels__panel'>
                                { state.topSites.map((site, i) => {
                                    let siteStyle = {
                                        backgroundImage: `url('${site.img}')`
                                    };

                                    return (
                                        <li key={i}>
                                            <a className={`item-${i}`} style={siteStyle} title={site.title} href={site.url}>
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
                                        let sessionStyle = {
                                            backgroundImage: `url('${session.img}')`
                                        };

                                        return (
                                            <li key={i} onClick={this.onClickSession(session.session)}>
                                                <a className={`item-${i}`} style={sessionStyle} title={session.title}>
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
                                                        let tabStyle = {
                                                            backgroundImage: `url('${tab.img}')`
                                                        };

                                                        return (
                                                            <li key={j}>
                                                                <a style={tabStyle} title={tab.title} href={tab.url}>
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
                                    if (app.id === 'ntp-apps' && !this.state.showAllApps) {
                                        return null;
                                    }

                                    if (app.id === 'ntp-webstore' && !this.state.showWebStore) {
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
                                    let shortcutStyle = {
                                        backgroundImage: `url('${shortcut.img}')`
                                    };

                                    return (
                                        <li key={i} onClick={this.onClickShortcut(shortcut.url)}>
                                            <a className={`item-${i}`} style={shortcutStyle} title={shortcut.title}>
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
