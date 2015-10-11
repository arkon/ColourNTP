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
        this.setState({
            topSites       : Chrome.getTopSites(),
            recentlyClosed : Chrome.getRecentlyClosed(),
            apps           : Chrome.getApps(),
            shortcuts      : Chrome.getShortcuts()
        });
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
                        { this.state.topSites && this.state.topSites.map((item, i) => {
                            let shortcutStyle = {
                                backgroundImage: `url('${item.img}')`
                            };

                            return (
                                <li key={item.title}>
                                    <a className={`item-${i}`} style={shortcutStyle} title={item.title}>
                                        <div className='app-name'>{item.title}</div>
                                    </a>
                                </li>
                            );
                        }) }
                    </ul>

                    <ul id='closed'>
                        { this.state.recentlyClosed && this.state.recentlyClosed.map((item, i) => {
                            let shortcutStyle = {
                                backgroundImage: `url('${item.img}')`
                            };

                            return (
                                <li key={item.title}>
                                    <a className={`item-${i}`} style={shortcutStyle} title={item.title}>
                                        <div className='app-name'>{item.title}</div>
                                    </a>
                                </li>
                            );
                        }) }
                    </ul>

                    <ul id='apps'>
                        { this.state.apps && this.state.apps.map((item, i) => {
                            let shortcutStyle = {
                                backgroundImage: `url('${item.img}')`
                            };

                            return (
                                <li key={item.title}>
                                    <a className={`item-${i}`} style={shortcutStyle} title={item.title}>
                                        <div className='app-name'>{item.title}</div>
                                    </a>
                                </li>
                            );
                        }) }
                    </ul>

                    <ul id='shortcuts'>
                        { this.state.shortcuts.map((item, i) => {
                            let shortcutStyle = {
                                backgroundImage: `url('${item.img}')`
                            };

                            return (
                                <li key={item.title}>
                                    <a className={`item-${i}`} style={shortcutStyle} title={item.title}>
                                        <div className='app-name'>{item.title}</div>
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
