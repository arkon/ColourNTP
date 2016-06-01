import React from 'react';

import { Colours } from '../../modules/colours';
import { Saved } from '../../modules/saved';

export const Colour = (props) => {
  let colour = props.colour;

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
        onClick={() => Saved.add(colour)}>
        {colour}
      </span>
    </h2>
  );
};
