import React from 'react';

export const SavedColour = (props) => (
  <div className='saved_colour copy'
    style={{ backgroundColor: props.colour }}
    title='Copy to clipboard'
    data-clipboard-text={props.colour}>
    {props.colour}
  </div>
);
