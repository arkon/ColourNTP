import classNames from 'classnames';
import React from 'react';

export default (props) => {
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

          {props.children}
        </div>
      }
    </div>
  );
};
