import { bind } from 'decko';
import React from 'react';

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
  }

  @bind
  onClose () {
    this.props.onClose();
  }

  render () {
    var sidebarClass = 'sidebar';

    if (this.props.open) {
      sidebarClass += ' sidebar--open';
    }

    return (
      <div className={sidebarClass}>
        <div className='sidebar__toggle' onClick={this.onClose}>x</div>
        <div className='sidebar__pane'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Sidebar;
