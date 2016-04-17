import { bind } from 'decko';
import Clipboard from 'clipboard';
import React from 'react';
import { render } from 'react-dom';

import Chrome from './modules/chrome';
import Colours from './modules/colours';
import TimeHelper from './modules/timehelper';
import Unsplash from './modules/unsplash';
import WebFont from './modules/webfont';

import Time from './components/colour/Time';
import DateDisplay from './components/colour/Date';
import Colour from './components/colour/Colour';
import Panels from './components/colour/Panels';
import History from './components/colour/History';
import Toast from './components/colour/Toast';

class NewTab extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      settings     : {},
      time         : {},
      date         : '',
      colour       : '',

      coloursClass : 'colours colours--hidden',
      bgImage      : null,
      bgOpacity    : 1,

      toastVisible : false,
      toastText    : ''
    };
  }

  componentDidMount () {
    this.fetchSettings();

    // Fetch new settings when changed
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.msg === 'saved') {
        this.fetchSettings();
      }
    });

    // Clipboard.js
    const clipboard = new Clipboard('.copy');

    clipboard.on('success', (e) => {
      this.setState({
        toastVisible : true,
        toastText    : 'Copied to clipboard!'
      });
    });

    clipboard.on('error', (e) => {
      this.setState({
        toastVisible : true,
        toastText    : 'Press Ctrl/⌘+C to copy.'
      });
    });
  }

  componentWillUnmount () {
    clearInterval(this.interval);
    this.interval = null;
  }

  @bind
  fetchSettings () {
    Chrome.getSettings((settings) => {
      var coloursClass = 'colours';

      // No animations
      if (!settings.animations) {
        coloursClass += ' notransition';
      }

      // Text/colour protection
      if (settings.colour !== 'regular' || settings.bg !== 'none') {
        coloursClass += ' full';
      }

      // Solid colour
      if (settings.colour === 'solid') {
        this.setState({
          colour : settings.colourSolid
        });
      }

      // No background image (or offline)
      if (settings.bg === 'none' || !navigator.onLine) {
        this.loadBgImage(null);
      }

      // Default font (or offline)
      if (settings.font === 'default' || !navigator.onLine) {
        this.loadFont(null);
      }

      // Online: set background image/web font
      if (navigator.onLine) {
        if (settings.bg === 'unsplash') {
          Unsplash.getImage(settings.bgUnsplashFreq, (imgUrl) => {
            this.loadBgImage(imgUrl, settings.bgOpacity);
          });
        }

        if (settings.bg === 'custom' && settings.bgCustomUrl !== '') {
          this.loadBgImage(settings.bgCustomUrl, settings.bgOpacity);
        }

        if (settings.font === 'web') {
          this.loadFont(settings.fontWeb, true);
        }
      }

      // Date
      if (settings.showDate) {
        this.setDate();
      }

      // Check if the clock was already started
      if (this.interval) {
        this.setState({
          coloursClass : coloursClass,
          settings     : settings
        });
      } else {
        // Start the clock when we hit the next second
        setTimeout(() => {
          this.tick();
          this.interval = setInterval(this.tick, 1000);

          this.setState({
            coloursClass : coloursClass,
            settings     : settings
          });
        }, 1000 - (Date.now() % 1000));
      }
    });
  }

  @bind
  tick () {
    const now = new Date(),
      hour    = now.getHours(),
      minute  = now.getMinutes(),
      second  = now.getSeconds();

    const time = {
      pm     : hour >= 12,
      hour   : TimeHelper.pad(hour),
      minute : TimeHelper.pad(minute),
      second : TimeHelper.pad(second)
    };

    this.setState({
      time : time
    });

    if (hour == 0 && minute == 0 && second == 0) {
      this.setDate();
    }

    if (this.state.bgOpacity !== 0) {
      if (this.state.settings.colour === 'random') {
        this.setState({
          colour : Colours.random()
        });
      } else if (this.state.settings.colour !== 'solid') {
        this.tickColour(time);
      }
    }
  }

  @bind
  tickColour (time) {
    var colour = `#${time.hour}${time.minute}${time.second}`;

    const seconds =
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

  @bind
  setDate () {
    this.setState({
      date : new Date().toISOString().split('T')[0]
    });
  }

  @bind
  loadFont (font, isWeb) {
    WebFont.loadFont(font);

    if (!this.elStyleFont) {
      this.elStyleFont = document.createElement('style');
      document.head.appendChild(this.elStyleFont);
    }

    this.elStyleFont.textContent = font ? `* { font-family: '${font}' !important; }` : '';
  }

  @bind
  loadBgImage (imgUrl, opacity) {
    this.setState({
      bgImage   : imgUrl,
      bgOpacity : imgUrl ? opacity / 100 : 1
    });
  }

  onClickNewTab () {
    chrome.tabs.update(null, { url: 'chrome-search://local-ntp/local-ntp.html' });
  }

  render () {
    const settings = this.state.settings;

    if (Object.keys(settings).length === 0) {
      return <div className={this.state.coloursClass} />;
    }

    // Background styles
    const bgColourStyle = {
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
          <div className='colours__bg' style={bgColourStyle} />
        }

        <div className='colours__btns'>
          { settings.shortcutOpts &&
            <a target='_blank' className='colours__btn--options'
              href='options.html' title='Options' />
          }

          { settings.shortcutNewTab &&
            <a className='colours__btn--newtab' title='Default new tab'
              onClick={this.onClickNewTab} />
          }

          { settings.shortcutImage && this.state.bgImage &&
            <a target='_blank' className='colours__btn--download'
              href={this.state.bgImage} title='Open image' />
          }
        </div>

        <div className='info'>
          { settings.showTime &&
            <Time
              time={this.state.time}
              hourFormat24={settings.time24hr}
              showSeconds={settings.showTimeSec} />
          }

          { settings.showDate &&
            <DateDisplay date={this.state.date} />
          }

          { settings.showColour && this.state.bgOpacity !== 0 &&
            <Colour colour={this.state.colour} format={settings.colourFormat} />
          }

          <Panels />
        </div>

        { settings.ticker && settings.colour !== 'solid' &&
          <History colour={this.state.colour} />
        }

        <Toast visible={this.state.toastVisible}>{this.state.toastText}</Toast>
      </div>
    );
  }
}

render(<NewTab />, document.getElementById('newtab'));
