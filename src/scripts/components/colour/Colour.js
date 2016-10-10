import React, { PropTypes } from 'react';

import Colours from '../../modules/colours';
import Saved from '../../modules/saved';

const Colour = ({ colour, format, textClass}) => {
  const formattedColour = Colours.format(colour, format);

  return (
    <h2 className='colours__hex'>
      <span className={`copy ${textClass}`}
        title='Copy to clipboard'
        data-clipboard-text={formattedColour}
        onClick={() => Saved.add(colour)}>
        {formattedColour}
      </span>
    </h2>
  );
};

Colour.propTypes = {
  colour: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired
};

export default Colour;
