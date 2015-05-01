var twentyFourHourTime = $('#time-24-hours'),
    font               = $('#fonts'),
    animations         = $('#animations');

var timeNormal         = $('#time-normal'),
    timeFull           = $('#time-full-hex'),
    timeFullHue        = $('#time-full-hue'),
    timeSolid          = $('#time-solid'),
    solidColor         = $('#time-solid-color'),
    showHistory        = $('#history');

var background         = $('#bg'),
    bgReddit           = $('#bg-reddit'),
    bgImage            = $('#bg-url'),
    bgOpacity          = $('#bg-opacity'),
    bgOpacityVal       = $('#bg-opacity-value');


var panelVisited       = $('#panel-visited'),
    panelClosed        = $('#panel-closed'),
    panelApps          = $('#panel-apps'),
    panelShortcuts     = $('#panel-shortcuts');

var maxVisited         = $('#visited-max'),
    maxClosed          = $('#closed-max');


/**
 * Load saved settings on page load.
 */
getSyncConfig(['24-hour-time', 'font', 'animations',
           'time_normal', 'time_full', 'time_full_hue',
           'time_solid', 'solid_color', 'history',
           'bg', 'bg_reddit', 'bg_image', 'bg_opacity',
           'panel_visited', 'panel_closed', 'panel_apps', 'panel_shortcuts',
           'max_visited', 'max_closed'], function (results) {

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
  bgOpacityVal.innerHTML     = results['bg_opacity'] || 80;

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
$('#save').onclick = function() {
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

  this.innerHTML = 'Saved';
  setTimeout(function() {
    $('#save').innerHTML = 'Save';
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
  for (i = 0; i < fonts.length; i++) {
    var option = document.createElement('option');
    option.text = fonts[i];
    font.add(option);
  }
})();


/**
 * Opacity slider
 */
bgOpacity.addEventListener('input', function () {
  bgOpacityVal.innerHTML = bgOpacity.value;
}, false);
