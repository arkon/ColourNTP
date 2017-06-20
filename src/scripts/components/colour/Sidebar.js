import classNames from 'classnames';
import React, { Component } from 'react';

import svgClose from '../../../assets/img/close.svg';

const Sidebar = ({ open, onClose, children }) => {
  const sidebarClass = classNames('sidebar', {
    'sidebar--open': open
  });

  return (
    <div className={sidebarClass}>
      { open &&
        <div>
          <button className="sidebar__toggle" onClick={onClose} dangerouslySetInnerHTML={{ __html: svgClose }} />

          {children}
        </div>
      }
    </div>
  );
};

export default Sidebar;
