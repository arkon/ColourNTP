import React from 'react';

import Checkbox from './checkbox';
import Colour from './colour';
import Dropdown from './dropdown';
import Number from './number';
import Radio from './radio';
import Range from './range';
import Textbox from './textbox';

import Chrome from '../../modules/chrome';


class Options extends React.Component {

    constructor (props) {
        super(props);

        this.fonts = ['Default (Open Sans)', 'Anonymous Pro', 'Arial', 'Arvo', 'Droid Sans', 'Droid Serif',
            'Maven Pro', 'Ovo', 'PT Mono', 'PT Sans', 'PT Serif', 'Raleway', 'Roboto', 'Roboto Condensed',
            'Roboto Slab', 'Source Code Pro', 'Source Sans Pro', 'Tahoma', 'Times', 'Ubuntu'];

        this.state = {
            settings : {}
        };
    }

    componentDidMount () {
        Chrome.getSettings((results) => {
            this.setState({
                settings : results
            })
        });
    }

    render () {
        let settings = this.state.settings;

        return (
            <div className='options'>
                <h1 className='options__header'>Colour New Tab</h1>

                <h2 className='options__subheader'>General</h2>
                <Dropdown label='Font'
                    tooltip='Custom fonts fetched from Google Fonts.'
                    options={this.fonts}
                    optkey='font'
                    value={settings.font} />
                <Checkbox label='24-hour format'
                    tooltip='Toggle between 12-hour and 24-hour formats.'
                    optkey='time24hr'
                    value={settings.time24hr || true} />
                <Checkbox label='Animations'
                    tooltip='Enables animations.'
                    optkey='animations'
                    value={settings.animations || true} />

                <h2 className='options__subheader'>Colours</h2>
                <Radio label='Regular'
                    tooltip='Shows the corresponding colour based on the 24-hour clock.'
                    optkey='colourRegular'
                    value={settings.colourRegular || true} />
                <Radio label='Full spectrum hexadecimal'
                    tooltip='A new colour for every second, going from #000000 to #ffffff in one day.'
                    optkey='colourFull'
                    value={settings.colourFull} />
                <Radio label='Full spectrum hue'
                    tooltip='A slow shift across the entire hue spectrum, from #ff0000 to #00ffff and back in one day.'
                    optkey='colourHue'
                    value={settings.colourHue} />
                <Radio label='Solid colour'
                    tooltip='A solid, non-changing colour.'
                    optkey='colourSolid'
                    value={settings.colourSolid} />
                { settings.colourSolid &&
                    <Colour label='Solid colour'
                        optkey='colourSolidHex'
                        value={settings.colourSolidHex} />
                }
                { !settings.colourSolid &&
                    <Checkbox label='Show ticker of past colours'
                        tooltip='Shows last 10 colours in a ticker at the bottom of the page.'
                        optkey='ticker'
                        value={settings.ticker} />
                }

                <h2 className='options__subheader'>Background image</h2>
                <Checkbox label='Custom background image'
                    tooltip='You must use an online image.'
                    optkey='bg'
                    value={settings.bg} />
                { settings.bg &&
                    <div>
                        <Checkbox label='Top wallpapers from /r/wallpapers'
                            tooltip='Fetch the top wallpaper from the wallpapers subreddit everyday.'
                            optkey='bgReddit'
                            value={settings.bgReddit} />
                        <Textbox label='Image URL'
                            optkey='bgUrl'
                            value={settings.bgUrl} />
                        <Range label='Colour overlay opacity'
                            optkey='bgOpacity'
                            value={settings.bgOpacity || 80} />
                    </div>
                }

                <h2 className='options__subheader'>Panels</h2>
                <Checkbox label='Most visited'
                    tooltip='Your most visited pages.'
                    optkey='panelVisited'
                    value={settings.panelVisited || true} />
                { settings.panelVisited &&
                    <Number label='Max number of most visited pages'
                        optkey='maxVisited'
                        value={settings.maxVisited || 20} />
                }
                <Checkbox label='Recently closed'
                    tooltip='Recently closed tabs and windows.'
                    optkey='panelClosed'
                    value={settings.panelClosed || true} />
                { settings.panelClosed &&
                    <Number label='Max number of recently closed pages'
                        optkey='maxClosed'
                        value={settings.maxClosed || 20} />
                }
                <Checkbox label='Apps'
                    tooltip='Your installed Chrome apps.'
                    optkey='panelApps'
                    value={settings.panelApps || true} />
                <Checkbox label='Shortcuts'
                    tooltip='Various Chrome shortcuts.'
                    optkey='panelShortcuts'
                    value={settings.panelShortcuts || true} />

                <div className='options__credits'>
                    <a href='https://github.com/arkon/ColourNTP'>Source code on GitHub</a>
                    <a href='http://whatcolourisit.scn9a.org/'>Original concept by J.E. Murphy</a>
                    <a href='http://echeung.me/'>Chrome extension by Eugene Cheung</a>
                </div>
            </div>
        );
    }
};

export default Options;
