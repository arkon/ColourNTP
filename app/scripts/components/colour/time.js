import React from 'react';


class Time extends React.Component {
    constructor (props) {
        super(props);

        this.tick();
    }

    componentDidMount () {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    // TODO: fix ticking...
    tick () {
        let nowDate = new Date(),
            hour    = nowDate.getHours();

/*        if (!this.props.hourFormat24 && hour >= 12) {
            hour -= 12;
        }*/

        let pad = function (n) {
            return (n < 10) ? `0${n}` : n.toString();
        }

        this.state = {
            hour   : pad(hour),
            minute : pad(nowDate.getMinutes()),
            second : pad(nowDate.getSeconds())
        };
    }

    render () {
        return (
            // TODO: add AM/PM
            <h1 className='colours__time'>{this.state.hour} : {this.state.minute} : {this.state.second}</h1>
        );
    }
}

export default Time;


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
