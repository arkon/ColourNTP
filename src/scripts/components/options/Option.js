import React, { Component } from 'react';

import Chrome from '../../modules/chrome';

export default class Option extends Component {
  state = {
    value: this.props.value
  };

  constructor (props) {
    super(props);
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
