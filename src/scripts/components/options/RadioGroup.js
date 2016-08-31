import React, { PropTypes } from 'react';

import Option from './Option';
import Radio from './Radio';
import Chrome from '../../modules/chrome';

export default class RadioGroup extends Option {
  static propTypes = {
    value: PropTypes.boolean.isRequired,
    label: PropTypes.string.isRequired,
    optkey: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.oneOf([Radio]) })).isRequired
  };

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
