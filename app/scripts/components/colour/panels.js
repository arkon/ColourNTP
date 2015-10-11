import React from 'react';

import Chrome from '../../modules/chrome';


class Panels extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            topSites       : [],
            recentlyClosed : [],
            apps           : [],
            shortcuts      : []
        }
    }

    componentDidMount () {
        Chrome.getTopSites((items) => {
            this.setState({
                topSites: items
            });
        });

        Chrome.getRecentlyClosed((items) => {
            this.setState({
                recentlyClosed: items
            });
        });

        Chrome.getApps((items) => {
            this.setState({
                apps: items
            });
        });

        Chrome.getShortcuts((items) => {
            this.setState({
                shortcuts: items
            });
        });
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
        return (
            <div className='panels'>
                <p id='panel-toggles'>
                    <a id='panel-toggle-visited'>Most visited</a>
                    <a id='panel-toggle-closed'>Recently closed</a>
                    <a id='panel-toggle-apps'>Apps</a>
                    <a id='panel-toggle-shortcuts'>Shortcuts</a>
                </p>

                <div id='panel'>
                    <ul id='visited'>
                        { this.state.topSites && this.state.topSites.map((site, i) => {
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

                    <ul id='closed'>
                        { this.state.recentlyClosed && this.state.recentlyClosed.map((session, i) => {
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
                        }) }
                    </ul>

                    <ul id='apps'>
                        { this.state.apps && this.state.apps.map((app, i) => {
                            return (
                                <li key={i} onClick={this.onClickApp(app.id)}>
                                    <a className={`item-${i}`}>
                                        <img src={app.img} />
                                        <div className='app-name'>{app.title}</div>
                                    </a>
                                </li>
                            );
                        }) }

                        <a id='store-link' href='https://chrome.google.com/webstore'>Chrome Web Store</a>
                    </ul>

                    <ul id='shortcuts'>
                        { this.state.shortcuts.map((shortcut, i) => {
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
                </div>
            </div>
        );
    }
}

export default Panels;
