import { bind } from 'decko';
import React from 'react';

import Option from './Option';
import Chrome from '../../modules/chrome';

class RadioGroup extends Option {
  @bind
  handleChange (val) {
    let key = this.props.optkey;

    Chrome.setSetting(key, val);

    this.setState({ value: val });
  }

  render () {
    let group = this.props.group;

    return (
      <div>
        { this.props.children.map((radio, i) => {
          return React.cloneElement(radio, {
            key: i,
            checked: this.state.value === radio.props.value,
            group: group,
            onChange: this.handleChange
          });
        }) }
      </div>
    );
  }
}

export default RadioGroup;
