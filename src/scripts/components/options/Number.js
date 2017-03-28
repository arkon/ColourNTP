import Inferno from 'inferno';
import Component from 'inferno-component';

import Option from './Option';
import Chrome from '../../modules/chrome';

export default class Number extends Option {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    const key = this.props.optkey,
      value = e.target.value;

    Chrome.setSetting(key, value);

    this.setState({ value: value });
  }

  render () {
    return (
      <label>
        <span>{this.props.label}:</span>
        <input type='number' min='1' max='20' value={this.state.value.toString()}
          onChange={this.handleChange} />
      </label>
    );
  }
}
