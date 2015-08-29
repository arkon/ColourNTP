///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');


interface IProps {
    label: string;
    value: string;
}

interface IState {
    value: string;
}

class Textbox extends React.Component<IProps, IState> {
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
                <input type='text' value={this.state.value} onChange={this.handleChange} />
            </label>
        );
    }
}

export = Textbox;
