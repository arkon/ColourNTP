import React from 'react';

import Chrome from '../../modules/chrome';
import Colours from '../../modules/colours';

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
        let now     = new Date(),
            hour    = now.getHours(),
            minute  = now.getMinutes(),
            second  = now.getSeconds();

        let time = {
            pm     : hour >= 12,
            hour   : this.pad(hour),
            minute : this.pad(minute),
            second : this.pad(second)
        };

        if (update) {
            this.setState({
                time   : time,
                colour : this.tickColour(time)
            });
        } else {
            this.state = {
                settings : {},
                time     : time,
                colour   : this.tickColour(time)
            };
        }
    }

    tickColour (time) {
        if (this.state && this.state.settings) {
            let settings = this.state.settings;

            let seconds =
                (parseInt(time.hour, 10) * 60 * 60) +
                (parseInt(time.minute, 10) * 60) +
                (parseInt(time.second, 10));

            switch (settings.colour) {
                case 'solid':
                    return settings.colourSolid;

                case 'full':
                    return Colours.secondToHexColour(seconds);

                case 'hue':
                    return Colours.secondToHueColour(seconds);
            }
        }

        return `#${time.hour}${time.minute}${time.second}`;
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
        let bgColorStyle = {
            backgroundColor: this.state.colour
        };

        return (
            <div className={classlist}>
                <div className='colours__bg' style={bgColorStyle}></div>

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
