import Clipboard from 'clipboard';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';

import bookmarkSvg from '../assets/img/bookmark.svg?raw';
import gearSvg from '../assets/img/gear.svg?raw';
import imageSvg from '../assets/img/image.svg?raw';
import newTabSvg from '../assets/img/newtab.svg?raw';
import { Colour, DateDisplay, History, Panels, SavedColours, Sidebar, Time, Toast } from './components/colour';
import type { Settings } from './constants/defaults';
import { ColourTypes, BackgroundImage, FontType, type ColourType } from './constants/settings';
import { getSettings } from './modules/browser';
import * as Colours from './modules/colours';
import { pad } from './modules/timehelper';
import { getImage } from './modules/unsplash';
import { loadFont } from './modules/webfont';
import { GlobalStyles, theme } from './styles';

const NewTabContent = styled.div<{ $isDark: boolean }>`
  height: 100%;
  width: 100%;
  color: ${({ $isDark }) => ($isDark ? theme.colors.darkGrey : theme.colors.white)};

  .tabs__tab {
    color: ${({ $isDark }) => ($isDark ? theme.colors.darkGrey : theme.colors.white)};
  }
`;

const ColoursWrapper = styled.div<{ $hidden: boolean; $shrink: boolean; $noTransition: boolean }>`
  contain: content;
  display: table;
  height: 100%;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  padding: 1em;
  table-layout: fixed;
  transition: ${({ $noTransition }) => ($noTransition ? 'none' : 'opacity 0.8s, transform 0.3s cubic-bezier(0, 0, 0.3, 1)')};
  width: 100%;

  ${({ $shrink }) =>
      $shrink &&
      `
    opacity: 0.5;
    position: relative;
    transform: scale(0.95);

    &::after {
      bottom: 0;
      content: '';
      display: block;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
  `}
`;

const BgBase = styled.div`
  contain: strict;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${theme.zIndex.default};
`;

const BgColour = styled(BgBase)`
  transition: background-color 0.8s;
  will-change: transform;
`;

const BgImage = styled(BgBase)`
  background-position: center center;
  background-size: cover;
`;

const ButtonsWrapper = styled.div`
  position: absolute;
  right: 1em;
  top: 1em;
  z-index: ${theme.zIndex.above};
`;

const IconButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  height: 1.5em;
  margin-left: 0.5em;
  opacity: 0.5;
  transition: opacity 0.2s;
  width: 1.5em;

  &:hover {
    opacity: 1;
  }

  svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }
`;

const IconLink = styled.a`
  display: inline-block;
  height: 1.5em;
  margin-left: 0.5em;
  opacity: 0.5;
  transition: opacity 0.2s;
  width: 1.5em;

  &:hover {
    opacity: 1;
  }

  svg {
    fill: currentColor;
    height: 100%;
    width: 100%;
  }
`;

const Info = styled.div<{ $textShadow: boolean }>`
  display: table-cell;
  height: 100%;
  position: relative;
  text-align: center;
  vertical-align: middle;
  width: 100%;

  ${({ $textShadow }) =>
      $textShadow &&
      `
    h1, h2, .panels__toggles a {
      text-shadow: 0 1px 0.35rem rgba(17, 17, 17, 0.5);
    }
  `}
`;

interface TimeState {
    hour: number;
    minute: number;
    second: number;
}

function NewTab() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [time, setTime] = useState<TimeState>({ hour: 0, minute: 0, second: 0 });
    const [date, setDate] = useState('');
    const [colour, setColour] = useState('');
    const [bgImage, setBgImage] = useState<string | null>(null);
    const [bgOpacity, setBgOpacity] = useState(1);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastText, setToastText] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const intervalRef = useRef<number | null>(null);
    const fontStyleRef = useRef<HTMLStyleElement | null>(null);

    const displayToast = useCallback((text: string, duration = 2500) => {
        setToastVisible(true);
        setToastText(text);
        setTimeout(() => setToastVisible(false), duration);
    }, []);

    const setCurrentDate = useCallback(() => {
        setDate(new Date().toISOString().split('T')[0]);
    }, []);

    const loadFontStyle = useCallback((font: string | null) => {
        if (font) {
            loadFont(font);
        }

        if (!fontStyleRef.current) {
            fontStyleRef.current = document.createElement('style');
            document.head.appendChild(fontStyleRef.current);
        }

        fontStyleRef.current.textContent = font ? `* { font-family: '${font}' !important; }` : '';
    }, []);

    const loadBgImage = useCallback((imgUrl: string | null, opacity?: number) => {
        setBgImage(imgUrl);
        setBgOpacity(imgUrl && opacity !== undefined ? opacity / 100 : 1);
    }, []);

    const fetchSettings = useCallback(async () => {
        const newSettings = await getSettings();
        setSettings(newSettings);

        if (newSettings.colour === ColourTypes.SOLID) {
            setColour(newSettings.colourSolid);
        }

        if (newSettings.bg === BackgroundImage.NONE || !navigator.onLine) {
            loadBgImage(null);
        }

        if (newSettings.font === FontType.DEFAULT || !navigator.onLine) {
            loadFontStyle(null);
        }

        if (navigator.onLine) {
            if (newSettings.bg === BackgroundImage.UNSPLASH) {
                try {
                    const imgUrl = await getImage(newSettings.bgUnsplashFreq);
                    loadBgImage(imgUrl, newSettings.bgOpacity);
                } catch {
                    // Ignore errors
                }
            }

            if (newSettings.bg === BackgroundImage.CUSTOM && newSettings.bgCustomUrl !== '') {
                loadBgImage(newSettings.bgCustomUrl, newSettings.bgOpacity);
            }

            if (newSettings.font === FontType.WEB) {
                loadFontStyle(newSettings.fontWeb);
            }
        }

        if (newSettings.showDate) {
            setCurrentDate();
        }
    }, [loadBgImage, loadFontStyle, setCurrentDate]);

    const tickColour = useCallback((timeState: TimeState, colourType: ColourType) => {
        const seconds = timeState.hour * 60 * 60 + timeState.minute * 60 + timeState.second;

        let newColour = `#${pad(timeState.hour)}${pad(timeState.minute)}${pad(timeState.second)}`;

        switch (colourType) {
            case ColourTypes.FULL:
                newColour = Colours.secondToHexColour(seconds);
                break;
            case ColourTypes.HUE:
                newColour = Colours.secondToHueColour(seconds);
                break;
        }

        setColour(newColour);
    }, []);

    const tick = useCallback(() => {
        const now = new Date();
        const newTime = {
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds(),
        };

        setTime(newTime);

        if (newTime.hour === 0 && newTime.minute === 0 && newTime.second === 0) {
            setCurrentDate();
        }
    }, [setCurrentDate]);

    useEffect(() => {
        if (!settings || bgOpacity === 0) return;

        if (settings.colour === ColourTypes.RANDOM) {
            setColour(Colours.random());
        } else if (settings.colour !== ColourTypes.SOLID) {
            tickColour(time, settings.colour);
        }
    }, [time, settings, bgOpacity, tickColour]);

    useEffect(() => {
        fetchSettings();

        const messageListener = (request: { msg: string }) => {
            if (request.msg === 'saved') {
                fetchSettings();
            }
        };

        chrome.runtime.onMessage.addListener(messageListener);

        const clipboard = new Clipboard('.copy');
        clipboard.on('success', (e) => {
            displayToast(`Copied "${e.text}" to clipboard`);
        });
        clipboard.on('error', () => {
            displayToast('Press Ctrl/⌘+C to copy');
        });

        return () => {
            chrome.runtime.onMessage.removeListener(messageListener);
            clipboard.destroy();
        };
    }, [fetchSettings, displayToast]);

    useEffect(() => {
        if (!settings) return;

        tick();

        const startClock = () => {
            if (!intervalRef.current) {
                setTimeout(
                    () => {
                        tick();
                        intervalRef.current = window.setInterval(tick, 1000);
                    },
                    1000 - (Date.now() % 1000),
                );
            }
        };

        startClock();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [settings, tick]);

    const onClickNewTab = () => {
        chrome.tabs.update(undefined as never, { url: 'chrome-search://local-ntp/local-ntp.html' });
    };

    const toggleSidebar = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSidebarOpen((prev) => !prev);
    };

    if (!settings || Object.keys(settings).length === 0) {
        return (
            <>
                <GlobalStyles />
                <ColoursWrapper $hidden $shrink={false} $noTransition={false} />
            </>
        );
    }

    const bgColourStyle = {
        backgroundColor: bgOpacity < 1 ? Colours.rgba(colour, bgOpacity) : colour,
    };

    const textIsDark = Boolean(settings.adjustColour && colour && Colours.isDark(...Colours.hexToRgb(colour)));
    const needsTextShadow = settings.colour !== ColourTypes.REGULAR || settings.bg !== BackgroundImage.NONE;

    return (
        <>
            <GlobalStyles />
            <NewTabContent $isDark={textIsDark}>
                <Sidebar open={sidebarOpen} onClose={toggleSidebar}>
                    <SavedColours format={settings.colourFormat} />
                </Sidebar>

                <ColoursWrapper
                    $hidden={false}
                    $shrink={sidebarOpen}
                    $noTransition={!settings.animations}
                    onClick={sidebarOpen ? toggleSidebar : undefined}
                >
                    {bgImage && <BgImage style={{ backgroundImage: `url(${bgImage})` }} />}

                    {bgOpacity !== 0 && <BgColour style={bgColourStyle} />}

                    <ButtonsWrapper>
                        <IconButton
                            title="Open sidebar"
                            onClick={toggleSidebar}
                            dangerouslySetInnerHTML={{ __html: bookmarkSvg }}
                        />

                        {settings.shortcutOpts && (
                            <IconLink
                                href="options.html"
                                title="Options"
                                target="_blank"
                                dangerouslySetInnerHTML={{ __html: gearSvg }}
                            />
                        )}

                        {settings.shortcutNewTab && (
                            <IconButton
                                title="Default new tab"
                                onClick={onClickNewTab}
                                dangerouslySetInnerHTML={{ __html: newTabSvg }}
                            />
                        )}

                        {settings.shortcutImage && bgImage && (
                            <IconLink
                                href={bgImage}
                                title="Open image"
                                target="_blank"
                                rel="noopener"
                                dangerouslySetInnerHTML={{ __html: imageSvg }}
                            />
                        )}
                    </ButtonsWrapper>

                    <Info $textShadow={needsTextShadow}>
                        {settings.showTime && (
                            <Time
                                time={time}
                                hourFormat24={settings.time24hr}
                                padHour={settings.padHour}
                                showSeconds={settings.showTimeSec}
                                showPostFix={settings.showTimePost}
                                flashSeparators={settings.flashSeparators}
                            />
                        )}

                        {settings.showDate && <DateDisplay date={date} />}

                        {settings.showColour && bgOpacity !== 0 && (
                            <Colour colour={colour} format={settings.colourFormat} />
                        )}

                        <Panels />
                    </Info>

                    {settings.ticker && settings.colour !== ColourTypes.SOLID && (
                        <History colour={colour} format={settings.colourFormat} />
                    )}
                </ColoursWrapper>

                <Toast visible={toastVisible}>{toastText}</Toast>
            </NewTabContent>
        </>
    );
}

const container = document.getElementById('newtab');
if (container) {
    createRoot(container).render(<NewTab />);
}
