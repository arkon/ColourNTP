import { bind } from 'decko';
import React from 'react';

class Toast extends React.Component {
  static defaultProps = {
    duration: 2500
  };

  constructor (props) {
    super(props);

    this.state = {
      visible: props.visible
    };

    if (props.visible) {
      this.timeout();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({
        visible: nextProps.visible
      });

      if (nextProps.visible) {
        this.timeout();
      }
    }
  }

  @bind
  timeout () {
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, this.props.duration);
  }

  render () {
    return this.state.visible ?
      <div className='toast'>{this.props.children}</div> :
      null;
  }
}

export default Toast;
