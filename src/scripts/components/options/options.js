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
            <div>
                <h2 className='options__subheader'>General</h2>

                <Checkbox label='24-hour format'
                    tooltip='Toggle between 12-hour and 24-hour formats.'
                    optkey='time24hr'
                    value={settings.time24hr} />

                <Checkbox label='Animations'
                    tooltip='Enables animations.'
                    optkey='animations'
                    value={settings.animations} />

                <Checkbox label='Show the time'
                    tooltip='Shows the current time.'
                    optkey='showTime'
                    value={settings.showTime} />

                <Checkbox label='Show colour hexcode'
                    tooltip='Shows the current colour hexcode underneath the time.'
                    optkey='showHex'
                    value={settings.showHex} />

                <Checkbox label='Show settings and download buttons'
                    tooltip='Shows small buttons for settings and the background image link at the top right.'
                    optkey='showOpts'
                    value={settings.showOpts} />


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


                <h2 className='options__subheader'>Font</h2>

                <RadioGroup group='font' optkey='font' value={settings.font}>
                    <Radio label='Default'
                        tooltip='Default Open Sans font.'
                        value='default' />

                    <Radio label='Web font'
                        tooltip='Custom font from Google Fonts.'
                        value='web'>
                        <Dropdown label='Font'
                            tooltip='Custom font from Google Fonts.'
                            options={Fonts}
                            optkey='fontWeb'
                            value={settings.fontWeb} />
                    </Radio>
                </RadioGroup>


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

                <Checkbox label='Other devices'
                    tooltip='Show tabs from your other devices.'
                    optkey='panelDevices'
                    value={settings.panelDevices} />

                <Checkbox label='Apps'
                    tooltip='Your installed Chrome apps.'
                    optkey='panelApps'
                    value={settings.panelApps}>
                    <Checkbox label='Show "All apps" tile'
                        tooltip="Show a tile for Chrome's default apps page."
                        optkey='showAllApps'
                        value={settings.showAllApps} />

                    <Checkbox label='Show "Web store" tile'
                        tooltip='Show a tile for the Chrome Web Store.'
                        optkey='showWebStore'
                        value={settings.showWebStore} />
                </Checkbox>

                <Checkbox label='Shortcuts'
                    tooltip='Various Chrome shortcuts.'
                    optkey='panelShortcuts'
                    value={settings.panelShortcuts} />
            </div>
        );
    }
};

export default Options;
