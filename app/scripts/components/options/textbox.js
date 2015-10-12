import React from 'react';

import Chrome from '../../modules/chrome';


class Textbox extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            value: nextProps.value
        });
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
