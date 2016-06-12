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

    this.fetchSaved = this.fetchSaved.bind(this);
    this.removeSaved = this.removeSaved.bind(this);
  }

  componentDidMount () {
    this.fetchSaved();
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

  fetchSaved () {
    Saved.get()
      .then((colours) => {
        this.setState({
          colours: colours
        });
      });
  }

  removeSaved (index) {
    this.setState({
      colours: Saved.remove(index)
    });
  }

  render () {
    // TODO: remove/copy all buttons

    return (
      <div className='saved_colours'>
        <h1>Saved</h1>

        { this.state.colours.map((colour, i) => (
          <SavedColour
            key={i}
            index={i}
            colour={colour}
            format={this.state.format}
            onRemove={this.removeSaved} />
        )) }
      </div>
    );
  }
}
