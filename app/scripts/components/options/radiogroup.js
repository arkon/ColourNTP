import React from 'react';

import Chrome from '../../modules/chrome';


class RadioGroup extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            value: nextProps.value
        });
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
