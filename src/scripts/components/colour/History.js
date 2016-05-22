import { bind } from 'decko';
import Clipboard from 'clipboard';
import React from 'react';

import SavedColours from '../../modules/saved';

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

  @bind
  pushToStack (item) {
    var stack = this.state.history;

    stack.push(item);

    // Only keep newest max amount of items
    stack.splice(0, stack.length - this.max);
  }

  render () {
    return (
      <div className='history'>
        { this.state.history.map((item, i) => (
          <div key={i} className='history__item copy'
            style={{ backgroundColor: item }}
            data-hex={item}
            data-clipboard-text={item}
            onClick={() => SavedColours.addColour(colour)} />
        )) }
      </div>
    );
  }
}

export default History;
