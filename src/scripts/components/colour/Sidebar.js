import classNames from 'classnames';
import { bind } from 'decko';
import React from 'react';

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const sidebarClass = classNames('sidebar', {
      'sidebar--open': this.props.open
    });

    return (
      <div className={sidebarClass}>
        { this.props.open &&
          <div>
            <button className='sidebar__toggle' onClick={() => this.props.onClose()}>
              Close
            </button>

            <div className='sidebar__pane'>
              {this.props.children}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Sidebar;
