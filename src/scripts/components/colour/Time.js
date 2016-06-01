import React from 'react';

import { TimeHelper } from '../../modules/timehelper';

export const Time = (props) => {
  const time = props.time;

  var hour = time.hour;

  if (!props.hourFormat24 && time.pm) {
    hour -= 12;
    hour = TimeHelper.pad(hour === 0 ? 12 : hour);
  }

  return (
    <h1 className='colours__time'>
      <span>{hour}</span>
      <span> : </span>
      <span>{time.minute}</span>
      { props.showSeconds && <span> : </span> }
      { props.showSeconds && <span>{time.second}</span> }

      { !props.hourFormat24 &&
        <span className='colours__time__postfix'>{time.pm ? 'PM' : 'AM'}</span>
      }
    </h1>
  );
};
