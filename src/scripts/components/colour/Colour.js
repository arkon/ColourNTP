import React from 'react';

import Colours from '../../modules/colours';
import SavedColours from '../../modules/saved';

const Colour = (props) => {
  var colour = props.colour;

  switch (props.format) {
    case 'rgb':
      const rgb = Colours.hexToRgb(colour.substring(1, 7));
      colour = `rgb(${rgb.join(', ')})`;
      break;

    case 'hsl':
      const hsl = Colours.hexToHsl(colour.substring(1, 7));
      colour = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
      break;
  }

  return (
    <h2 className='colours__hex'>
      <span className='copy'
        title='Copy to clipboard'
        data-clipboard-text={colour}
        onClick={() => SavedColours.addColour(colour)}>
        {colour}
      </span>
    </h2>
  );
};

export default Colour;
