import Inferno from 'inferno';
import Component from 'inferno-component';

import Option from './Option';
import Chrome from '../../modules/chrome';

export default class Dropdown extends Option {
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
        <select value={this.state.value} onChange={this.handleChange}>
          { this.props.options.map((item, i) => {
            return <option key={i} value={item}>{item}</option>;
          }) }
        </select>
      </label>
    );
  }
}
