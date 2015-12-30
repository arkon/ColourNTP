import React from 'react';

import Tab from './tab';

class Tabs extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            activeTab: this.props.activeTab || 0
        };
    }

    handleTab (tab) {
        // Close tab if open
        if (this.props.canToggle) {
            tab = this.state.activeTab === tab ? -1 : tab
        }

        this.setState({
            activeTab: tab
        });

        if (this.props.onToggle) {
            this.props.onToggle(tab);
        }
    }

    render () {
        return (
            <div>
                <ul className='tabs'>
                    { this.props.children.map((tab, i) => {
                        let tabClass = 'tabs__tab';
                        if (this.state.activeTab === i) {
                            tabClass += ' tabs__tab--active';
                        }

                        return (
                            <li key={i}
                                className={tabClass}
                                onClick={this.handleTab.bind(this, i)}>
                                {tab.props.name}
                            </li>
                        );
                    }) }
                </ul>

                {this.props.children[this.state.activeTab]}
            </div>
        );
    }
}

export default Tabs;
