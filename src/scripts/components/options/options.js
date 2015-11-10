import React from 'react';

import Checkbox from './checkbox';
import Colour from './colour';
import Dropdown from './dropdown';
import Number from './number';
import Radio from './radio';
import RadioGroup from './radiogroup';
import Range from './range';
import Textbox from './textbox';

import Fonts from '../../constants/fonts';

import Chrome from '../../modules/chrome';


class Options extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            settings : {}
        };
    }

    componentDidMount () {
        Chrome.getSettings((settings) => {
            this.setState({
                settings : settings
            });
        });
    }

    render () {
        let settings = this.state.settings;

        return (
            <div className='options'>
                <h1 className='options__header'>Colour New Tab</h1>


                <h2 className='options__subheader'>General</h2>

                <Dropdown label='Font'
                    tooltip='Custom fonts from Google Fonts.'
                    options={Fonts}
                    optkey='font'
                    value={settings.font} />

                <Checkbox label='24-hour format'
                    tooltip='Toggle between 12-hour and 24-hour formats.'
                    optkey='time24hr'
                    value={settings.time24hr} />

                <Checkbox label='Animations'
                    tooltip='Enables animations.'
                    optkey='animations'
                    value={settings.animations} />


                <h2 className='options__subheader'>Colours</h2>

                <RadioGroup group='colourtype' optkey='colour' value={settings.colour}>
                    <Radio label='Regular'
                        tooltip='Shows the corresponding colour based on the 24-hour clock.'
                        value='regular' />

                    <Radio label='Full spectrum hexadecimal'
                        tooltip='A new colour for every second, going from #000000 to #FFFFFF in one day.'
                        value='full' />

                    <Radio label='Full spectrum hue'
                        tooltip='A slow shift across the entire hue spectrum, from #FF0000 to #00FFFF and back in one day.'
                        value='hue' />

                    <Radio label='Solid colour'
                        tooltip='A solid, non-changing colour.'
                        value='solid'>
                        <Colour label='Solid colour'
                            optkey='colourSolid'
                            value={settings.colourSolid} />
                    </Radio>
                </RadioGroup>

                <Checkbox label='Show ticker of past colours'
                    tooltip='Shows last 10 colours in a ticker at the bottom of the page.'
                    optkey='ticker'
                    value={settings.ticker} />

                <Checkbox label='Show hexcode'
                    tooltip='Shows the current colour hexcode underneath the time.'
                    optkey='showHex'
                    value={settings.showHex} />


                <h2 className='options__subheader'>Background image</h2>

                <RadioGroup group='bg' optkey='bg' value={settings.bg}>
                    <Radio label='None'
                        tooltip='No background image.'
                        value='none' />

                    <Radio label='Unsplash'
                        tooltip='A random image from unsplash.com.'
                        value='unsplash'>
                        <RadioGroup group='bgUnsplashFreq'
                            optkey='bgUnsplashFreq' value={settings.bgUnsplashFreq}>
                            <Radio label='Per session'
                                tooltip='A new image every time.'
                                value='perSession' />

                            <Radio label='Daily'
                                tooltip='A new image every day.'
                                value='daily' />

                            <Radio label='Weekly'
                                tooltip='A new image every week.'
                                value='weekly' />
                        </RadioGroup>
                    </Radio>

                    <Radio label='Custom'
                        tooltip='A custom image.'
                        value='custom'>
                        <Textbox label='Image URL'
                            optkey='bgCustomUrl'
                            value={settings.bgCustomUrl} />
                    </Radio>
                </RadioGroup>

                <Range label='Colour overlay opacity'
                    optkey='bgOpacity'
                    value={settings.bgOpacity} />


                <h2 className='options__subheader'>Panels</h2>

                <Checkbox label='Most visited'
                    tooltip='Your most visited pages.'
                    optkey='panelVisited'
                    value={settings.panelVisited}>
                    <Number label='Max number of most visited pages'
                        optkey='maxVisited'
                        value={settings.maxVisited} />
                </Checkbox>

                <Checkbox label='Recently closed'
                    tooltip='Recently closed tabs and windows.'
                    optkey='panelClosed'
                    value={settings.panelClosed}>
                    <Number label='Max number of recently closed pages'
                        optkey='maxClosed'
                        value={settings.maxClosed} />
                </Checkbox>

                <Checkbox label='Apps'
                    tooltip='Your installed Chrome apps.'
                    optkey='panelApps'
                    value={settings.panelApps}>
                    <Checkbox label='Chrome Web Store tile'
                        tooltip='Show a tile for the store.'
                        optkey='showWebStore'
                        value={settings.showWebStore} />
                </Checkbox>

                <Checkbox label='Shortcuts'
                    tooltip='Various Chrome shortcuts.'
                    optkey='panelShortcuts'
                    value={settings.panelShortcuts} />

                <Checkbox label='Other devices'
                    tooltip='Tabs from your other devices.'
                    optkey='panelDevices'
                    value={settings.panelDevices} />


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
