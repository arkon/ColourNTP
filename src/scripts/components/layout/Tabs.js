import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import Tab from './Tab';

export default class Tabs extends Component {
  static propTypes = {
    activeTab: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.oneOf([Tab]) })).isRequired
  };

  state = {
    activeTab: this.props.activeTab
  };

  constructor (props) {
    super(props);
  }

  handleTab (tab) {
    // Close tab if open
    if (this.props.canToggle) {
      tab = this.state.activeTab === tab ? null : tab;
    }

    this.setState({
      activeTab: tab
    }, () => {
      if (this.props.onToggle) {
        this.props.onToggle(tab);
      }
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeTab !== this.state.activeTab) {
      this.setState({
        activeTab: nextProps.activeTab
      });
    }
  }

  render () {
    return (
      <div>
        <ul className='tabs'>
          { this.props.children.map((tab, i) => {
            if (tab) {
              let tabClass = classNames('tabs__tab', {
                'tabs__tab--active': this.state.activeTab === i
              });

              return (
                <li key={i}
                  className={tabClass}
                  onClick={this.handleTab.bind(this, i)}>
                  {tab.props.name}
                </li>
              );
            }
          }) }
        </ul>

        {this.props.children[this.state.activeTab]}
      </div>
    );
  }
}
