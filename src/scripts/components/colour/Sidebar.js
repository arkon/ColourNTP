import classNames from 'classnames';
import React from 'react';

export const Sidebar = (props) => {
  const sidebarClass = classNames('sidebar', {
    'sidebar--open': props.open
  });

  return (
    <div className={sidebarClass}>
      { props.open &&
        <div>
          <button className='sidebar__toggle' onClick={() => props.onClose()}>
            Close
          </button>

          <div className='sidebar__pane'>
            {props.children}
          </div>
        </div>
      }
    </div>
  );
};
