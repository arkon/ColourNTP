import autobind from 'autobind-decorator';
import React from 'react';

import OptionsComponent from './OptionsComponent';
import Chrome from '../../../modules/chrome';

@autobind
class Range extends OptionsComponent {
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
                <p>{this.props.label}:</p>
                <input type='range' min='0' max='100' step='1' value={this.state.value}
                    onChange={this.handleChange} />
                <span>({this.state.value}%)</span>
            </label>
        );
    }
}

export default Range;
