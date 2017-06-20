import React, { Component } from 'react';

import SavedColour from './SavedColour';

import { ColourFormats } from '../../constants/settings';

import Saved from '../../modules/saved';

export default class SavedColours extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colours: []
    };

    this.fetchSaved = this.fetchSaved.bind(this);
    this.removeSaved = this.removeSaved.bind(this);
    this.clearSaved = this.clearSaved.bind(this);
  }

  componentDidMount() {
    this.fetchSaved();
  }

  fetchSaved() {
    Saved.get()
      .then((colours) => {
        this.setState({
          colours: colours
        });
      });
  }

  removeSaved(index) {
    this.setState({
      colours: Saved.remove(index)
    });
  }

  clearSaved() {
    if (window.confirm('Are you sure you want to remove all of your saved colours?')) {
      this.setState({
        colours: Saved.clear()
      });
    }
  }

  render() {
    return (
      <div className="saved_colours">
        <h1>Saved</h1>

        { this.state.colours.length > 0 ?
          <button className="btn" onClick={this.clearSaved}>Remove all</button> :
          <p>You don't have anything saved!<br />Click on a code to save it.</p>
        }

        { this.state.colours.map((colour, i) => (
          <SavedColour
            key={i}
            index={i}
            colour={colour}
            format={this.props.format}
            onRemove={this.removeSaved} />
        )) }
      </div>
    );
  }
}
