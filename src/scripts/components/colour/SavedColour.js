import classNames from 'classnames';
import React from 'react'

import { Colours } from '../../modules/colours';

export const SavedColour = (props) => {
  const savedColourClass = classNames('saved_colour', 'copy', {
    'is_dark': Colours.isDark(...Colours.hexToRgb(props.colour))
  });

  const formattedColour = Colours.format(props.colour, props.format);

  return (
    <div className={savedColourClass}
      style={{ backgroundColor: props.colour }}
      title='Copy to clipboard'
      data-clipboard-text={formattedColour}>
      {formattedColour}
    </div>
  );
};
