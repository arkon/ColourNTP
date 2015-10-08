import React from 'react';


class Time extends React.Component {
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
        let nowDate = new Date(),
            hour    = nowDate.getHours(),
            isPM    = hour >= 12;

        if (!this.props.hourFormat24 && isPM) {
            hour -= 12;
        }

        if (update) {
            this.setState({
                pm     : isPM,
                hour   : this.pad(hour),
                minute : this.pad(nowDate.getMinutes()),
                second : this.pad(nowDate.getSeconds())
            });
        } else {
            this.state = {
                pm     : isPM,
                hour   : this.pad(hour),
                minute : this.pad(nowDate.getMinutes()),
                second : this.pad(nowDate.getSeconds())
            };
        }
    }

    render () {
        return (
            <h1 className='colours__time'>
                {this.state.hour} : {this.state.minute} : {this.state.second}
                {!this.props.hourFormat24 && <span className='colours__time__postfix'>{this.state.pm ? 'PM' : 'AM'}</span>}
            </h1>
        );
    }
}

export default Time;
