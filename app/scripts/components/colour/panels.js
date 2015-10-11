import React from 'react';

import Chrome from '../../modules/chrome';


class Panels extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        console.log(Chrome.getShortcuts());
    }

    render () {
        return (
            <div className='panels'>
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
        );
    }
}

export default Panels;
