import React from 'react';

import Option from './Option';
import Chrome from '../../modules/chrome';

class Checkbox extends Option {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    const key = this.props.optkey,
      value = e.target.checked;

    Chrome.setSetting(key, value);

    this.setState({ value: value });
  }

  render () {
    return (
      <div>
        <label>
          <input type='checkbox' checked={this.state.value}
            onChange={this.handleChange} />

          { this.props.tooltip ?
            <abbr>
              <span>{this.props.label}</span>
              <div>
                <strong>{this.props.label}</strong>
                <p>{this.props.tooltip}</p>
              </div>
            </abbr> :
            <span>{this.props.label}</span>
          }
        </label>

        { this.state.value &&
          <div className='options__content'>{this.props.children}</div>
        }
      </div>
    );
  }
}

export default Checkbox;
