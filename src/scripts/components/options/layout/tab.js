import React from 'react';

class Tab extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <h2 className='options__subheader'>{this.props.name}</h2>

                {this.props.children}
            </div>
        );
    }
}

export default Tab;
