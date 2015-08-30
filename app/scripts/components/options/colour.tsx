///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');

import ChromeStorage = require('../../modules/chromestorage');


interface IProps {
    label: string;
    value: string;
    optkey: string;
}

interface IState {
    value: string;
}

class Colour extends React.Component<IProps, IState> {
    private Storage;

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

export = Colour;
