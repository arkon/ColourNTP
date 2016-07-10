import React from 'react';

export default ({ value, group, checked, onChange, tooltip, label, children }) => {
  const onCheck = (e) => {
    onChange(value);
  };

  return (
    <div>
      <label>
        <input type='radio' name={group}
          checked={checked} onChange={onCheck} />

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
};
