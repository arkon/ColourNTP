///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');


interface IProps {
    label: string;
    tooltip?: string;
    options: Array<string>;
}

interface IState {
    value: string;
}

class Dropdown extends React.Component<IProps, IState> {
    constructor (props) {
        super(props);

        this.state = {
            value: this.props.options[0]
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
                <abbr>
                    {this.props.label}
                    <select value={this.state.value} onChange={this.handleChange}>
                        {this.props.options.map((item) => {
                            return <option>{item}</option>;
                        })}
                    </select>
                    { this.props.tooltip &&
                        <span>
                            <strong>{this.props.label}</strong>
                            <p>{this.props.tooltip}</p>
                        </span>
                    }
                </abbr>
            </label>
        );
    }
}

export = Dropdown;
