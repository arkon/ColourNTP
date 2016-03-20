import React from 'react';

import TimeHelper from '../../modules/timehelper';

var Time = (props) => {
    var time = props.time;

    var hour = time.hour;

    if (!props.hourFormat24 && time.pm) {
        hour -= 12;
        hour = TimeHelper.pad(hour === 0 ? 12 : hour);
    }

    return (
        <h1 className='colours__time'>
            {hour} : {time.minute} : {time.second}

            { !props.hourFormat24 &&
                <span className='colours__time__postfix'>{time.pm ? 'PM' : 'AM'}</span>
            }
        </h1>
    );
};

export default Time;
