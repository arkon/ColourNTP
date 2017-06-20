import React from 'react';

const Toast = ({ visible, children }) => {
  return visible ?
    <div className="toast">{children}</div> :
    null;
};

export default Toast;
