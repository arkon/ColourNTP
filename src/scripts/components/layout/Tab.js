import React from 'react';

var Tab = (props) => {
    return (
        <div className='tabs__tab__content'>
            {props.children}
        </div>
    );
};

export default Tab;
