import classNames from 'classnames';
import React from 'react'

import { Colours } from '../../modules/colours';
import { Saved } from '../../modules/saved';

export const SavedColour = (props) => {
  const savedColourClass = classNames('saved_colour', 'copy', {
    'is_dark': Colours.isDark(...Colours.hexToRgb(props.colour))
  });

  const formattedColour = Colours.format(props.colour, props.format);

  const remove = (e) => {
    e.stopPropagation();
    Saved.remove(props.index);
  };

  return (
    <div className={savedColourClass}
      style={{ backgroundColor: props.colour }}
      title='Copy to clipboard'
      data-clipboard-text={formattedColour}>
      {formattedColour}
      <button className='saved_colour--remove' onClick={remove}>x</button>
    </div>
  );
};
