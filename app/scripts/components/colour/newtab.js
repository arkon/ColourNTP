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
                },
                colour: this.tickColour(nowDate)
            });
        } else {
            this.state = {
                settings : {},
                time : {
                    pm     : hour >= 12,
                    hour   : this.pad(hour),
                    minute : this.pad(nowDate.getMinutes()),
                    second : this.pad(nowDate.getSeconds())
                },
                colour: this.tickColour(nowDate)
            };
        }
    }

    tickColour (time) {
        if (this.state && this.state.settings) {
            let settings = this.state.settings;

            switch (settings.colour) {
                case 'solid':
                    return settings.colourSolid;

                case 'full':
                    return '';

                case 'hue':
                    return '';
            }
        }

        return `#${this.pad(time.getHours())}${this.pad(time.getMinutes())}${this.pad(time.getSeconds())}`;
    }

    render () {
        let settings = this.state.settings;

        let classlist = 'colours';

        if (settings) {
            // No animations
            if (settings.animations === false) {
                classlist += ' notransition';
            }

            // Text/colour protection
            if (settings.colour !== 'regular') {
                classlist += ' full';
            }
        }

        // Background styles
        let divStyle = {
            backgroundColor: this.state.colour
        };

        return (
            <div className={classlist}>
                <div className='colours__bg' style={divStyle}></div>

                <div className='colours__opts'>
                    <a target='_blank' className='colours__opts__opt colours__opts__opt--options' href='options.html'>Options</a>

                    { settings && settings.bg &&
                        <a target='_blank' className='colours__opts__opt colours__opts__opt--download'>Open image</a>
                    }
                </div>

                <div className='info'>
                    <Time hourFormat24={settings.time24hr} time={this.state.time} />
                    <Hex colour={this.state.colour} />
                    <Panels />
                </div>

                { settings.ticker && <History /> }
            </div>
        );
    }
}

export default NewTab;
