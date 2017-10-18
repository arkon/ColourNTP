import classNames from 'classnames';
import Clipboard from 'clipboard';
import React, { Component } from 'react';
import { render } from 'react-dom';

import Chrome from './modules/chrome';
import Colours from './modules/colours';
import Saved from './modules/saved';
import TimeHelper from './modules/timehelper';
import Unsplash from './modules/unsplash';
import WebFont from './modules/webfont';

import { ColourTypes, BackgroundImage, FontType } from './constants/settings';

import Colour from './components/colour/Colour';
import DateDisplay from './components/colour/Date';
import History from './components/colour/History';
import Panels from './components/colour/Panels';
import SavedColours from './components/colour/SavedColours';
import Sidebar from './components/colour/Sidebar';
import Time from './components/colour/Time';
import Toast from './components/colour/Toast';

import svgBookmark from '../assets/img/bookmark.svg';
import svgGear from '../assets/img/gear.svg';
import svgImage from '../assets/img/image.svg';
import svgNewTab from '../assets/img/newtab.svg';

class NewTab extends Component {
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

    this.messageListener = this.messageListener.bind(this);
    this.fetchSettings = this.fetchSettings.bind(this);
    this.tick = this.tick.bind(this);
    this.tickColour = this.tickColour.bind(this);
    this.startClock = this.startClock.bind(this);
    this.setDate = this.setDate.bind(this);
    this.loadFont = this.loadFont.bind(this);
    this.loadBgImage = this.loadBgImage.bind(this);
    this.displayToast = this.displayToast.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount () {
    this.fetchSettings();

    // Fetch new settings when changed
    chrome.runtime.onMessage.addListener(this.messageListener);

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
    chrome.runtime.onMessage.removeListener(this.messageListener);

    clearInterval(this.interval);
    this.interval = null;
  }

  messageListener (request, sender, sendResponse) {
    if (request.msg === 'saved') {
      this.fetchSettings();
    }
  }

  fetchSettings () {
    Chrome.getSettings()
      .then((settings) => {
        const coloursClass = classNames('colours', {
          // No animations
          'notransition': !settings.animations,

          // Text/colour protection
          'full': settings.colour !== ColourTypes.REGULAR || settings.bg !== BackgroundImage.NONE
        });

        // Solid colour
        if (settings.colour === ColourTypes.SOLID) {
          this.setState({
            colour: settings.colourSolid
          });
        }

        // No background image (or offline)
        if (settings.bg === BackgroundImage.NONE || !navigator.onLine) {
          this.loadBgImage(null);
        }

        // Default font (or offline)
        if (settings.font === FontType.DEFAULT || !navigator.onLine) {
          this.loadFont(null);
        }

        // Online: set background image/web font
        if (navigator.onLine) {
          if (settings.bg === BackgroundImage.UNSPLASH) {
            Unsplash.getImage(settings.bgUnsplashFreq)
              .then((imgUrl) => {
                this.loadBgImage(imgUrl, settings.bgOpacity);
              });
          }

          if (settings.bg === BackgroundImage.CUSTOM && settings.bgCustomUrl !== '') {
            this.loadBgImage(settings.bgCustomUrl, settings.bgOpacity);
          }

          if (settings.font === FontType.WEB) {
            this.loadFont(settings.fontWeb);
          }
        }

        // Date
        if (settings.showDate) {
          this.setDate();
        }

        this.setState({
          coloursClass : coloursClass,
          settings     : settings
        }, this.startClock);
      });
  }

  startClock() {
    if (!this.interval) {
      this.tick();

      // Start clock when we we hit the next second
      setTimeout(() => {
        this.tick();
        this.interval = setInterval(this.tick, 1000);
      }, 1000 - (Date.now() % 1000));
    }
  }

  tick () {
    const now = new Date(),
      hour    = now.getHours(),
      minute  = now.getMinutes(),
      second  = now.getSeconds();

    const time = {
      hour   : hour,
      minute : minute,
      second : second
    };

    this.setState({
      time: time
    });

    if (hour == 0 && minute == 0 && second == 0) {
      this.setDate();
    }

    if (this.state.bgOpacity !== 0) {
      if (this.state.settings.colour === ColourTypes.RANDOM) {
        this.setState({
          colour: Colours.random()
        });
      } else if (this.state.settings.colour !== ColourTypes.SOLID) {
        this.tickColour(time);
      }
    }
  }

  tickColour (time) {
    let colour = `#${TimeHelper.pad(time.hour)}${TimeHelper.pad(time.minute)}${TimeHelper.pad(time.second)}`;

    const seconds =
      (time.hour * 60 * 60) +
      (time.minute * 60) +
      (time.second);

    switch (this.state.settings.colour) {
      case ColourTypes.FULL:
        colour = Colours.secondToHexColour(seconds);
        break;

      case ColourTypes.HUE:
        colour = Colours.secondToHueColour(seconds);
        break;
    }

    this.setState({
      colour: colour
    });
  }

  setDate () {
    this.setState({
      date: new Date().toISOString().split('T')[0]
    });
  }

  loadFont (font) {
    if (font) {
      WebFont.loadFont(font);
    }

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

  toggleSidebar (e) {
    e.stopPropagation();

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
      backgroundColor: this.state.bgOpacity < 1 ?
        Colours.rgba(this.state.colour, this.state.bgOpacity) :
        this.state.colour
    };

    // Text styles
    let textClass = null;
    if (settings.adjustColour && Colours.isDark(...Colours.hexToRgb(this.state.colour))) {
      textClass = 'is-dark';
    };

    return (
      <div id="newtab__content" className={textClass}>
        <Sidebar open={this.state.sidebarOpen} onClose={this.toggleSidebar}>
          <SavedColours format={settings.colourFormat} />
        </Sidebar>

        <div className={coloursClass} onClick={this.state.sidebarOpen ? this.toggleSidebar : null}>
          { this.state.bgImage &&
            <div className="colours__bg_img"
              style={{ backgroundImage: `url(${this.state.bgImage})`}} />
          }

          { this.state.bgOpacity !== 0 &&
            <div className="colours__bg" style={bgColourStyle} />
          }

          <div className="colours__btns">
            <button className="colours__btn" title="Open sidebar"
              onClick={this.toggleSidebar} dangerouslySetInnerHTML={{ __html: svgBookmark}} />

            { settings.shortcutOpts &&
              <a className="colours__btn colours__btn--options"
                href="options.html" title="Options" dangerouslySetInnerHTML={{ __html: svgGear}}
                target="_blank" />
            }

            { settings.shortcutNewTab &&
              <button className="colours__btn" title="Default new tab"
                onClick={this.onClickNewTab} dangerouslySetInnerHTML={{ __html: svgNewTab}} />
            }

            { settings.shortcutImage && this.state.bgImage &&
              <a className="colours__btn"
                href={this.state.bgImage} title="Open image" dangerouslySetInnerHTML={{ __html: svgImage}}
                target="_blank" rel="noopener" />
            }
          </div>

          <div className="info">
            { settings.showTime &&
              <Time
                time={this.state.time}
                hourFormat24={settings.time24hr}
                padHour={settings.padHour}
                showSeconds={settings.showTimeSec}
                showPostFix={settings.showTimePost}
                flashSeparators={settings.flashSeparators} />
            }

            { settings.showDate &&
              <DateDisplay date={this.state.date} />
            }

            { settings.showColour && this.state.bgOpacity !== 0 &&
              <Colour colour={this.state.colour} format={settings.colourFormat}/>
            }

            <Panels />
          </div>

          { settings.ticker && settings.colour !== ColourTypes.SOLID &&
            <History colour={this.state.colour} format={settings.colourFormat} />
          }
        </div>

        <Toast visible={this.state.toastVisible}>{this.state.toastText}</Toast>
      </div>
    );
  }
}

render(<NewTab />, document.getElementById('newtab'));
