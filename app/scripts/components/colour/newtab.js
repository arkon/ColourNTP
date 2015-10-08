import React from 'react';

import ChromeStorage from '../../modules/chromestorage';

import Time from './time';
import Hex from './hex';
import Panels from './panels';
import History from './history';


class NewTab extends React.Component {
    constructor (props) {
        super(props);

        this.tick();
    }

    componentDidMount () {
        var me = this;

        this.interval = setInterval(function () {
            me.tick(true);
        }, 1000);

        new ChromeStorage().getSettings(function (settings) {
            me.setState({
                settings : settings
            });
        });
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    pad (n) {
        return (n < 10) ? `0${n}` : n.toString();
    }

    tick (update) {
        let nowDate = new Date(),
            hour    = nowDate.getHours();

        if (update) {
            this.setState({
                time : {
                    pm     : hour >= 12,
                    hour   : this.pad(hour),
                    minute : this.pad(nowDate.getMinutes()),
                    second : this.pad(nowDate.getSeconds())
                }
            });
        } else {
            this.state = {
                time : {
                    pm     : hour >= 12,
                    hour   : this.pad(hour),
                    minute : this.pad(nowDate.getMinutes()),
                    second : this.pad(nowDate.getSeconds())
                },
                settings : {}
            };
        }
    }

    render () {
        let settings = this.state.settings;

        let colour = `#${this.state.time.hour}${this.state.time.minute}${this.state.time.second}`;

        let classlist = 'colours';

        if (settings && settings.animations === false) {
            classlist += ' notransition';
        }

        let divStyle = {
            backgroundColor: colour
        };

        return (
            <div className={classlist} style={divStyle}>
                <a className='opt' id='options' href='options.html' target='_blank'><span>Options</span></a>
                <a className='opt' id='download' target='_blank'><span>Open image</span></a>
                <div className='info'>
                    <Time hourFormat24={settings.time24hr} time={this.state.time}  />
                    <Hex colour={colour} />
                    <Panels />
                </div>
                <History />
            </div>
        );
    }
}

export default NewTab;
