import React from 'react';
import ReactDOM from 'react-dom';

import ChromeStorage from '../modules/chromestorage';

import Time from '../components/colour/time';
import Hex from '../components/colour/hex';
import Panels from '../components/colour/panels';
import History from '../components/colour/history';


new ChromeStorage().getSettings(function (settings) {
    let classlist = 'colours';

    if (settings.animations === false) {
        classlist += ' notransition';
    }

    ReactDOM.render(
        <div className={classlist}>
            <a className='opt' id='options' href='options.html' target='_blank'><span>Options</span></a>
            <a className='opt' id='download' target='_blank'><span>Open image</span></a>
            <div className='info'>
                <Time hourFormat24={settings.time24hr} />
                <Hex />
                <Panels />
            </div>
            <History />
        </div>,
        document.getElementById('colours'));
});
