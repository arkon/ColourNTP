import classNames from 'classnames';
import React from 'react';

export default ({ open, onClose, children }) => {
  const sidebarClass = classNames('sidebar', {
    'sidebar--open': open
  });

  return (
    <div className={sidebarClass}>
      { open &&
        <div>
          <button className='sidebar__toggle' onClick={() => onClose()}>
            Close
          </button>

          {children}
        </div>
      }
    </div>
  );
};
