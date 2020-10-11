import React from 'react';

import Option from './Option';
import Radio from './Radio';

export default class RadioGroup extends Option {
  render() {
    return this.props.children.map((radio, i) => (
      <Radio
        key={i}
        label={radio.props.label}
        tooltip={radio.props.tooltip}
        value={radio.props.value}
        checked={this.state.value === radio.props.value}
        group={this.props.group}
        onChange={this.handleChange}>
        {radio.props.children}
      </Radio>
    ));
  }
}
