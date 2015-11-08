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

        this.state = {
            settings     : {},
            time         : {},
            colour       : '',

            coloursClass : 'colours colours--hidden',
            bgImage      : null,
            bgOpacity    : null
        };

        this.tick = this.tick.bind(this);
    }

    componentDidMount () {
        this.tick();
        this.interval = setInterval(this.tick, 1000);

        Chrome.getSettings((settings) => {
            let coloursClass = 'colours';

            // No animations
            if (!settings.animations) {
                coloursClass += ' notransition';
            }

            // Text/colour protection
            if (settings.colour !== 'regular' || settings.bg !== 'none') {
                coloursClass += ' full';
            }

            this.setState({
                coloursClass : coloursClass,
                settings     : settings
            });

            if (navigator.onLine) {
                // Background images/opacity
                if (settings.bg !== 'none') {
                    if (settings.bg === 'unsplash') {
                        let unsplashBgUrl = 'https://source.unsplash.com/';

                        switch (settings.bgUnsplashFreq) {
                            case 'perSession':
                                unsplashBgUrl += 'random';
                                break;

                            case 'daily':
                                unsplashBgUrl += 'daily';
                                break;

                            case 'weekly':
                                unsplashBgUrl += 'weekly';
                                break;
                        }

                        this.loadBgImage(unsplashBgUrl);
                    }

                    if (settings.bg === 'custom' && settings.bgCustomUrl !== '') {
                        this.loadBgImage(settings.bgCustomUrl);
                    }
                }

                // Custom web font
                if (settings.font.indexOf('Default') < 0) {
                    this.loadWebFont(settings.font);
                }
            }
        });
    }

    componentWillUnmount () {
        clearInterval(this.interval);
        this.interval = null;
    }

    pad (n) {
        return (n < 10) ? `0${n}` : n.toString();
    }

    tick () {
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

        this.setState({
            time   : time,
            colour : this.tickColour(time)
        });
    }

    tickColour (time) {
        if (this.state && this.state.settings) {
            let seconds =
                (parseInt(time.hour, 10) * 60 * 60) +
                (parseInt(time.minute, 10) * 60) +
                (parseInt(time.second, 10));

            switch (this.state.settings.colour) {
                // TODO: only handle the solid colour once instead of every second
                case 'solid':
                    return this.state.settings.colourSolid;

                case 'full':
                    return Colours.secondToHexColour(seconds);

                case 'hue':
                    return Colours.secondToHueColour(seconds);
            }
        }

        return `#${time.hour}${time.minute}${time.second}`;
    }

    loadWebFont (font) {
        let elLinkFont  = document.createElement('link');
        elLinkFont.type = 'text/css';
        elLinkFont.rel  = 'stylesheet';
        elLinkFont.href = `https://fonts.googleapis.com/css?family=${font}`;

        let style = document.createElement('style');
        style.textContent = `* { font-family: ${font} !important; }`;

        document.head.appendChild(elLinkFont);
        document.head.appendChild(style);
    }

    loadBgImage (imgUrl) {
        this.setState({
            bgImage   : imgUrl,
            bgOpacity : this.state.settings.bgOpacity / 100
        });
    }

    render () {
        let settings = this.state.settings;

        // Background styles
        let bgStyle = {
            backgroundImage : this.state.bgImage && `url(${this.state.bgImage})`
        };

        let bgColorStyle = {
            backgroundColor : this.state.colour,
            opacity         : this.state.bgOpacity
        };

        return (
            <div className={this.state.coloursClass} style={bgStyle}>
                <div className='colours__bg' style={bgColorStyle}></div>

                <div className='colours__opts'>
                    <a target='_blank' className='colours__opts__opt colours__opts__opt--options'
                        href='options.html'>Options</a>

                    { settings && settings.bg &&
                        <a target='_blank' className='colours__opts__opt colours__opts__opt--download'
                            href={this.state.bgImage}>Open image</a>
                    }
                </div>

                <div className='info'>
                    <Time hourFormat24={settings.time24hr} time={this.state.time} />

                    { settings.showHex &&
                        <Hex colour={this.state.colour} />
                    }

                    <Panels />
                </div>

                { settings.ticker && settings.colour !== 'solid' &&
                    <History colour={this.state.colour} />
                }
            </div>
        );
    }
}

export default NewTab;
