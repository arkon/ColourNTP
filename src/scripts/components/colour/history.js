import autobind from 'autobind-decorator';
import React from 'react';

@autobind
class History extends React.Component {
    constructor (props) {
        super(props);

        this.max = 10;

        this.state = {
            history: new Array(this.max)
        };
    }

    componentWillMount () {
        this.pushToStack(this.props.colour);
    }

    componentWillReceiveProps (nextProps) {
        this.pushToStack(nextProps.colour);
    }

    pushToStack (item) {
        var stack = this.state.history;

        stack.push(item)

        // Only keep newest max amount of items
        stack.splice(0, stack.length - this.max);
    }

    render () {
        return (
            <div className='history'>
                { this.state.history.map((item, i) => {
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
