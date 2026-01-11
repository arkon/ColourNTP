import { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';

import { GlobalStyles, theme } from './styles';
import { Tabs, Tab } from './components/layout';
import {
  Checkbox,
  ColourPicker,
  DeleteList,
  Dropdown,
  FontPreview,
  NumberInput,
  Radio,
  RadioGroup,
  Range,
  Textbox,
} from './components/options';
import { getSettings, setSetting } from './modules/browser';
import { localize } from './modules/colours';
import { FONTS } from './constants/fonts';
import {
  ColourFormats,
  ColourTypes,
  BackgroundImage,
  UnsplashFrequency,
  FontType,
} from './constants/settings';
import type { Settings } from './constants/defaults';

const OptionsWrapper = styled.div`
  contain: content;
  margin: 0 auto;
  max-width: 650px;
  padding: 2em;
  width: 100%;

  label {
    cursor: pointer;
    display: block;
    padding: 0.35em 0;

    input[type='checkbox'],
    input[type='radio'] {
      margin-right: 0.5em;
    }
  }

  select,
  input[type='text'],
  input[type='number'] {
    background: ${theme.colors.grey};
    border: 1px solid ${theme.colors.lightGrey};
    color: ${theme.colors.white};
    font: inherit;
    padding: 0.25em 0.5em;
  }

  select {
    min-width: 150px;
  }

  input[type='range'] {
    vertical-align: middle;
  }
`;

const Header = styled.header`
  border-bottom: 1px solid ${theme.colors.lightGrey};
  padding-bottom: 1rem;

  h1 {
    font-size: 1.5em;
  }
`;

const Subtitle = styled.p`
  color: ${theme.colors.lightGrey};
  font-size: 0.85em;
  margin-top: 0.5rem;
`;

const ListSection = styled.div`
  margin-top: 0.5em;
`;

function Options() {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState<Settings | null>(null);

  const fetchSettings = useCallback(async () => {
    const newSettings = await getSettings();
    setSettings(newSettings);
  }, []);

  useEffect(() => {
    fetchSettings();

    const messageListener = (request: { msg: string }) => {
      if (request.msg === 'saved') {
        fetchSettings();
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, [fetchSettings]);

  const handleToggleTab = (tab: number | null) => {
    setActiveTab(tab ?? 0);
  };

  const handleDeleteBlacklistItem = async (url: string) => {
    if (!settings) return;
    const newBlacklist = { ...settings.blacklist };
    delete newBlacklist[url];
    await setSetting('blacklist', newBlacklist);
    fetchSettings();
  };

  const handleClearBlacklist = async () => {
    await setSetting('blacklist', {});
    fetchSettings();
  };

  if (!settings) {
    return (
      <>
        <GlobalStyles />
        <OptionsWrapper>Loading...</OptionsWrapper>
      </>
    );
  }

  const colourUpper = localize(true, settings.american);
  const colourLower = localize(false, settings.american);

  return (
    <>
      <GlobalStyles />
      <OptionsWrapper>
        <Header>
          <h1>{colourUpper} New Tab</h1>
          <Subtitle>
            <em>Your options are automatically saved</em>
          </Subtitle>
        </Header>

        <Tabs activeTab={activeTab} onToggle={handleToggleTab}>
          <Tab name="General">
            <Checkbox label="Animations" optkey="animations" value={settings.animations} />

            <Checkbox label="Show time" optkey="showTime" value={settings.showTime}>
              <Checkbox label="24-hour format" optkey="time24hr" value={settings.time24hr} />
              <Checkbox
                label="Pad hour"
                tooltip="1:00:00 padded to 01:00:00."
                optkey="padHour"
                value={settings.padHour}
              />
              <Checkbox
                label="Show AM/PM (12-hour format)"
                optkey="showTimePost"
                value={settings.showTimePost}
              />
              <Checkbox label="Show seconds" optkey="showTimeSec" value={settings.showTimeSec} />
              <Checkbox
                label="Flash the time separators"
                optkey="flashSeparators"
                value={settings.flashSeparators}
              />
            </Checkbox>

            <Checkbox
              label={`Show ${colourLower} value`}
              optkey="showColour"
              value={settings.showColour}
            >
              <RadioGroup group="colourFormat" optkey="colourFormat" value={settings.colourFormat}>
                <Radio label="HEX" tooltip="Hexadecimal: #123456" value={ColourFormats.HEX} />
                <Radio
                  label="RGB"
                  tooltip="Red/green/blue: rgb(18, 52, 86)"
                  value={ColourFormats.RGB}
                />
                <Radio
                  label="HSL"
                  tooltip="Hue/saturation/lightness: hsl(210, 65%, 20%)"
                  value={ColourFormats.HSL}
                />
                <Radio
                  label="HSV"
                  tooltip="Hue/saturation/value: hsv(210, 79%, 33%)"
                  value={ColourFormats.HSV}
                />
                <Radio
                  label="CMYK"
                  tooltip="Cyan/magenta/yellow/key: cmyk(79, 40, 0, 66)"
                  value={ColourFormats.CMYK}
                />
              </RadioGroup>
            </Checkbox>

            <Checkbox label="Show date" optkey="showDate" value={settings.showDate} />
          </Tab>

          <Tab name={colourUpper}>
            <RadioGroup group="colourtype" optkey="colour" value={settings.colour}>
              <Radio
                label="Regular"
                tooltip={`Shows the corresponding ${colourLower} based on the 24-hour clock.`}
                value={ColourTypes.REGULAR}
              />
              <Radio
                label="Full spectrum hexadecimal"
                tooltip={`A new ${colourLower} for every second, going from #000000 to #FFFFFF in one day.`}
                value={ColourTypes.FULL}
              />
              <Radio
                label="Full spectrum hue"
                tooltip="A slow shift across the entire hue spectrum, from #FF0000 to #00FFFF and back in one day."
                value={ColourTypes.HUE}
              />
              <Radio label="Random" value={ColourTypes.RANDOM} />
              <Radio label="Solid" value={ColourTypes.SOLID}>
                <ColourPicker
                  label={`Solid ${colourLower}`}
                  optkey="colourSolid"
                  value={settings.colourSolid}
                />
              </Radio>
            </RadioGroup>

            <hr />

            <Checkbox
              label={`Show ticker of past ${colourLower}s`}
              tooltip="Shows last 10 colours in a ticker at the bottom of the page."
              optkey="ticker"
              value={settings.ticker}
            />

            <Checkbox
              label={`Automatically adjust text ${colourLower}`}
              tooltip="Black text on light backgrounds and vice versa."
              optkey="adjustColour"
              value={settings.adjustColour}
            />

            <Checkbox
              label="American spelling"
              tooltip='Incorrectly spell everything as "color".'
              optkey="american"
              value={settings.american}
            />
          </Tab>

          <Tab name="Background">
            <RadioGroup group="bg" optkey="bg" value={settings.bg}>
              <Radio label="None" value={BackgroundImage.NONE} />
              <Radio
                label="Unsplash"
                tooltip="A random image from unsplash.com."
                value={BackgroundImage.UNSPLASH}
              >
                <RadioGroup
                  group="bgUnsplashFreq"
                  optkey="bgUnsplashFreq"
                  value={settings.bgUnsplashFreq}
                >
                  <Radio label="Per session" value={UnsplashFrequency.SESSION} />
                  <Radio label="Daily" value={UnsplashFrequency.DAILY} />
                  <Radio label="Weekly" value={UnsplashFrequency.WEEKLY} />
                </RadioGroup>
              </Radio>
              <Radio label="Custom" value={BackgroundImage.CUSTOM}>
                <Textbox label="Image URL" optkey="bgCustomUrl" value={settings.bgCustomUrl} />
              </Radio>
            </RadioGroup>

            <hr />

            <Range
              label={`${colourUpper} overlay opacity`}
              optkey="bgOpacity"
              value={settings.bgOpacity}
            />
          </Tab>

          <Tab name="Font">
            <RadioGroup group="font" optkey="font" value={settings.font}>
              <Radio label="Default" tooltip="Default Open Sans font." value={FontType.DEFAULT} />
              <Radio
                label="Web font"
                tooltip="Custom font from Google Fonts."
                value={FontType.WEB}
              >
                <Dropdown label="Font" options={FONTS} optkey="fontWeb" value={settings.fontWeb} />
                <FontPreview font={settings.fontWeb} />
              </Radio>
            </RadioGroup>
          </Tab>

          <Tab name="Shortcuts">
            <Checkbox
              label="Settings"
              tooltip={`Shortcut to open ${colourUpper} New Tab options.`}
              optkey="shortcutOpts"
              value={settings.shortcutOpts}
            />

            <Checkbox
              label="Default new tab"
              tooltip="Shortcut to open the default Chrome new tab page."
              optkey="shortcutNewTab"
              value={settings.shortcutNewTab}
            />

            <Checkbox
              label="Image download"
              tooltip="Shortcut to open the background image, if present."
              optkey="shortcutImage"
              value={settings.shortcutImage}
            />
          </Tab>

          <Tab name="Panels">
            <Checkbox
              label="Most visited"
              tooltip="Your most visited pages."
              optkey="panelVisited"
              value={settings.panelVisited}
            >
              <NumberInput
                label="Max number of most visited pages"
                optkey="maxVisited"
                value={settings.maxVisited}
              />
            </Checkbox>

            <Checkbox
              label="Recently closed"
              tooltip="Recently closed tabs and windows."
              optkey="panelClosed"
              value={settings.panelClosed}
            >
              <NumberInput
                label="Max number of recently closed pages"
                optkey="maxClosed"
                value={settings.maxClosed}
              />
            </Checkbox>

            <Checkbox
              label="Other devices"
              tooltip="Show tabs from your other devices."
              optkey="panelDevices"
              value={settings.panelDevices}
            />

            <Checkbox
              label="Apps"
              tooltip="Your installed Chrome apps."
              optkey="panelApps"
              value={settings.panelApps}
            >
              <Checkbox
                label='Show "All apps" tile'
                tooltip="Show a tile for Chrome's default apps page."
                optkey="showAllApps"
                value={settings.showAllApps}
              />
              <Checkbox
                label='Show "Web store" tile'
                tooltip="Show a tile for the Chrome Web Store."
                optkey="showWebStore"
                value={settings.showWebStore}
              />
            </Checkbox>

            <Checkbox
              label="Shortcuts"
              tooltip="Various Chrome shortcuts."
              optkey="panelShortcuts"
              value={settings.panelShortcuts}
            />

            <hr />

            <Checkbox label="Show favicons" optkey="showFavicons" value={settings.showFavicons} />

            <hr />

            <ListSection>
              <p>Manage hidden most visited sites:</p>
              <DeleteList
                data={settings.blacklist}
                onDelete={handleDeleteBlacklistItem}
                onDeleteAll={handleClearBlacklist}
              />
            </ListSection>
          </Tab>
        </Tabs>
      </OptionsWrapper>
    </>
  );
}

const container = document.getElementById('options');
if (container) {
  createRoot(container).render(<Options />);
}
