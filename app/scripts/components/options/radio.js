import React from 'react';


var Radio = (props) => {
    let onCheck = (e) => {
        props.onChange(props.value);
    };

    return (
        <div>
            <label>
                <input type='radio' name={props.group}
                    checked={props.checked} onChange={onCheck} />

                <abbr>
                    <span>{props.label}</span>
                    <div>
                        <strong>{props.label}</strong>
                        <p>{props.tooltip}</p>
                    </div>
                </abbr>
            </label>
            { props.checked && props.children }
        </div>
    );
};

export default Radio;
