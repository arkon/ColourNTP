class Settings {

    private keys = ['animations', 'bg', 'bgOpacity', 'bgReddit', 'bgUrl', 'colourFull', 'colourHue', 'colourRegular',
        'colourSolid', 'colourSolidHex', 'font', 'maxClosed', 'maxVisited', 'panelApps', 'panelClosed',
        'panelShortcuts', 'panelVisited', 'ticker', 'time24hr'];

    getSettings (callback: Function): void {
        chrome.storage.sync.get(this.keys, function (result) {
            callback(result);
        });
    }
}

export = Settings;
