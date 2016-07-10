import React, { PropTypes } from 'react';

const Tab = ({ children }) => (
  <div className='tabs__tab__content'>
    {children}
  </div>
);

Tab.propTypes = {
  children: PropTypes.node.isRequired
};

export default Tab;
