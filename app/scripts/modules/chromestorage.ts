///<reference path='../types/chrome.d.ts' />

class ChromeStorage {

    getSettings (callback): void {
        var keys = ['animations', 'bg', 'bgOpacity', 'bgReddit', 'bgUrl', 'colourFull', 'colourHue', 'colourRegular',
            'colourSolid', 'colourSolidHex', 'font', 'maxClosed', 'maxVisited', 'panelApps', 'panelClosed',
            'panelShortcuts', 'panelVisited', 'ticker', 'time24hr'];

        chrome.storage.sync.get(keys, callback);
    }

    set (key, value): void {
        let settingObj = {};
        settingObj[key] = value;

        chrome.storage.sync.set(settingObj);
    }
}

export = ChromeStorage;
