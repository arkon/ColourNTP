import classNames from 'classnames';
import React from 'react'

import Colours from '../../modules/colours';

export default ({ index, colour, format, onRemove }) => {
  const savedColourClass = classNames('saved_colour', 'copy', {
    'is_dark': Colours.isDark(...Colours.hexToRgb(colour.substring(1)))
  });

  const formattedColour = Colours.format(colour, format);

  const remove = (e) => {
    e.stopPropagation();
    onRemove(index);
  };

  return (
    <div className={savedColourClass}
      style={{ backgroundColor: colour }}
      title='Copy to clipboard'
      data-clipboard-text={formattedColour}>
      {formattedColour}
      <button className='saved_colour--remove' onClick={remove}>Remove</button>
    </div>
  );
};
