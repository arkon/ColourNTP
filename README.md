# Colour New Tab

[<img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png" alt="Available in the Chrome Web Store">][chrome-store]

A Chrome new tab page extension with a hex-based clock.

Requires a Chromium-based browser on v120+.

## Development

### Prerequisites

- [Node.js 24+](https://nodejs.org/en/)

### Setup

```bash
npm install
```

### Build

```bash
# Development build with hot reload
npm run dev

# Production build
npm run build

# Create ZIP for Chrome Web Store
npm run zip
```

### Contributors

- [Spencer Elliott](http://github.com/elliottsj/): Full Spectrum Hexadecimal/Hue options
- [Alexander Biggs](https://github.com/akbiggs): 12-hour option
- [Alec Brunelle](https://github.com/aleccool213): Options page tooltips
- [Jonathan Webb](https://github.com/jwebbed): Building the project in production mode
- [Kashav Madan](https://github.com/kshvmdn): Fixing 12am/pm
- [Ivan Zhang](https://github.com/1vn): Automatic text colour shift and top sites blacklist

[chrome-store]: https://chrome.google.com/webstore/detail/colour-new-tab-page/hniakoleggfkjjoncnnhinhdbgffkdmd
[original]: http://whatcolourisit.scn9a.org
[author]: http://jemurphy.org/
