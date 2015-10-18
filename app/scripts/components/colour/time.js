import React from 'react';


var Time = (props) => {
    let time = props.time;

    let hour = time.hour;

    if (!props.hourFormat24 && time.pm) {
        let pad = function (n) {
            return (n < 10) ? `0${n}` : n.toString();
        };

        hour -= 12;

        hour = pad(hour === 0 ? 12 : hour);
    }

    return (
        <h1 className='colours__time'>
            {hour} : {time.minute} : {time.second}
            {!props.hourFormat24 && <span className='colours__time__postfix'>{time.pm ? 'PM' : 'AM'}</span>}
        </h1>
    );
};

export default Time;
