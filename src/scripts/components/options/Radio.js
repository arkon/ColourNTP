import React from 'react';

export default (props) => {
  const onCheck = (e) => {
    props.onChange(props.value);
  };

  return (
    <div>
      <label>
        <input type='radio' name={props.group}
          checked={props.checked} onChange={onCheck} />

        { props.tooltip ?
          <abbr>
            <span>{props.label}</span>
            <div>
              <strong>{props.label}</strong>
              <p>{props.tooltip}</p>
            </div>
          </abbr> :
          <span>{props.label}</span>
        }
      </label>

      { props.checked &&
        <div className='options__content'>{props.children}</div>
      }
    </div>
  );
};
