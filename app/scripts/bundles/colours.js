import React from 'react';
import ReactDOM from 'react-dom';

import ChromeStorage from '../modules/chromestorage';

import Time from '../components/colour/time';


new ChromeStorage().getSettings(function (settings) {
    ReactDOM.render(
    	<div className='colours'>
	    	<Time hourFormat24={settings.time24hr} />
	    </div>,
	    document.getElementById('colours'));
});
