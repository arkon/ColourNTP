import React from 'react';

import OptionsComponent from './optionscomponent';
import Chrome from '../../modules/chrome';


class Dropdown extends OptionsComponent {
    constructor (props) {
        super(props);

        this.state = {
            open: false,
            selected: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    handleChange (index, item) {
        let key   = this.props.optkey,
            value = item;

        Chrome.setSetting(key, value);

        this.setState({
            open: false,
            selected: index,
            value: item
        });
    }

    toggleDropdown () {
        this.setState({
            open: !this.state.open
        });
    }

    render () {
        var dropdownClass = 'options__dropdown__list';
        if (this.state.open) {
            dropdownClass += ' options__dropdown__list--open';
        }

        return (
            <label>
                <span>{this.props.label}:</span>

                <span className='options__dropdown'>
                    <span className='options__dropdown__label' onClick={this.toggleDropdown}>
                        {this.props.options[this.state.selected]}
                    </span>

                    <ul className={dropdownClass}>
                        { this.props.options.map((item, i) => {
                            return (
                                <li key={i} onClick={this.handleChange.bind(this, i, item)}>
                                    {item}
                                </li>
                            );
                        }) }
                    </ul>
                </span>
            </label>
        );
    }
}

export default Dropdown;
