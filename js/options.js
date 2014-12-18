var timeNormal = $('time-normal'),
    timeFull   = $('time-full'),
    timeSolid  = $('time-solid'),
    solidColor = $('time-solid-color');

var panelVisited = $('panel-visited'),
    panelClosed  = $('panel-closed'),
    panelApps    = $('panel-apps');

var maxVisited = $('visited-max'),
    maxClosed  = $('closed-max');


/**
 * Load saved settings
 */
getConfig(['time_normal', 'time_full', 'time_solid', 'solid_color',
           'panel_visited', 'panel_closed', 'panel_apps',
           'max_visited', 'max_closed'], function (results) {
  timeNormal.checked = results['time_normal'];
  timeFull.checked   = results['time_full'];
  timeSolid.checked  = results['time_solid'];
  solidColor.value   = results['solid_color'];

  panelVisited.checked = results['panel_visited'];
  panelClosed.checked  = results['panel_closed'];
  panelApps.checked    = results['panel_apps'];

  maxVisited.value = results['max_visited'] || 10;
  maxClosed.value  = results['max_closed'] || 10;
});


/**
 * Save button
 */
$('save').onclick = function() {
  chrome.storage.sync.set({
    'time_normal'  : timeNormal.checked,
    'time_full'    : timeFull.checked,
    'time_solid'   : timeSolid.checked,
    'solid_color'  : solidColor.value,

    'panel_visited': panelVisited.checked,
    'panel_closed' : panelClosed.checked,
    'panel_apps'   : panelApps.checked,

    'max_visited'  : maxVisited.value,
    'max_closed'   : maxClosed.value
  });

  this.innerHTML = 'Saved';
  setTimeout(function() {
    $('save').innerHTML = 'Save';
  }, 1000);
}
