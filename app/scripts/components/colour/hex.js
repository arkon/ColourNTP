import React from 'react';


class Hex extends React.Component {
    constructor (props) {
        super(props);

        this.tick();
    }

    componentDidMount () {
        this.interval = setInterval(function (me) {

            me.tick(true);

        }, 1000, this);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    pad (n) {
        return (n < 10) ? `0${n}` : n.toString();
    }

    tick (update) {
        let nowDate = new Date();
        let colour = `#${this.pad(nowDate.getHours())}${this.pad(nowDate.getMinutes())}${this.pad(nowDate.getSeconds())}`;

        if (update) {
            this.setState({
                hex : colour
            });
        } else {
            this.state = {
                hex : colour
            };
        }
    }

    render () {
        return (
            <h2 className='colours__hex'>{this.state.hex}</h2>
        );
    }
}

export default Hex;
