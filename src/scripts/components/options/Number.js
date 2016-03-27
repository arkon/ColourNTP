import { bind } from 'decko';
import React from 'react';

import Option from './Option';
import Chrome from '../../modules/chrome';

class Checkbox extends Option {
  @bind
  handleChange (e) {
    let key = this.props.optkey,
      value = e.target.value;

    Chrome.setSetting(key, value);

    this.setState({ value: value });
  }

  render () {
    return (
      <label>
        <span>{this.props.label}:</span>
        <input type='number' min='1' max='20' value={this.state.value.toString()}
          onChange={this.handleChange} />
      </label>
    );
  }
}

export default Checkbox;


