import React from 'react';

import Chrome from '../../modules/chrome';
import WebFont from '../../modules/webfont';


class FontPreview extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            font: this.props.font
        };

        this.fetchSettings = this.fetchSettings.bind(this);
    }

    componentDidMount () {
        WebFont.loadFont(this.state.font);

        // Fetch new settings when changed
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.msg === 'saved') {
                this.fetchSettings();
            }
        });
    }

    fetchSettings () {
        Chrome.getSettings((settings) => {
            WebFont.loadFont(settings.fontWeb);

            this.setState({
                font: settings.fontWeb
            });
        });
    }

    render () {
        return (
            <p>Preview: <span style={{ fontFamily: this.state.font }}>12:34:56</span></p>
        );
    }
}

export default FontPreview;
