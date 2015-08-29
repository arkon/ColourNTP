class ChromeStorage {
    private keys: Array<string>;

    constructor () {
        this.keys = ['animations', 'bg', 'bgOpacity', 'bgReddit', 'bgUrl', 'colourFull', 'colourHue', 'colourRegular',
            'colourSolid', 'colourSolidHex', 'font', 'maxClosed', 'maxVisited', 'panelApps', 'panelClosed',
            'panelShortcuts', 'panelVisited', 'ticker', 'time24hr'];
    }

    getSettings (callback): void {
        chrome.storage.sync.get(this.keys, callback);
    }
}

export = ChromeStorage;
