import React from 'react';

import ChromeStorage from '../../modules/chromestorage';


class Range extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);

        this.Storage = new ChromeStorage();
    }

    handleChange (e) {
        let key   = this.props.optkey,
            value = e.target.value;

        this.Storage.set(key, value);

        this.setState({ value: value });
    }

    render () {
        return (
            <label>
                <span>{this.props.label}:</span>
                <input type='range' min='0' max='100' step='1' value={this.state.value.toString()} onChange={this.handleChange} />
                <span>({this.state.value}%)</span>
            </label>
        );
    }
}

export default Range;
