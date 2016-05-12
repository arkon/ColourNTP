import React from 'react';

const Toast = (props) => {
  return props.visible ?
    <div className='toast'>{props.children}</div> :
    null;
};

export default Toast;
