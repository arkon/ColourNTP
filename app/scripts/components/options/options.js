import React from 'react';

import Checkbox from './checkbox';
import Colour from './colour';
import Dropdown from './dropdown';
import Number from './number';
import Radio from './radio';
import Range from './range';
import Textbox from './textbox';


var Options = (props) => {
    var fonts = ['Default (Open Sans)', 'Anonymous Pro', 'Arial', 'Arvo', 'Droid Sans', 'Droid Serif', 'Maven Pro',
         'Ovo', 'PT Mono', 'PT Sans', 'PT Serif', 'Raleway', 'Roboto', 'Roboto Condensed', 'Roboto Slab',
         'Source Code Pro', 'Source Sans Pro', 'Tahoma', 'Times', 'Ubuntu'];

    return (
        <div className='options'>
            <h1 className='options__header'>Colour New Tab</h1>

            <h2 className='options__subheader'>General</h2>
            <Dropdown label='Font'
                tooltip='Custom fonts fetched from Google Fonts.'
                options={fonts}
                optkey='font'
                value={props.settings.font} />
            <Checkbox label='24-hour format'
                tooltip='Toggle between 12-hour and 24-hour formats.'
                optkey='time24hr'
                value={props.settings.time24hr} />
            <Checkbox label='Animations'
                tooltip='Enables animations.'
                optkey='animations'
                value={props.settings.animations} />

            <h2 className='options__subheader'>Colours</h2>
            <Radio label='Regular'
                tooltip='Shows the corresponding colour based on the 24-hour clock.'
                optkey='colourRegular'
                value={props.settings.colourRegular} />
            <Radio label='Full spectrum hexadecimal'
                tooltip='A new colour for every second, going from #000000 to #ffffff in one day.'
                optkey='colourFull'
                value={props.settings.colourFull} />
            <Radio label='Full spectrum hue'
                tooltip='A slow shift across the entire hue spectrum, from #ff0000 to #00ffff and back in one day.'
                optkey='colourHue'
                value={props.settings.colourHue} />
            <Radio label='Solid colour'
                tooltip='A solid, non-changing colour.'
                optkey='colourSolid'
                value={props.settings.colourSolid} />
            { props.settings.colourSolid &&
                <Colour label='Solid colour'
                    optkey='colourSolidHex'
                    value={props.settings.colourSolidHex} />
            }
            { !props.settings.colourSolid &&
                <Checkbox label='Show ticker of past colours'
                    tooltip='Shows last 10 colours in a ticker at the bottom of the page.'
                    optkey='ticker'
                    value={props.settings.ticker} />
            }

            <h2 className='options__subheader'>Background image</h2>
            <Checkbox label='Custom background image'
                tooltip='You must use an online image.'
                optkey='bg'
                value={props.settings.bg} />
            { props.settings.bg &&
                <div>
                    <Checkbox label='Top wallpapers from /r/wallpapers'
                        tooltip='Fetch the top wallpaper from the wallpapers subreddit everyday.'
                        optkey='bgReddit'
                        value={props.settings.bgReddit} />
                    <Textbox label='Image URL'
                        optkey='bgUrl'
                        value={props.settings.bgUrl} />
                    <Range label='Colour overlay opacity'
                        optkey='bgOpacity'
                        value={props.settings.bgOpacity} />
                </div>
            }

            <h2 className='options__subheader'>Panels</h2>
            <Checkbox label='Most visited'
                tooltip='Your most visited pages.'
                optkey='panelVisited'
                value={props.settings.panelVisited} />
            { props.settings.panelVisited &&
                <Number label='Max number of most visited pages'
                    optkey='maxVisited'
                    value={props.settings.maxVisited} />
            }
            <Checkbox label='Recently closed'
                tooltip='Recently closed tabs and windows.'
                optkey='panelClosed'
                value={props.settings.panelClosed} />
            { props.settings.panelClosed &&
                <Number label='Max number of recently closed pages'
                    optkey='maxClosed'
                    value={props.settings.maxClosed} />
            }
            <Checkbox label='Apps'
                tooltip='Your installed Chrome apps.'
                optkey='panelApps'
                value={props.settings.panelApps} />
            <Checkbox label='Shortcuts'
                tooltip='Various Chrome shortcuts.'
                optkey='panelShortcuts'
                value={props.settings.panelShortcuts} />

            <div className='options__credits'>
                <a href='https://github.com/arkon/ColourNTP'>Source code on GitHub</a>
                <a href='http://whatcolourisit.scn9a.org/'>Original concept by J.E. Murphy</a>
                <a href='http://echeung.me/'>Chrome extension by Eugene Cheung</a>
            </div>
        </div>
    );
};

export default Options;
