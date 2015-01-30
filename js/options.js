var twentyFourHourTime = $('24-hour-time');

var timeNormal  = $('time-normal'),
    timeFull    = $('time-full-hex'),
    timeFullHue = $('time-full-hue'),
    timeSolid   = $('time-solid'),
    solidColor  = $('time-solid-color'),
    showHistory = $('history');

var panelVisited = $('panel-visited'),
    panelClosed  = $('panel-closed'),
    panelApps    = $('panel-apps');

var maxVisited = $('visited-max'),
    maxClosed  = $('closed-max');


/**
 * Load saved settings on page load.
 */
getConfig(['24-hour-time',
           'time_normal', 'time_full', 'time_full_hue',
           'time_solid', 'solid_color', 'history',
           'panel_visited', 'panel_closed', 'panel_apps',
           'max_visited', 'max_closed'], function (results) {

  twentyFourHourTime.checked  = results['24-hour-time'] !== false;

  timeNormal.checked          = results['time_normal'] !== false;
  timeFull.checked            = results['time_full'];
  timeFullHue.checked         = results['time_full_hue'];
  timeSolid.checked           = results['time_solid'];
  solidColor.value            = results['solid_color'];
  showHistory.checked         = results['history'];

  panelVisited.checked = results['panel_visited'] !== false;
  panelClosed.checked  = results['panel_closed'] !== false;
  panelApps.checked    = results['panel_apps'] !== false;

  maxVisited.value = results['max_visited'] || 10;
  maxClosed.value  = results['max_closed'] || 10;
});


/**
 * Saves all options.
 */
$('save').onclick = function() {
  chrome.storage.sync.set({
    '24-hour-time'  : twentyFourHourTime.checked,

    'time_normal'   : timeNormal.checked,
    'time_full'     : timeFull.checked,
    'time_full_hue' : timeFullHue.checked,
    'time_solid'    : timeSolid.checked,
    'solid_color'   : solidColor.value,
    'history'       : showHistory.checked,

    'panel_visited' : panelVisited.checked,
    'panel_closed'  : panelClosed.checked,
    'panel_apps'    : panelApps.checked,

    'max_visited'   : maxVisited.value,
    'max_closed'    : maxClosed.value
  });

  this.innerHTML = 'Saved';
  setTimeout(function() {
    $('save').innerHTML = 'Save';
  }, 1000);
}
