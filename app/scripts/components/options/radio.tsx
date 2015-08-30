///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');

import ChromeStorage = require('../../modules/chromestorage');


interface IProps {
    label: string;
    tooltip: string;
    value: boolean;
}

interface IState {
    value: boolean;
}

class Radio extends React.Component<IProps, IState> {
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

export = Radio;
