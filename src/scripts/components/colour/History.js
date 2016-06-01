import Clipboard from 'clipboard';
import React from 'react';

import { Saved } from '../../modules/saved';

export class History extends React.Component {
  constructor (props) {
    super(props);

    this.max = 10;

    this.state = {
      history: new Array(this.max)
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

    stack.push(item);

    // Only keep newest max amount of items
    stack.splice(0, stack.length - this.max);
  }

  render () {
    return (
      <div className='history'>
        { this.state.history.map((colour, i) => (
          <div key={i} className='history__item copy'
            style={{ backgroundColor: colour }}
            data-hex={colour}
            data-clipboard-text={colour}
            onClick={() => Saved.add(colour)} />
        )) }
      </div>
    );
  }
}
