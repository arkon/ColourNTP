import React, { Component } from 'react';

import Colours from '../../modules/colours';
import Saved from '../../modules/saved';

const Colour = ({ colour, format }) => {
  const formattedColour = Colours.format(colour, format);

  return (
    <h2 className="colours__hex">
      <span className="copy"
        title="Copy to clipboard"
        data-clipboard-text={formattedColour}
        onClick={() => Saved.add(colour)}>
        {formattedColour}
      </span>
    </h2>
  );
};

export default Colour;
