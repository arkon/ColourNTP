import React from 'react';

import Option from './Option';

export default class Colour extends Option {
  render() {
    return (
      <label>
        <span>{this.props.label}:</span>
        <input type="color" value={this.state.value} onChange={this.handleChangeEvent} />
      </label>
    );
  }
}
