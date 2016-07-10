import React from 'react';

export default (props) => {
  return props.visible ?
    <div className='toast'>{props.children}</div> :
    null;
};
