import Inferno from 'inferno';
import Component from 'inferno-component';

import Option from './Option';
import Radio from './Radio';
import Chrome from '../../modules/chrome';

export default class RadioGroup extends Option {
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
          return (
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
          );
        }) }
      </div>
    );
  }
}
