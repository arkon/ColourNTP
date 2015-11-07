import React from 'react';

import Chrome from '../../modules/chrome';


class Range extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: this.props.value || 50
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
                <input type='range' min='0' max='100' step='1' value={this.state.value.toString()} onChange={this.handleChange} />
                <span>({this.state.value}%)</span>
            </label>
        );
    }
}

export default Range;
