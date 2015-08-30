///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');

import Checkbox = require('./checkbox');
import Colour   = require('./colour');
import Dropdown = require('./dropdown');
import Number   = require('./number');
import Radio    = require('./radio');
import Range    = require('./range');
import Textbox  = require('./textbox');


interface IProps {
    settings: ISettings;
}

class Options extends React.Component<IProps, {}> {
    private fonts;

    constructor (props) {
        super(props);

        this.fonts = ['Default (Open Sans)', 'Anonymous Pro', 'Arial', 'Arvo', 'Droid Sans', 'Droid Serif', 'Maven Pro',
             'Ovo', 'PT Mono', 'PT Sans', 'PT Serif', 'Raleway', 'Roboto', 'Roboto Condensed', 'Roboto Slab',
             'Source Code Pro', 'Source Sans Pro', 'Tahoma', 'Times', 'Ubuntu'];
    }

    render () {
        return (
            <div>
                <h1>Colour New Tab</h1>

                <h2>General</h2>
                <Dropdown label='Font'
                    tooltip='Custom fonts fetched from Google Fonts.'
                    options={this.fonts}
                    optkey='font'
                    value={this.props.settings.font} />
                <Checkbox label='24-hour format'
                    tooltip='Toggle between 12-hour and 24-hour formats.'
                    optkey='time24hr'
                    value={this.props.settings.time24hr} />
                <Checkbox label='Animations'
                    tooltip='Enables animations.'
                    optkey='animations'
                    value={this.props.settings.animations} />

                <h2>Colours</h2>
                <Radio label='Regular'
                    tooltip='Shows the corresponding colour based on the 24-hour clock.'
                    optkey='colourRegular'
                    value={this.props.settings.colourRegular} />
                <Radio label='Full spectrum hexadecimal'
                    tooltip='A new colour for every second, going from #000000 to #ffffff in one day.'
                    optkey='colourFull'
                    value={this.props.settings.colourFull} />
                <Radio label='Full spectrum hue'
                    tooltip='A slow shift across the entire hue spectrum, from #ff0000 to #00ffff and back in one day.'
                    optkey='colourHue'
                    value={this.props.settings.colourHue} />
                <Radio label='Solid colour'
                    tooltip='A solid, non-changing colour.'
                    optkey='colourSolid'
                    value={this.props.settings.colourSolid} />
                <Colour label='Solid colour'
                    optkey='colourSolidHex'
                    value={this.props.settings.colourSolidHex} />
                <Checkbox label='Show ticker of past colours'
                    tooltip='Shows last 10 colours in a ticker at the bottom of the page.'
                    optkey='ticker'
                    value={this.props.settings.ticker} />

                <h2>Background image</h2>
                <Checkbox label='Custom background image'
                    tooltip='You must use an online image.'
                    optkey='bg'
                    value={this.props.settings.bg} />
                <Checkbox label='Top wallpapers from /r/wallpapers'
                    tooltip='Fetch the top wallpaper from the wallpapers subredit everyday.'
                    optkey='bgReddit'
                    value={this.props.settings.bgReddit} />
                <Textbox label='Image URL'
                    optkey='bgUrl'
                    value={this.props.settings.bgUrl} />
                <Range label='Colour overlay opacity'
                    optkey='bgOpacity'
                    value={this.props.settings.bgOpacity} />

                <h2>Panels</h2>
                <Checkbox label='Most visited'
                    tooltip='Your most visited pages.'
                    optkey='panelVisited'
                    value={this.props.settings.panelVisited} />
                <Checkbox label='Recently closed'
                    tooltip='Recently closed tabs and windows.'
                    optkey='panelClosed'
                    value={this.props.settings.panelClosed} />
                <Checkbox label='Apps'
                    tooltop='Your installed Chrome apps.'
                    optkey='panelApps'
                    value={this.props.settings.panelApps} />
                <Checkbox label='Shortcuts'
                    tooltip='Various Chrome shortcuts.'
                    optkey='panelShortcuts'
                    value={this.props.settings.panelShortcuts} />
                <Number label='Max number of most visited pages'
                    optkey='maxVisited'
                    value={this.props.settings.maxVisited} />
                <Number label='Max number of recently closed pages'
                    optkey='maxClosed'
                    value={this.props.settings.maxClosed} />
            </div>
        );
    }
};

export = Options;
