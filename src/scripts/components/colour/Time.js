import React from 'react';

import { TimeHelper } from '../../modules/timehelper';

export const Time = (props) => {
  const time = props.time;

  let hour = time.hour;

  if (!props.hourFormat24) {
    if (hour >= 12) {
      hour -= 12;
    }

    if (hour === 0) {
      hour = 12;
    }
  }

  return (
    <h1 className='colours__time'>
      <span>{TimeHelper.pad(hour)}</span>
      <span> : </span>
      <span>{TimeHelper.pad(time.minute)}</span>
      { props.showSeconds && <span> : </span> }
      { props.showSeconds && <span>{TimeHelper.pad(time.second)}</span> }

      { !props.hourFormat24 &&
        <span className='colours__time__postfix'>{time.pm ? 'PM' : 'AM'}</span>
      }
    </h1>
  );
};
