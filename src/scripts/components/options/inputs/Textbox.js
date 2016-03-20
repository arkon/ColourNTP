import { bind } from 'decko';
import React from 'react';

import OptionsComponent from './OptionsComponent';
import Chrome from '../../../modules/chrome';

class Textbox extends OptionsComponent {
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
        <input type='text' value={this.state.value} onChange={this.handleChange} />
      </label>
    );
  }
}

export default Textbox;
