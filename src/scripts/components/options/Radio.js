import React from 'react';

const Radio = ({ value, group, checked, onChange, tooltip, label, children }) => [
  <label key="label">
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
  </label>,
  checked
    ? <div key="content" className='options__content'>{children}</div>
    : null
];

export default Radio;
