import React from 'react';


class Panels extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className='panels'>
                Panels
            </div>
        );
    }
}

export default Panels;


// <p id='panel-toggles'>
//   <a id='panel-toggle-visited'>Most visited</a>
//   <a id='panel-toggle-closed'>Recently closed</a>
//   <a id='panel-toggle-apps'>Apps</a>
//   <a id='panel-toggle-shortcuts'>Shortcuts</a>
// </p>

// <div id='panel'>
//   <ul id='visited'></ul>
//   <ul id='closed'></ul>
//   <ul id='apps'></ul>
//   <ul id='shortcuts'></ul>
// </div>
