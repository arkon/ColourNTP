import React from 'react';
import ReactDOM from 'react-dom';

import ChromeStorage from '../modules/chromestorage';

import Time from '../components/colour/time';
import Hex from '../components/colour/hex';


new ChromeStorage().getSettings(function (settings) {
    let classlist = '';

    if (settings.animations === false) {
        classlist += 'notransition';
    }

    ReactDOM.render(
        <div className={classlist}>
            <div className='colours'>
                <Time hourFormat24={settings.time24hr} />
                <Hex />
            </div>
        </div>,
        document.getElementById('colours'));
});

/*
<div id='contents'>
    <a class='opt' id='options' href='options.html' target='_blank'><span>Options</span></a>
    <a class='opt' id='download' target='_blank'><span>Open image</span></a>

    <div id='time'>
      <h1 id='t'></h1>
      <h2 id='h'></h2>

      <p id='panel-toggles'>
        <a id='panel-toggle-visited'>Most visited</a>
        <a id='panel-toggle-closed'>Recently closed</a>
        <a id='panel-toggle-apps'>Apps</a>
        <a id='panel-toggle-shortcuts'>Shortcuts</a>
      </p>

      <div id='panel'>
        <ul id='visited'></ul>
        <ul id='closed'></ul>
        <ul id='apps'></ul>
        <ul id='shortcuts'></ul>
      </div>
    </div>

    <div id='history'></div>
  </div>
  */
