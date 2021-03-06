import React from 'react';
import classNames from 'classnames';

import TimeHelper from '../../modules/timehelper';

const Time = ({ time, hourFormat24, padHour, showSeconds, showPostFix, flashSeparators }) => {
  let hour = time.hour;
  const afterNoon = hour >= 12;

  if (!hourFormat24) {
    if (afterNoon) {
      hour -= 12;
    }

    if (hour === 0) {
      hour = 12;
    }
  }

  const timeClass = classNames('colours__time', {
    'colours__time--flash': flashSeparators && time.second % 2 === 0
  });

  return (
    <h1 className={timeClass}>
      <span>{padHour ? TimeHelper.pad(hour) : hour}</span>
      <span className="colours__time__colon"> : </span>
      <span>{TimeHelper.pad(time.minute)}</span>
      { showSeconds && <span className="colours__time__colon"> : </span> }
      { showSeconds && <span>{TimeHelper.pad(time.second)}</span> }

      { !hourFormat24 && showPostFix &&
        <span className="colours__time__postfix">{afterNoon ? 'PM' : 'AM'}</span>
      }
    </h1>
  );
};

export default Time;
