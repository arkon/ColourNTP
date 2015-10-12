import React from 'react';

import Chrome from '../../modules/chrome';

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
        this.interval = setInterval(() => {
            this.tick(true);
        }, 1000);

        Chrome.getSettings((settings) => {
            this.setState({
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
            <div className={classlist}>
                <div className='colours__bg' style={divStyle}></div>

                <div className='colours__opts'>
                    <a className='colours__opts__opt colours__opts__opt--options' href='options.html' target='_blank'>Options</a>
                    <a className='colours__opts__opt colours__opts__opt--download' target='_blank'>Open image</a>
                </div>

                <div className='info'>
                    <Time hourFormat24={settings.time24hr} time={this.state.time}  />
                    <Hex colour={colour} />
                    <Panels />
                </div>
                { settings.ticker && <History /> }
            </div>
        );
    }
}

export default NewTab;
