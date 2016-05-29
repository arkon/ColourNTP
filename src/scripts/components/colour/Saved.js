import React from 'react';

import SavedColours from '../../modules/saved';

class Saved extends React.Component {
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
    SavedColours.get().then((colours) => {
      this.setState({
        colours: colours
      });
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
