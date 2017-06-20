import classNames from 'classnames';
import React, { Component } from 'react';

import Colours from '../../modules/colours';

import svgClose from '../../../assets/img/close.svg';

const SavedColour = ({ index, colour, format, onRemove }) => {
  const savedColourClass = classNames('saved_colour', 'copy', {
    'is_dark': Colours.isDark(...Colours.hexToRgb(colour))
  });

  const formattedColour = Colours.format(colour, format);

  const remove = (e) => {
    e.stopPropagation();
    onRemove(index);
  };

  return (
    <div className={savedColourClass}
      style={{ backgroundColor: colour }}
      title="Copy to clipboard"
      data-clipboard-text={formattedColour}>
      {formattedColour}
      <button className="saved_colour--remove" title="Remove" onClick={remove}>
        {svgClose}
      </button>
    </div>
  );
};

export default SavedColour;
