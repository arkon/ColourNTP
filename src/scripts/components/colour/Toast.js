import React, { PropTypes } from 'react';

const Toast = ({ visible, children }) => {
  return visible ?
    <div className="toast">{children}</div> :
    null;
};

Toast.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default Toast;
