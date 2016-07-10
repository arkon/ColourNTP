import React from 'react';

import Colours from '../../modules/colours';
import Saved from '../../modules/saved';

export default (props) => {
  const formattedColour = Colours.format(props.colour, props.format);

  return (
    <h2 className='colours__hex'>
      <span className='copy'
        title='Copy to clipboard'
        data-clipboard-text={formattedColour}
        onClick={() => Saved.add(props.colour)}>
        {formattedColour}
      </span>
    </h2>
  );
};
