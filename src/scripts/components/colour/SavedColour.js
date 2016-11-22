import classNames from 'classnames';
import React, { PropTypes } from 'react'
import SVGInline from 'react-svg-inline';

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
        <SVGInline svg={svgClose} />
      </button>
    </div>
  );
};

SavedColour.propTypes = {
  index: PropTypes.number.isRequired,
  colour: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default SavedColour;
