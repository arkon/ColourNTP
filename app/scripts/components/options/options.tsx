///<reference path='../vendor/react.d.ts' />

import React = require('react');


interface IProps {
    settings: ISettings;
}

interface IState {
    settings: ISettings;
}

class Options extends React.Component<IProps, IState> {
    private fonts;

    constructor (props) {
        super(props);

        this.state = {
            settings: this.props.settings
        };

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
                    options={this.font} />
                <Checkbox label='24-hour format'
                    value={this.settings.time24hr} />
                <Checkbox label='Animations'
                    value={this.settings.animations} />

                <h2>Colours</h2>
                <Radio label='Regular'
                    tooltip='Shows the corresponding colour based on the 24-hour clock.'
                    value={this.settings.colourRegular} />
                <Radio label='Full spectrum hexadecimal'
                    tooltip='A new colour for every second, going from #000000 to #ffffff in one day.'
                    value={this.settings.colourFull} />
                <Radio label='Full spectrum hue'
                    tooltip='A slow shift across the entire hue spectrum, from #ff0000 to #00ffff and back in one day.'
                    value={this.settings.colourHue} />
                <Radio label='Solid colour'
                    value={this.settings.colourSolid} />
                <Colour label='Solid colour'
                    value={this.settings.colourSolidHex} />
                <Checkbox label='Show ticker of past colours'
                    value={this.settings.ticker} />

                <h2>Background image</h2>
                <Checkbox label='Custom background image'
                    tooltip='You must use an online image.'
                    value={this.settings.bg} />
                <Checkbox label='Top wallpapers from /r/wallpapers'
                    tooltip='Fetch the top wallpaper from the wallpapers subredit everyday.'
                    value={this.settings.bgReddit} />
                <Textbox label='Image URL'
                    value={this.settings.bgUrl} />
                <Range label='Colour overlay opacity'
                    value={this.settings.bgOpacity} />

                <h2>Panels</h2>
                <Checkbox label='Most visited'
                    value={this.settings.panelVisited} />
                <Checkbox label='Recently closed'
                    value={this.settings.panelClosed} />
                <Checkbox label='Apps'
                    value={this.settings.panelApps} />
                <Checkbox label='Shortcuts'
                    value={this.settings.panelShortcuts} />
                <Number label='Max number of most visited pages'
                    value={this.settings.maxVisited} />
                <Number label='Max number of recently closed pages'
                    value={this.settings.maxClosed} />
            </div>
        );
    }
};

export = Options;
