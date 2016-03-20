import autobind from 'autobind-decorator';
import React from 'react';

import OptionsComponent from './OptionsComponent';
import Chrome from '../../../modules/chrome';

@autobind
class Dropdown extends OptionsComponent {
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
