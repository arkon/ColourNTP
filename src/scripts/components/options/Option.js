import React, { Component } from 'react';

import Chrome from '../../modules/chrome';

export default class Option extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }

  handleChange(value) {
    const key = this.props.optkey;

    Chrome.setSetting(key, value);
    this.setState({ value: value });
  }

  handleChangeEvent(e) {
    this.handleChange(e.target.value);
  }

  handleChangeCheck(e) {
    this.handleChange(e.target.checked);
  }

  render() {
    // "Abstract" component
    return null;
  }
}
