(function doTime() {
  var d     = new Date();
  var hours = d.getHours();
  var mins  = d.getMinutes();
  var secs  = d.getSeconds();

  if (hours < 10) { hours = "0" + hours };
  if (mins < 10)  { mins  = "0" + mins  };
  if (secs < 10)  { secs  = "0" + secs  };

  hours.toString();
  mins.toString();
  secs.toString();

  var hex = "#" + hours + mins + secs;

  document.getElementById("t").innerHTML = hours + " : " + mins + " : " + secs;
  document.getElementById("h").innerHTML = hex;

  document.body.style.background = hex;

  setTimeout(doTime(), 1000);
})();
