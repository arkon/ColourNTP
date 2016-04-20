import React from 'react';

import Colours from '../../modules/colours';

const Colour = (props) => {
  var colour = props.colour;

  switch (props.format) {
    case 'rgb':
      const rgb = Colours.hexToRgb(colour.substring(1, 7));
      colour = `rgb(${rgb.join(', ')})`;
      break;

    case 'hsl':
      const hsl = Colours.hexToHsl(colour.substring(1, 7));
      colour = `hsl(${hsl.join(', ')})`
      break;
  }

  return (
    <h2 className='colours__hex'>
      <span className='copy' data-clipboard-text={colour}>{colour}</span>
    </h2>
  );
};

export default Colour;
