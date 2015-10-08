import React from 'react';


var Hex = (props) => {
    let time = props.time;
    let colour = `#${time.hour}${time.minute}${time.second}`;

    return (
        <h2 className='colours__hex'>{colour}</h2>
    );
}

export default Hex;
