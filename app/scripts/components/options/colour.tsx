///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');


interface IProps {
    label: string;
    tooltip?: string;
    value: string;
}

interface IState {
    value: string;
}

class Colour extends React.Component<IProps, IState> {
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
                <span>{this.props.label}:</span>
                <input type='color' value={this.state.value} onChange={this.handleChange} />
            </label>
        );
    }
}

export = Colour;
