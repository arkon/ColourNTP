import React from 'react';

import OptionsComponent from './optionscomponent';
import Chrome from '../../modules/chrome';


class Dropdown extends OptionsComponent {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
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
                <select value={this.state.value} onChange={this.handleChange}>
                    { this.props.options.map((item, i) => {
                        return <option key={i} value={item}>{item}</option>;
                    }) }
                </select>
            </label>
        );
    }
}

export default Dropdown;
