import React from 'react';
import ReactDOM from 'react-dom';

import ChromeStorage from '../modules/chromestorage';

import Time from '../components/colour/time';
import Hex from '../components/colour/hex';
import Panels from '../components/colour/panels';
import History from '../components/colour/history';


new ChromeStorage().getSettings(function (settings) {
    let classlist = '';

    if (settings.animations === false) {
        classlist += 'notransition';
    }

    ReactDOM.render(
        <div className={classlist}>
            // <a className='opt' href='options.html' target='_blank'><span>Options</span></a>
            // <a className='opt' target='_blank'><span>Open image</span></a>
            <div className='colours'>
                <Time hourFormat24={settings.time24hr} />
                <Hex />
            </div>
            <Panels />
            <History />
        </div>,
        document.getElementById('colours'));
});
