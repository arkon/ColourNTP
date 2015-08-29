///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');


interface IProps {
    label: string;
    value: number;
}

interface IState {
    value: number;
}

class Range extends React.Component<IProps, IState> {
    constructor (props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        this.setState({
            value: e.target.value
        });
    }

    render () {
        return (
            <label>
                {this.props.label}
                <input type='range' min='0' max='100' step='1' value={this.state.value} onChange={this.handleChange} />
                <span>({this.state.value}%)</span>
            </label>
        );
    }
}

export = Range;
