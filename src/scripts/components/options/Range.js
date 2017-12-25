import React from 'react';

import Option from './Option';
import Browser from '../../modules/browser';

export default class Range extends Option {
  render() {
    return (
      <label>
        <p>{this.props.label}:</p>
        <input type="range" min="0" max="100" step="1" value={this.state.value}
          onChange={this.handleChangeEvent} />
        <span>({this.state.value}%)</span>
      </label>
    );
  }
}
