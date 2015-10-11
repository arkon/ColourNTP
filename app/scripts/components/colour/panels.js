import React from 'react';

import Chrome from '../../modules/chrome';


class Panels extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open           : 0,
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

    onClickToggle (id) {
        return () => {
            this.setState({
                open: this.state.open === id ? 0 : id
            });
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
        return (
            <div className='panels'>
                <p className='panels__toggles'>
                    <a onClick={this.onClickToggle(1)}>Most visited</a>
                    <a onClick={this.onClickToggle(2)}>Recently closed</a>
                    <a onClick={this.onClickToggle(3)}>Apps</a>
                    <a onClick={this.onClickToggle(4)}>Shortcuts</a>
                </p>

                <div className='panels__panel'>
                    { this.state.open === 1 &&
                        <ul>
                            { this.state.topSites.map((site, i) => {
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

                    { this.state.open === 2 &&
                        <ul>
                            { this.state.recentlyClosed.map((session, i) => {
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
                    }


                    { this.state.open === 3 &&
                        <ul>
                            { this.state.apps.map((app, i) => {
                                return (
                                    <li key={i} onClick={this.onClickApp(app.id)}>
                                        <a className={`panels__app item-${i}`}>
                                            <img src={app.img} alt={app.title} />
                                            <div className='app-name'>{app.title}</div>
                                        </a>
                                    </li>
                                );
                            }) }

                            <a id='store-link' href='https://chrome.google.com/webstore'>Chrome Web Store</a>
                        </ul>
                    }

                    { this.state.open === 4 &&
                        <ul>
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
                    }
                </div>
            </div>
        );
    }
}

export default Panels;
