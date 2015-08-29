///<reference path="types/chrome.d.ts" />
///<reference path='types/react.d.ts' />

import React = require('react');



getSettings(function (results) {
    React.render(<Options settings={results} />, document.getElementById('option'));
});



var twentyFourHourTime = document.getElementById('time-24-hours'),
    font               = document.getElementById('fonts'),
    animations         = document.getElementById('animations');

var timeNormal         = document.getElementById('time-normal'),
    timeFull           = document.getElementById('time-full-hex'),
    timeFullHue        = document.getElementById('time-full-hue'),
    timeSolid          = document.getElementById('time-solid'),
    solidColor         = document.getElementById('time-solid-color'),
    showHistory        = document.getElementById('history');

var background         = document.getElementById('bg'),
    bgReddit           = document.getElementById('bg-reddit'),
    bgImage            = document.getElementById('bg-url'),
    bgOpacity          = document.getElementById('bg-opacity'),
    bgOpacityVal       = document.getElementById('bg-opacity-value');

var panelVisited       = document.getElementById('panel-visited'),
    panelClosed        = document.getElementById('panel-closed'),
    panelApps          = document.getElementById('panel-apps'),
    panelShortcuts     = document.getElementById('panel-shortcuts');

var maxVisited         = document.getElementById('visited-max'),
    maxClosed          = document.getElementById('closed-max');


/**
 * Load saved settings on page load.
 */
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


/**
 * Saves all options.
 */
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


/**
 * Fonts list
 */
var fonts = ['Anonymous Pro', 'Arial', 'Arvo', 'Droid Sans', 'Droid Serif', 'Maven Pro',
             'Ovo', 'PT Mono', 'PT Sans', 'PT Serif', 'Raleway', 'Roboto',
             'Roboto Condensed', 'Roboto Slab', 'Source Code Pro', 'Source Sans Pro',
             'Tahoma', 'Times', 'Ubuntu'];

(function loadFonts() {
    for (var i = 0; i < fonts.length; i++) {
        var option = document.createElement('option');
        option.text = fonts[i];
        font.add(option);
    }
})();


/**
 * Opacity slider
 */
bgOpacity.addEventListener('input', function () {
    bgOpacityVal.textContent = bgOpacity.value;
}, false);
