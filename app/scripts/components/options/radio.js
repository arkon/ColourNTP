import React from 'react';

import ChromeStorage from '../../modules/chromestorage';


class Radio extends React.Component {
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
            value = e.target.checked;

        this.Storage.set(key, value);

        this.setState({ value: value });
    }

    render () {
        return (
            <label>
                <input type='radio' name='rd' checked={this.state.value} onChange={this.handleChange} />
                <abbr>
                    <span>{this.props.label}</span>
                    <div>
                        <strong>{this.props.label}</strong>
                        <p>{this.props.tooltip}</p>
                    </div>
                </abbr>
            </label>
        );
    }
}

export default Radio;
