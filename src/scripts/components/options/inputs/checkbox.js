import React from 'react';

import OptionsComponent from './optionscomponent';
import Chrome from '../../../modules/chrome';

class Checkbox extends OptionsComponent {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        let key   = this.props.optkey,
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

                    <abbr>
                        <span>{this.props.label}</span>
                        <div>
                            <strong>{this.props.label}</strong>
                            <p>{this.props.tooltip}</p>
                        </div>
                    </abbr>
                </label>

                { this.state.value &&
                    <div className='options__content'>{this.props.children}</div>
                }
            </div>
        );
    }
}

export default Checkbox;
