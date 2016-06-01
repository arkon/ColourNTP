import React from 'react';

import { Option } from './Option';
import { Chrome } from '../../modules/chrome';

export class RadioGroup extends Option {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (val) {
    const key = this.props.optkey;

    Chrome.setSetting(key, val);

    this.setState({ value: val });
  }

  render () {
    return (
      <div>
        { this.props.children.map((radio, i) => {
          return React.cloneElement(radio, {
            key: i,
            checked: this.state.value === radio.props.value,
            group: this.props.group,
            onChange: this.handleChange
          });
        }) }
      </div>
    );
  }
}
