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
solidColor.value = getConfig('solid_color');

getConfigCallback('time', loadTime);
function loadTime(id) {
  switch (id) {
    case 0:
      timeNormal.checked = true;
      break;
    case 1:
      timeFull.checked = true;
      break;
    case 2:
      timeSolid.checked = true;
      break;
    default:
      timeNormal.checked = true;
      break;
  }
}

getConfigCallback('max_visited', loadMaxVisited);
function loadMaxVisited(val) {
  maxVisited.value = val || 10;
}

getConfigCallback('max_closed', loadMaxClosed);
function loadMaxClosed(val) {
  maxClosed.value = val || 10;
}


/**
 * Save button
 */
$('save').onclick = function() {
  chrome.storage.sync.set({
    'solid_color': solidColor.value,
    'max_visited': maxVisited.value,
    'max_closed':  maxClosed.value
  });

  this.innerHTML = 'Saved';
  window.setTimeout(function() {
    $('save').innerHTML = 'Save';
  }, 1000);
}
