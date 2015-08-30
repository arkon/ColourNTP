///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');

import ChromeStorage = require('../../modules/chromestorage');


interface IProps {
    label: string;
    tooltip: string;
    options: Array<string>;
    value: string;
}

interface IState {
    value: string;
}

class Dropdown extends React.Component<IProps, IState> {
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
                <abbr>
                    <span>{this.props.label}:</span>
                    <select value={this.state.value} onChange={this.handleChange}>
                        {this.props.options.map((item, index) => {
                            return <option key={index} value={index}>{item}</option>;
                        })}
                    </select>
                    <div>
                        <strong>{this.props.label}</strong>
                        <p>{this.props.tooltip}</p>
                    </div>
                </abbr>
            </label>
        );
    }
}

export = Dropdown;
