///<reference path='../../types/react.d.ts' />

import React = require('react');


interface IProps {
    hourFormat24: boolean;
}

interface IState {
    time   : number;
    hour   : number;
    minute : number;
    second : number;
}

class Time extends React.Component<IProps, IState> {
    private interval;

    constructor (props) {
        super(props);

        let now     = Date.now(),
            nowDate = new Date(now);

        this.state = {
            time   : now,
            hour   : nowDate.getHours(),
            minute : nowDate.getMinutes(),
            second : nowDate.getSeconds()
        };

        this.tick = this.tick.bind(this);
    }

    tick () {
        let now     = this.state.time + 1,
            nowDate = new Date(now);

        this.setState({ 
            time   : now,
            hour   : nowDate.getHours(),
            minute : nowDate.getMinutes(),
            second : nowDate.getSeconds()
        });
    }

    componentDidMount () {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    render () {
        return (
            <h1 id='t'>{this.state.hour} : {this.state.minute} : {this.state.second}</h1>
        );
    }
}

export = Time;


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
