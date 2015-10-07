import React from 'react';

import ChromeStorage from '../modules/chromestorage';

import Time from '../components/colour/time';


new ChromeStorage().getSettings(function (results) {
    React.render(
    	<div className='colours'>
	    	<Time hourFormat24={true} />
	    </div>,
	    document.getElementById('colours'));
});
