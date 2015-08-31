///<reference path='../../types/react.d.ts' />

import React = require('react');


interface IProps {
    hourFormat24: boolean;
}

interface IState {
    time: number;
}

class Time extends React.Component<IProps, IState> {
    private interval;

    constructor (props) {
        super(props);

        this.state = {
            time: Date.now()
        };

        this.tick = this.tick.bind(this);
    }

    tick () {
        this.setState({ time: this.state.time + 1 });
    }

    componentDidMount () {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    render () {
        let time = new Date(this.state.time);

        return (
            <h1 id='t'>{time.getHours()} : {time.getMinutes()} : {time.getSeconds()}</h1>
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
