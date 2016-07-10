import React from 'react';

export default ({ visible, children }) => {
  return visible ?
    <div className='toast'>{children}</div> :
    null;
};
