import React from 'react';

import Colours from '../../modules/colours';

const Colour = (props) => {
  var colour = props.colour;

  if (props.format === 'rgb') {
    var rgb = Colours.hexToRgb(colour.substring(1, 7));

    colour = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  return (
    <h2 className='colours__hex copy' data-clipboard-text={colour}>{colour}</h2>
  );
};

export default Colour;
