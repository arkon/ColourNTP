class ChromeStorage {

    getSettings (callback) {
        var keys = ['animations', 'bg', 'bgOpacity', 'bgReddit', 'bgUrl', 'colourFull', 'colourHue', 'colourRegular',
            'colourSolid', 'colourSolidHex', 'font', 'maxClosed', 'maxVisited', 'panelApps', 'panelClosed',
            'panelShortcuts', 'panelVisited', 'ticker', 'time24hr'];

        chrome.storage.sync.get(keys, callback);
    }

    set (key, value) {
        let settingObj = {};
        settingObj[key] = value;

        chrome.storage.sync.set(settingObj);
    }
}

export default ChromeStorage;
