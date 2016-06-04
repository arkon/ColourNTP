import React from 'react';

import { SavedColour } from './SavedColour';

import { Saved } from '../../modules/saved';

export class SavedColours extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      colours: []
    };

    this.fetchSaved = this.fetchSaved.bind(this);
  }

  componentDidMount () {
    this.fetchSaved();

    // Fetch new settings when new colour added
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.msg === 'saved' && request.key === 'saved') {
        this.fetchSaved();
      }
    });
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState !== this.state;
  }

  fetchSaved () {
    Saved.get()
      .then((colours) => {
        this.setState({
          colours: colours
        });
      });
  }

  render () {
    return (
      <div className='saved_colours'>
        <h1>Saved</h1>

        { this.state.colours.map((colour, i) => (
          <SavedColour key={i} colour={colour} />
        )) }
      </div>
    );
  }
}
