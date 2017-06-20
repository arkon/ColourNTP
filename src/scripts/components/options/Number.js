import React from 'react';
import { Component } from 'react';

import Option from './Option';
import Chrome from '../../modules/chrome';

export default class Number extends Option {
  render() {
    return (
      <label>
        <span>{this.props.label}:</span>
        <input type='number' min='1' max='20' value={this.state.value.toString()}
          onChange={this.handleChangeEvent} />
      </label>
    );
  }
}
