import autobind from 'autobind-decorator';
import React from 'react';

import OptionsComponent from './optionscomponent';
import Chrome from '../../../modules/chrome';

@autobind
class Textbox extends OptionsComponent {
    constructor (props) {
        super(props);
    }

    handleChange (e) {
        let key   = this.props.optkey,
            value = e.target.value;

        Chrome.setSetting(key, value);

        this.setState({ value: value });
    }

    render () {
        return (
            <label>
                <span>{this.props.label}:</span>
                <input type='text' value={this.state.value} onChange={this.handleChange} />
            </label>
        );
    }
}

export default Textbox;
