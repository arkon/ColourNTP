import React from 'react';

import { SavedColour } from './SavedColour';

import { ColourFormats } from '../../constants/settings';
import { Saved } from '../../modules/saved';

export class SavedColours extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      colours: [],
      format: ColourFormats.HEX
    };

    this.messageListener = this.messageListener.bind(this);
    this.fetchSaved = this.fetchSaved.bind(this);
  }

  componentDidMount () {
    this.fetchSaved();

    // Fetch new settings when new colour added
    chrome.runtime.onMessage.addListener(this.messageListener);
  }

  componentWillUnmount () {
    chrome.runtime.onMessage.removeListener(this.messageListener);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState !== this.state;
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.format !== this.state.format) {
      this.setState({
        format: nextProps.format
      });
    }
  }

  messageListener (request, sender, sendResponse) {
    if (request.msg === 'saved' && request.key === 'saved') {
      this.fetchSaved();
    }
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
          <SavedColour key={i} colour={colour} format={this.state.format} />
        )) }
      </div>
    );
  }
}
