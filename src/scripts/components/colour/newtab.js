import React from 'react';

import Chrome from '../../modules/chrome';
import Colours from '../../modules/colours';
import Unsplash from '../../modules/unsplash';

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
            bgOpacity    : 1
        };

        this.fetchSettings = this.fetchSettings.bind(this);
        this.tick = this.tick.bind(this);
        this.tickColour = this.tickColour.bind(this);
        this.loadBgImage = this.loadBgImage.bind(this);
    }

    componentDidMount () {
        this.fetchSettings();

        // Fetch new settings when changed
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.msg === 'saved') {
                this.fetchSettings();
            }
        });
    }

    componentWillUnmount () {
        clearInterval(this.interval);
        this.interval = null;
    }

    fetchSettings () {
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

            if (!navigator.onLine || settings.bg === 'none') {
                this.loadBgImage(null);
            }

            if (navigator.onLine) {
                // Background images/opacity
                if (settings.bg === 'unsplash') {
                    Unsplash.getImage(settings.bgUnsplashFreq, this.loadBgImage);
                }

                if (settings.bg === 'custom' && settings.bgCustomUrl !== '') {
                    this.loadBgImage(settings.bgCustomUrl);
                }

                // Custom web font
                if (settings.font.indexOf('Default') < 0) {
                    this.loadWebFont(settings.font);
                }
            }

            if (settings.colour === 'solid') {
                this.setState({
                    colour : settings.colourSolid
                });
            }

            // Start the clock
            this.tick();
            this.interval = setInterval(this.tick, 1000);
        });
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
            time : time
        });

        if (this.state.settings.colour !== 'solid' && this.state.bgOpacity !== 0) {
            this.tickColour(time);
        }
    }

    tickColour (time) {
        let colour = `#${time.hour}${time.minute}${time.second}`;

        let seconds =
            (parseInt(time.hour, 10) * 60 * 60) +
            (parseInt(time.minute, 10) * 60) +
            (parseInt(time.second, 10));

        switch (this.state.settings.colour) {
            case 'full':
                colour = Colours.secondToHexColour(seconds);
                break;

            case 'hue':
                colour = Colours.secondToHueColour(seconds);
                break;
        }

        this.setState({
            colour : colour
        });
    }

    pad (n) {
        return (n < 10) ? `0${n}` : n.toString();
    }

    loadWebFont (font) {
        let elLinkFont  = document.createElement('link');
        elLinkFont.type = 'text/css';
        elLinkFont.rel  = 'stylesheet';
        elLinkFont.href = `https://fonts.googleapis.com/css?family=${font}:400,300`;

        let style = document.createElement('style');
        style.textContent = `* { font-family: ${font} !important; }`;

        document.head.appendChild(elLinkFont);
        document.head.appendChild(style);
    }

    loadBgImage (imgUrl) {
        this.setState({
            bgImage   : imgUrl,
            bgOpacity : imgUrl ? this.state.settings.bgOpacity / 100 : 1
        });
    }

    render () {
        let settings = this.state.settings;

        // Background styles
        let bgColorStyle = {
            backgroundColor : this.state.bgOpacity < 1 ?
                Colours.rgba(this.state.colour, this.state.bgOpacity) :
                this.state.colour
        };

        return (
            <div className={this.state.coloursClass}>
                { this.state.bgImage &&
                    <div className='colours__bg_img'
                        style={{ backgroundImage: `url(${this.state.bgImage})`}} />
                }

                { this.state.bgOpacity !== 0 &&
                    <div className='colours__bg' style={bgColorStyle} />
                }

                { settings.showOpts &&
                    <div className='colours__opts'>
                        <a target='_blank' className='colours__opts__opt colours__opts__opt--options'
                            href='options.html' title='Options' />

                        { this.state.bgImage &&
                            <a target='_blank' className='colours__opts__opt colours__opts__opt--download'
                                href={this.state.bgImage} title='Open image' />
                        }
                    </div>
                }

                <div className='info'>
                    { settings.showTime &&
                        <Time hourFormat24={settings.time24hr} time={this.state.time} />
                    }

                    { settings.showHex && this.state.bgOpacity !== 0 &&
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
