import React from 'react';

import Option from './Option';
import Browser from '../../modules/browser';

export default class Dropdown extends Option {
  render() {
    return (
      <label>
        <span>{this.props.label}:</span>
        <select value={this.state.value} onChange={this.handleChangeEvent}>
          { this.props.options.map((item, i) => {
            return <option key={i} value={item}>{item}</option>;
          }) }
        </select>
      </label>
    );
  }
}
