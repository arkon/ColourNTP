import React from 'react';
import ReactDOM from 'react-dom';

import ChromeStorage from '../modules/chromestorage';

import Options from '../components/options/options';


new ChromeStorage().getSettings(function (results) {
    ReactDOM.render(<Options settings={results} />, document.getElementById('options'));
});


/*
getSettings(function (results) {

    twentyFourHourTime.checked = results['24-hour-time'] !== false;
    font.value                 = results['font'] || 'Default (Open Sans)';
    animations.checked         = results['animations'] !== false;

    timeNormal.checked         = results['time_normal'] !== false;
    timeFull.checked           = results['time_full'];
    timeFullHue.checked        = results['time_full_hue'];
    timeSolid.checked          = results['time_solid'];
    solidColor.value           = results['solid_color'];
    showHistory.checked        = results['history'];

    background.checked         = results['bg'];
    bgReddit.checked           = results['bg_reddit'];
    bgImage.value              = results['bg_image'] || '';
    bgOpacity.value            = results['bg_opacity'] || 80;
    bgOpacityVal.textContent   = results['bg_opacity'] || 80;

    panelVisited.checked       = results['panel_visited'] !== false;
    panelClosed.checked        = results['panel_closed'] !== false;
    panelApps.checked          = results['panel_apps'] !== false;
    panelShortcuts.checked     = results['panel_shortcuts'] !== false;

    maxVisited.value           = results['max_visited'] || 10;
    maxClosed.value            = results['max_closed'] || 10;
});


document.getElementById('save').onclick = function() {
    chrome.storage.sync.set({
        '24-hour-time'    : twentyFourHourTime.checked,
        'font'            : font.value,
        'animations'      : animations.checked,

        'time_normal'     : timeNormal.checked,
        'time_full'       : timeFull.checked,
        'time_full_hue'   : timeFullHue.checked,
        'time_solid'      : timeSolid.checked,
        'solid_color'     : solidColor.value,
        'history'         : showHistory.checked,

        'bg'              : background.checked,
        'bg_reddit'       : bgReddit.checked,
        'bg_image'        : bgImage.value,
        'bg_opacity'      : bgOpacity.value,

        'panel_visited'   : panelVisited.checked,
        'panel_closed'    : panelClosed.checked,
        'panel_apps'      : panelApps.checked,
        'panel_shortcuts' : panelShortcuts.checked,

        'max_visited'     : maxVisited.value,
        'max_closed'      : maxClosed.value
    });

    this.textContent = 'Saved';
    setTimeout(function() {
        document.getElementById('save').textContent = 'Save';
    }, 1000);
}
*/
