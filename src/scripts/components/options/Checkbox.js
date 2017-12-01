import React from 'react';

import Option from './Option';
import Chrome from '../../modules/chrome';

export default class Checkbox extends Option {
  render() {
    return (
      <>
        <label key="label">
          <input type="checkbox" checked={this.state.value}
            onChange={this.handleChangeCheck} />

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
        { this.state.value ?
            <div key="content" className="options__content">{this.props.children}</div> :
            null
        }
      </>
    );
  }
}
