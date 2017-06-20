import React from 'react';

const Radio = ({ value, group, checked, onChange, tooltip, label, children }) => (
  <div>
    <label>
      <input type='radio' name={group}
        checked={checked} onChange={(e) => onChange(value)} />

      { tooltip ?
        <abbr>
          <span>{label}</span>
          <div>
            <strong>{label}</strong>
            <p>{tooltip}</p>
          </div>
        </abbr> :
        <span>{label}</span>
      }
    </label>

    { checked &&
      <div className='options__content'>{children}</div>
    }
  </div>
);

export default Radio;
