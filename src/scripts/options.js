import Inferno, { render } from 'inferno';
import Component from 'inferno-component';

import Checkbox from './components/options/Checkbox';
import Colour from './components/options/Colour';
import DeleteList from './components/options/DeleteList';
import Dropdown from './components/options/Dropdown';
import FontPreview from './components/options/FontPreview';
import Number from './components/options/Number';
import Radio from './components/options/Radio';
import RadioGroup from './components/options/RadioGroup';
import Range from './components/options/Range';
import Textbox from './components/options/Textbox';

import Tabs from './components/layout/Tabs';
import Tab from './components/layout/Tab';

import { FONTS } from './constants/fonts';
import {
  ColourFormats,
  ColourTypes,
  BackgroundImage,
  UnsplashFrequency,
  FontType
} from './constants/settings';

import Chrome from './modules/chrome';
import Colours from './modules/colours';

class Options extends Component {
  constructor (props) {
    super(props);

    this.state = {
      activeTab : 0,
      settings  : {}
    };

    this.messageListener = this.messageListener.bind(this);
    this.fetchSettings = this.fetchSettings.bind(this);
    this.onToggleTab = this.onToggleTab.bind(this);
    this.onDeleteBlacklistItem = this.onDeleteBlacklistItem.bind(this);
    this.onClearBlacklist = this.onClearBlacklist.bind(this);
  }

  componentDidMount () {
    this.fetchSettings();

    chrome.runtime.onMessage.addListener(this.messageListener);
  }

  componentWillUnmount () {
    chrome.runtime.onMessage.removeListener(this.messageListener);
  }

  messageListener (request, sender, sendResponse) {
    if (request.msg === 'saved') {
      this.fetchSettings();
    }
  }

  fetchSettings () {
    Chrome.getSettings()
      .then((settings) => {
        this.setState({
          settings: settings
        })
      });
  }

  onToggleTab (tab) {
    this.setState({
      activeTab: tab
    });
  }

  onDeleteBlacklistItem(url) {
    delete this.state.settings.blacklist[url];
    Chrome.setSetting('blacklist', this.state.settings.blacklist).then(() => this.fetchSettings());
  }

  onClearBlacklist() {
    Chrome.setSetting('blacklist', {}).then(this.fetchSettings);
  }

  render () {
    const settings = this.state.settings;

    const colourUpper = Colours.localize(true, settings.american);
    const colourLower = Colours.localize(false, settings.american);

    return (
      <div>
        <header className='options__header'>
          <h1>{colourUpper} New Tab</h1>
          <p className='options__header__subtitle'><em>Your options are automatically saved</em></p>
        </header>

        <Tabs activeTab={this.state.activeTab} onToggle={this.onToggleTab}>
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

              <Checkbox label='Pad hour'
                tooltip='1:00:00 padded to 01:00:00.'
                optkey='padHour'
                value={settings.padHour} />

              <Checkbox label='Show AM/PM (12-hour format)'
                optkey='showTimePost'
                value={settings.showTimePost} />

              <Checkbox label='Show seconds'
                optkey='showTimeSec'
                value={settings.showTimeSec} />

              <Checkbox label='Flash the time separators'
                optkey='flashSeparators'
                value={settings.flashSeparators} />
            </Checkbox>

            <Checkbox label={`Show ${colourLower} value`}
              optkey='showColour'
              value={settings.showColour}>
              <RadioGroup group='colourFormat'
                optkey='colourFormat' value={settings.colourFormat}>
                <Radio label='HEX'
                  tooltip='Hexadecimal: #123456'
                  value={ColourFormats.HEX} />

                <Radio label='RGB'
                  tooltip='Red/green/blue: rgb(18, 52, 86)'
                  value={ColourFormats.RGB} />

                <Radio label='HSL'
                  tooltip='Hue/saturation/lightness: hsl(210, 65%, 20%)'
                  value={ColourFormats.HSL} />

                <Radio label='HSV'
                  tooltip='Hue/saturation/value: hsv(210, 79%, 33%)'
                  value={ColourFormats.HSV} />

                <Radio label='CMYK'
                  tooltip='Cyan/magenta/yellow/key: cmyk(79, 40, 0, 66)'
                  value={ColourFormats.CMYK} />
              </RadioGroup>
            </Checkbox>

            <Checkbox label='Show date'
              optkey='showDate'
              value={settings.showDate} />
          </Tab>

          <Tab name={colourUpper}>
            <RadioGroup group='colourtype' optkey='colour' value={settings.colour}>
              <Radio label='Regular'
                tooltip={`Shows the corresponding ${colourLower} based on the 24-hour clock.`}
                value={ColourTypes.REGULAR} />

              <Radio label='Full spectrum hexadecimal'
                tooltip={`A new ${colourLower} for every second, going from #000000 to #FFFFFF in one day.`}
                value={ColourTypes.FULL} />

              <Radio label='Full spectrum hue'
                tooltip='A slow shift across the entire hue spectrum, from #FF0000 to #00FFFF and back in one day.'
                value={ColourTypes.HUE} />

              <Radio label='Random'
                value={ColourTypes.RANDOM} />

              <Radio label='Solid'
                value={ColourTypes.SOLID}>
                <Colour label={`Solid ${colourLower}`}
                  optkey='colourSolid'
                  value={settings.colourSolid} />
              </Radio>
            </RadioGroup>

            <hr />

            <Checkbox label={`Show ticker of past ${colourLower}s`}
              tooltip='Shows last 10 colours in a ticker at the bottom of the page.'
              optkey='ticker'
              value={settings.ticker} />

            <Checkbox label={`Automatically adjust text ${colourLower}`}
              tooltip='Black text on light backgrounds and vice versa.'
              optkey='adjustColour'
              value={settings.adjustColour} />

            <Checkbox label='American spelling'
              tooltip='Incorrectly spell everything as "color".'
              optkey='american'
              value={settings.american} />
          </Tab>

          <Tab name='Background'>
            <RadioGroup group='bg' optkey='bg' value={settings.bg}>
              <Radio label='None'
                value={BackgroundImage.NONE} />

              <Radio label='Unsplash'
                tooltip='A random image from unsplash.com.'
                value={BackgroundImage.UNSPLASH}>
                <RadioGroup group='bgUnsplashFreq'
                  optkey='bgUnsplashFreq' value={settings.bgUnsplashFreq}>
                  <Radio label='Per session'
                    value={UnsplashFrequency.SESSION} />

                  <Radio label='Daily'
                    value={UnsplashFrequency.DAILY} />

                  <Radio label='Weekly'
                    value={UnsplashFrequency.WEEKLY} />
                </RadioGroup>
              </Radio>

              <Radio label='Custom'
                value={BackgroundImage.CUSTOM}>
                <Textbox label='Image URL'
                  optkey='bgCustomUrl'
                  value={settings.bgCustomUrl} />
              </Radio>
            </RadioGroup>

            <hr />

            <Range label={`${colourUpper} overlay opacity`}
              optkey='bgOpacity'
              value={settings.bgOpacity} />
          </Tab>

          <Tab name='Font'>
            <RadioGroup group='font' optkey='font' value={settings.font}>
              <Radio label='Default'
                tooltip='Default Open Sans font.'
                value={FontType.DEFAULT} />

              <Radio label='Web font'
                tooltip='Custom font from Google Fonts.'
                value={FontType.WEB}>
                <Dropdown label='Font'
                  options={FONTS}
                  optkey='fontWeb'
                  value={settings.fontWeb} />

                <FontPreview font={settings.fontWeb} />
              </Radio>
            </RadioGroup>
          </Tab>

          <Tab name='Shortcuts'>
            <Checkbox label='Settings'
              tooltip={`Shortcut to open ${colourUpper} New Tab options.`}
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

            <hr />

            <div className='options__list'>
              <p>Manage hidden most visited sites:</p>

              <DeleteList
                data={settings.blacklist}
                onDelete={this.onDeleteBlacklistItem}
                onDeleteAll={this.onClearBlacklist} />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
};

render(<Options />, document.getElementById('options'));
