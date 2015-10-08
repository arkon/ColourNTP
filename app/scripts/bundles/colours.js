import React from 'react';
import ReactDOM from 'react-dom';

import ChromeStorage from '../modules/chromestorage';

import Time from '../components/colour/time';


new ChromeStorage().getSettings(function (results) {
    ReactDOM.render(
    	<div className='colours'>
	    	<Time hourFormat24={true} />
	    </div>,
	    document.getElementById('colours'));
});
