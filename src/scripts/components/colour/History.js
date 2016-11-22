import Clipboard from 'clipboard';
import React, { Component, PropTypes } from 'react';

import Colours from '../../modules/colours';
import Saved from '../../modules/saved';

export default class History extends Component {
  static propTypes = {
    colour: PropTypes.string.isRequired,
    max: PropTypes.number
  };

  static defaultProps = {
    max: 10
  };

  state = {
    history: new Array(this.props.max)
  };

  constructor (props) {
    super(props);

    this.pushToStack = this.pushToStack.bind(this);
  }

  componentWillMount () {
    this.pushToStack(this.props.colour);
  }

  componentWillReceiveProps (nextProps) {
    this.pushToStack(nextProps.colour);
  }

  pushToStack (item) {
    if (item !== this.state.history[this.state.history.length - 1]) {
      let stack = this.state.history;

      stack.push(item);

      // Only keep newest max amount of items
      stack.splice(0, stack.length - this.props.max);
    }
  }

  render () {
    return (
      <div className="history">
        { this.state.history.map((colour, i) => {
          const formattedColour = Colours.format(colour, this.props.format);

          return (
            <div key={i} className="history__item copy"
              style={{ backgroundColor: colour }}
              data-colour={formattedColour}
              data-clipboard-text={formattedColour}
              onClick={() => Saved.add(colour)} />
          );
        }) }
      </div>
    );
  }
}
