import React from 'react';

import Chrome from '../../modules/chrome';


class Panels extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open           : 0,

            showVisited    : true,
            topSites       : [],

            showClosed     : true,
            recentlyClosed : [],

            showApps       : true,
            apps           : [],

            showShortcuts  : true,
            shortcuts      : [],

            showWebStore   : true,

            showDevices    : true,
            devices        : []
        };
    }

    componentDidMount () {
        Chrome.getSettings((settings) => {
            this.setState({
                open          : settings.openPanel || 0,
                showVisited   : settings.panelVisited,
                showClosed    : settings.panelClosed,
                showApps      : settings.panelApps,
                showShortcuts : settings.panelShortcuts,
                showWebStore  : settings.showWebStore,
                showDevices   : settings.panelDevices
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

            if (settings.panelDevices) {
                Chrome.getDevices((items) => {
                    this.setState({
                        devices: items
                    });
                });
            }
        });
    }

    onClickToggle (id) {
        return () => {
            let newId = this.state.open === id ? 0 : id;

            this.setState({
                open: newId
            });

            Chrome.setSetting('openPanel', newId);
        };
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
        let state = this.state;

        return (
            <div className='panels'>
                <p className='panels__toggles'>
                    { state.showVisited &&
                        <a className={state.open === 1 ? 'panels__toggles--active' : ''}
                            onClick={this.onClickToggle(1)}>Most visited</a>
                    }

                    { state.showClosed &&
                        <a className={state.open === 2 ? 'panels__toggles--active' : ''}
                            onClick={this.onClickToggle(2)}>Recently closed</a>
                    }

                    { state.showApps &&
                        <a className={state.open === 3 ? 'panels__toggles--active' : ''}
                            onClick={this.onClickToggle(3)}>Apps</a>
                    }

                    { state.showShortcuts &&
                        <a className={state.open === 4 ? 'panels__toggles--active' : ''}
                            onClick={this.onClickToggle(4)}>Shortcuts</a>
                    }

                    { state.showDevices &&
                        <a className={state.open === 5 ? 'panels__toggles--active' : ''}
                            onClick={this.onClickToggle(5)}>Other devices</a>
                    }
                </p>

                <div className='panels__panel'>
                    { state.showVisited && state.open === 1 &&
                        <ul>
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
                    }

                    { state.showClosed && state.open === 2 &&
                        <ul>
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
                    }

                    { state.showApps && state.open === 3 &&
                        <ul className='panels__app'>
                            { state.apps.map((app, i) => {
                                if (app.id === 'webstore' && !this.state.showWebStore) {
                                    return null;
                                }

                                return (
                                    <li key={i} onClick={this.onClickApp(app.id, app.href)}>
                                        <a className={`item-${i}`}>
                                            <img src={app.img} alt={app.title} />
                                            <div className='panels__app__name'>{app.title}</div>
                                        </a>
                                    </li>
                                );
                            }) }
                        </ul>
                    }

                    { state.showShortcuts && state.open === 4 &&
                        <ul>
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
                    }

                    { state.showDevices && state.open === 5 &&
                        <ul>
                            { (state.devices.length === 0) ?
                                <p className='panels__panel__message'>No tabs from other devices</p> :
                                state.devices.map((device, i) => {
                                    return (
                                        <li key={i} className={`item-${i}`} >
                                            <p>{device.title}</p>
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
                    }
                </div>
            </div>
        );
    }
}

export default Panels;
