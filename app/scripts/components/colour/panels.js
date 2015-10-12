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
            shortcuts      : []
        };
    }

    componentDidMount () {
        Chrome.getSettings((settings) => {
            console.log(settings);

            this.setState({
                open          : settings.openPanel || 0,
                showVisited   : settings.panelVisited,
                showClosed    : settings.panelClosed,
                showApps      : settings.panelApps,
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

    onClickApp (id) {
        return function () {
            chrome.management.launchApp(id);
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
                                return (
                                    <li key={i} onClick={this.onClickApp(app.id)}>
                                        <a className={`item-${i}`}>
                                            <img src={app.img} alt={app.title} />
                                            <div className='panels__app__name'>{app.title}</div>
                                        </a>
                                    </li>
                                );
                            }) }

                            <a className='panels__panel__message' href='https://chrome.google.com/webstore'>Chrome Web Store</a>
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
                </div>
            </div>
        );
    }
}

export default Panels;
