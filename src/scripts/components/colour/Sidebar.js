import classNames from 'classnames';
import React, { PropTypes } from 'react';
import SVGInline from 'react-svg-inline';

import svgClose from '../../../assets/img/close.svg';

const Sidebar = ({ open, onClose, children }) => {
  const sidebarClass = classNames('sidebar', {
    'sidebar--open': open
  });

  return (
    <div className={sidebarClass}>
      { open &&
        <div>
          <button className="sidebar__toggle" onClick={() => onClose()}>
            <SVGInline svg={svgClose} />
          </button>

          {children}
        </div>
      }
    </div>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Sidebar;
