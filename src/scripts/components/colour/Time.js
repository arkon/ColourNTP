import React from 'react';

import { TimeHelper } from '../../modules/timehelper';

export const Time = (props) => {
  const time = props.time;

  let hour = time.hour;
  let afterNoon = hour >= 12;

  if (!props.hourFormat24) {
    if (afterNoon) {
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

      { !props.hourFormat24 && props.showPostFix &&
        <span className='colours__time__postfix'>{afterNoon ? 'PM' : 'AM'}</span>
      }
    </h1>
  );
};
