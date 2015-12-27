import React from 'react';

import Tab from './tab';

class Tabs extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            currentTab: 0
        };

        this.handleTab = this.handleTab.bind(this);
    }

    handleTab (tab) {
        this.setState({
            currentTab: tab
        });
    }

    render () {
        return (
            <div>
                <ul className='options__tabs'>
                    { this.props.children.map((tab, i) => {
                        return (
                            <li key={i}
                                className={this.state.currentTab === i ? 'options__tab--active' : 'options__tab'}
                                onClick={this.handleTab.bind(this, i)}>
                                {tab.props.name}
                            </li>
                        );
                    }) }
                </ul>

                <div className='options__tabs__content'>
                    {this.props.children[this.state.currentTab]}
                </div>
            </div>
        );
    }
}

export default Tabs;
