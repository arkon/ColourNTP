import classNames from 'classnames';
import React from 'react'

import { Colours } from '../../modules/colours';

export const SavedColour = (props) => {
  const savedColourClass = classNames('saved_colour', 'copy', {
    'is_dark': Colours.isDark(...Colours.hexToRgb(props.colour))
  });

  return (
    <div className={savedColourClass}
      style={{ backgroundColor: props.colour }}
      title='Copy to clipboard'
      data-clipboard-text={props.colour}>
      {props.colour}
    </div>
  );
};
