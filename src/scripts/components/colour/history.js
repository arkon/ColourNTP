import React from 'react';


class History extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            history: []
        };

        this.pushToStack = this.pushToStack.bind(this);
    }

    componentWillMount () {
        this.pushToStack(this.props.colour);
    }

    componentWillReceiveProps (nextProps) {
        this.pushToStack(nextProps.colour);
    }

    pushToStack (item) {
        let stack = this.state.history;

        stack.push(item)

        // Only keep 10 newest items
        stack.splice(0, stack.length - 10);
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
