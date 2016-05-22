import { bind } from 'decko';
import React from 'react';

import SavedColours from '../../modules/saved';

class Saved extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      colours: []
    };
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

  @bind
  fetchSaved () {
    this.setState({
      colours: SavedColours.getColours()
    });
  }

  render () {
    return (
      <ul>
        { this.state.colours.map((colour, i) => (
          <li key={i}
            className='copy'
            title='Copy to clipboard'
            data-clipboard-text={colour}>
            {colour}
          </li>
        ))}
      </ul>
    );
  }
}

export default Saved;
