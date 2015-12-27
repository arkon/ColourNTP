import React from 'react';

class Tab extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className='options__tabs__content'>
                {this.props.children}
            </div>
        );
    }
}

export default Tab;
