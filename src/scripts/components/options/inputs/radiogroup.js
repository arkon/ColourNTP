import React from 'react';

import OptionsComponent from './optionscomponent';
import Chrome from '../../../modules/chrome';

class RadioGroup extends OptionsComponent {
    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (val) {
        let key = this.props.optkey;

        Chrome.setSetting(key, val);

        this.setState({ value: val });
    }

    render () {
        let group = this.props.group;

        return (
            <div>
                { this.props.children.map((radio, i) => {
                    return React.cloneElement(radio, {
                        key: i,
                        checked: this.state.value === radio.props.value,
                        group: group,
                        onChange: this.handleChange
                    });
                }) }
            </div>
        );
    }
}

export default RadioGroup;
