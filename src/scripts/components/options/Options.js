import React from 'react';

import Checkbox from './inputs/Checkbox';
import Colour from './inputs/Colour';
import Dropdown from './inputs/Dropdown';
import FontPreview from './inputs/FontPreview';
import Number from './inputs/Number';
import Radio from './inputs/Radio';
import RadioGroup from './inputs/RadioGroup';
import Range from './inputs/Range';
import Textbox from './inputs/Textbox';

import Tabs from '../layout/Tabs';
import Tab from '../layout/Tab';

import Fonts from '../../constants/fonts';

import Chrome from '../../modules/chrome';

class Options extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      settings: {}
    };
  }

  componentDidMount () {
    Chrome.getSettings((settings) => {
      this.setState({
        settings: settings
      });
    });
  }

  render () {
    var settings = this.state.settings;

    return (
      <Tabs activeTab={0}>
        <Tab name='General'>
          <Checkbox label='Animations'
            optkey='animations'
            value={settings.animations} />

          <Checkbox label='Show time'
            optkey='showTime'
            value={settings.showTime}>
            <Checkbox label='24-hour format'
              optkey='time24hr'
              value={settings.time24hr} />

            <Checkbox label='Show seconds'
              optkey='showTimeSec'
              value={settings.showTimeSec} />
          </Checkbox>

          <Checkbox label='Show colour hexcode'
            optkey='showHex'
            value={settings.showHex} />

          <Checkbox label='Show date'
            optkey='showDate'
            value={settings.showDate} />
        </Tab>

        <Tab name='Colour'>
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

            <Radio label='Random'
              value='random' />

            <Radio label='Solid colour'
              value='solid'>
              <Colour label='Solid colour'
                optkey='colourSolid'
                value={settings.colourSolid} />
            </Radio>
          </RadioGroup>

          <hr />

          <Checkbox label='Show ticker of past colours'
            tooltip='Shows last 10 colours in a ticker at the bottom of the page.'
            optkey='ticker'
            value={settings.ticker} />
        </Tab>

        <Tab name='Background'>
          <RadioGroup group='bg' optkey='bg' value={settings.bg}>
            <Radio label='None'
              value='none' />

            <Radio label='Unsplash'
              tooltip='A random image from unsplash.com.'
              value='unsplash'>
              <RadioGroup group='bgUnsplashFreq'
                optkey='bgUnsplashFreq' value={settings.bgUnsplashFreq}>
                <Radio label='Per session'
                  value='perSession' />

                <Radio label='Daily'
                  value='daily' />

                <Radio label='Weekly'
                  value='weekly' />
              </RadioGroup>
            </Radio>

            <Radio label='Custom'
              value='custom'>
              <Textbox label='Image URL'
                optkey='bgCustomUrl'
                value={settings.bgCustomUrl} />
            </Radio>
          </RadioGroup>

          <hr />

          <Range label='Colour overlay opacity'
            optkey='bgOpacity'
            value={settings.bgOpacity} />
        </Tab>

        <Tab name='Font'>
          <RadioGroup group='font' optkey='font' value={settings.font}>
            <Radio label='Default'
              tooltip='Default Open Sans font.'
              value='default' />

            <Radio label='Web font'
              tooltip='Custom font from Google Fonts.'
              value='web'>
              <Dropdown label='Font'
                options={Fonts}
                optkey='fontWeb'
                value={settings.fontWeb} />

              <FontPreview font={settings.fontWeb} />
            </Radio>
          </RadioGroup>
        </Tab>

        <Tab name='Shortcuts'>
          <Checkbox label='Settings'
            tooltip='Shortcut to open Colour New Tab options.'
            optkey='shortcutOpts'
            value={settings.shortcutOpts} />

          <Checkbox label='Default new tab'
            tooltip='Shortcut to open the default Chrome new tab page.'
            optkey='shortcutNewTab'
            value={settings.shortcutNewTab} />

          <Checkbox label='Image download'
            tooltip='Shortcut to open the background image, if present.'
            optkey='shortcutImage'
            value={settings.shortcutImage} />
        </Tab>

        <Tab name='Panels'>
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

          <hr />

          <Checkbox label='Show favicons'
            optkey='showFavicons'
            value={settings.showFavicons} />
        </Tab>
      </Tabs>
    );
  }
};

export default Options;
