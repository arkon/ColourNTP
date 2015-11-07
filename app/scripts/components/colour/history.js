import React from 'react';

import FixedStack from '../../modules/fixedstack';


class History extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            history: new FixedStack(10, new Array(10))
        };
    }

    componentWillMount () {
        this.state.history.push(this.props.colour);
    }

    componentWillReceiveProps (nextProps) {
        this.state.history.push(nextProps.colour);
    }

    render () {
        return (
            <div className='history'>
                { this.state.history.getArray().map((item, i) => {
                    let onItemClick = (e) => {
                        prompt('Copy to clipboard: Ctrl/⌘+C, Enter', item);
                    };

                    return (
                        <div key={i} className='history__item'
                            style={{ backgroundColor: item }}
                            data-hex={item}
                            onClick={onItemClick} />
                    );
                }) }
            </div>
        );
    }
}

export default History;
