import React from 'react';

import ChromeStorage from '../../modules/chromestorage';


class Colour extends React.Component {
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
                <input type='color' value={this.state.value} onChange={this.handleChange} />
            </label>
        );
    }
}

export default Colour;
