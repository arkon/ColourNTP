import React from 'react';

import { Chrome } from '../../modules/chrome';

export class Option extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  render () {
    return null;
  }
}
