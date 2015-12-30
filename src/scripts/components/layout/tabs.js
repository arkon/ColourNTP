import React from 'react';

import Tab from './tab';

class Tabs extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            currentTab: 0
        };
    }

    handleTab (tab) {
        this.setState({
            currentTab: tab
        });
    }

    render () {
        return (
            <div>
                <ul className='tabs'>
                    { this.props.children.map((tab, i) => {
                        return (
                            <li key={i}
                                className={this.state.currentTab === i ? 'tabs__tab--active' : 'tabs__tab'}
                                onClick={this.handleTab.bind(this, i)}>
                                {tab.props.name}
                            </li>
                        );
                    }) }
                </ul>

                {this.props.children[this.state.currentTab]}
            </div>
        );
    }
}

export default Tabs;
