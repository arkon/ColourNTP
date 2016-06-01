import classNames from 'classnames';
import Clipboard from 'clipboard';
import React from 'react';
import { render } from 'react-dom';

import { Chrome } from './modules/chrome';
import { Colours } from './modules/colours';
import { Saved } from './modules/saved';
import { TimeHelper } from './modules/timehelper';
import { Unsplash } from './modules/unsplash';
import { WebFont } from './modules/webfont';

import { Colour } from './components/colour/Colour';
import { DateDisplay } from './components/colour/Date';
import { History } from './components/colour/History';
import { Panels } from './components/colour/Panels';
import { SavedColours } from './components/colour/SavedColours';
import { Sidebar } from './components/colour/Sidebar';
import { Time } from './components/colour/Time';
import { Toast } from './components/colour/Toast';

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
      toastText    : '',

      sidebarOpen  : false
    };

    this.fetchSettings = this.fetchSettings.bind(this);
    this.tick = this.tick.bind(this);
    this.tickColour = this.tickColour.bind(this);
    this.setDate = this.setDate.bind(this);
    this.loadFont = this.loadFont.bind(this);
    this.loadBgImage = this.loadBgImage.bind(this);
    this.displayToast = this.displayToast.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
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
      this.displayToast(`Copied "${e.text}" to clipboard`);
    });

    clipboard.on('error', (e) => {
      this.displayToast('Press Ctrl/⌘+C to copy');
    });
  }

  componentWillUnmount () {
    clearInterval(this.interval);
    this.interval = null;
  }

  fetchSettings () {
    Chrome.getSettings()
      .then((settings) => {
        const coloursClass = classNames('colours', {
          // No animations
          'notransition': !settings.animations,

          // Text/colour protection
          'full': settings.colour !== 'regular' || settings.bg !== 'none'
        });

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
            Unsplash.getImage(settings.bgUnsplashFreq)
              .then((imgUrl) => {
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

  setDate () {
    this.setState({
      date : new Date().toISOString().split('T')[0]
    });
  }

  loadFont (font, isWeb) {
    WebFont.loadFont(font);

    if (!this.elStyleFont) {
      this.elStyleFont = document.createElement('style');
      document.head.appendChild(this.elStyleFont);
    }

    this.elStyleFont.textContent = font ? `* { font-family: '${font}' !important; }` : '';
  }

  loadBgImage (imgUrl, opacity) {
    this.setState({
      bgImage   : imgUrl,
      bgOpacity : imgUrl ? opacity / 100 : 1
    });
  }

  onClickNewTab () {
    chrome.tabs.update(null, { url: 'chrome-search://local-ntp/local-ntp.html' });
  }

  displayToast (text, duration = 2500) {
    this.setState({
      toastVisible : true,
      toastText    : text
    }, () => {
      setTimeout(() => {
        this.setState({
          toastVisible: false
        });
      }, duration);
    });
  }

  toggleSidebar () {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  render () {
    const settings = this.state.settings;

    const coloursClass = classNames(this.state.coloursClass, {
      'colours--shrink': this.state.sidebarOpen
    });

    if (Object.keys(settings).length === 0) {
      return <div className={coloursClass} />;
    }

    // Background styles
    const bgColourStyle = {
      backgroundColor : this.state.bgOpacity < 1 ?
        Colours.rgba(this.state.colour, this.state.bgOpacity) :
        this.state.colour
    };

    return (
      <div id="newtab__content">
        <Sidebar open={this.state.sidebarOpen} onClose={this.toggleSidebar}>
          <div>
            <SavedColours />
          </div>
        </Sidebar>

        <div className={coloursClass} onClick={this.state.sidebarOpen ? this.toggleSidebar : null}>
          { this.state.bgImage &&
            <div className='colours__bg_img'
              style={{ backgroundImage: `url(${this.state.bgImage})`}} />
          }

          { this.state.bgOpacity !== 0 &&
            <div className='colours__bg' style={bgColourStyle} />
          }

          <div className='colours__btns'>
            <a className='colours__btn--download' title='Open sidebar'
              onClick={this.toggleSidebar} />

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
        </div>

        <Toast visible={this.state.toastVisible}>{this.state.toastText}</Toast>
      </div>
    );
  }
}

render(<NewTab />, document.getElementById('newtab'));
