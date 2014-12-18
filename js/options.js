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
getConfig('time_normal', function (val) {
  timeNormal.checked = val;
});

getConfig('time_full', function (val) {
  timeFull.checked = val;
});

getConfig('time_solid', function (val) {
  timeSolid.checked = val;
});

getConfig('solid_color', function (val) {
  solidColor.value = val;
});

getConfig('panel_visited', function (val) {
  panelVisited.checked = val;
});

getConfig('panel_closed', function (val) {
  panelClosed.checked = val;
});

getConfig('panel_apps', function (val) {
  panelApps.checked = val;
});

getConfig('max_visited', function (val) {
  maxVisited.value = val || 10;
});

getConfig('max_closed', function (val) {
  maxClosed.value = val || 10;
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
