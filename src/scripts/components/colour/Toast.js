import React from 'react';

export const Toast = (props) => {
  return props.visible ?
    <div className='toast'>{props.children}</div> :
    null;
};
