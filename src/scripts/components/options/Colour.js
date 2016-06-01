import React from 'react';

import { Option } from './Option';
import { Chrome } from '../../modules/chrome';

export class Colour extends Option {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    const key = this.props.optkey,
      value = e.target.value;

    Chrome.setSetting(key, value);

    this.setState({ value: value });
  }

  render () {
    return (
      <label>
        <span>{this.props.label}:</span>
        <input type='color' value={this.state.value} onChange={this.handleChange} />
      </label>
    );
  }
}
