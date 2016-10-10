import React, { PropTypes } from 'react';

import TimeHelper from '../../modules/timehelper';

const Time = ({ time, hourFormat24, padHour, showSeconds, showPostFix }) => {
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

  return (
    <h1 className='colours__time'>
      <span>{padHour ? TimeHelper.pad(hour) : hour}</span>
      <span className='colours__time__colon'> : </span>
      <span>{TimeHelper.pad(time.minute)}</span>
      { showSeconds && <span className='colours__time__colon'> : </span> }
      { showSeconds && <span>{TimeHelper.pad(time.second)}</span> }

      { !hourFormat24 && showPostFix &&
        <span className='colours__time__postfix'>{afterNoon ? 'PM' : 'AM'}</span>
      }
    </h1>
  );
};

Time.propTypes = {
  time: PropTypes.shape({
    hour: PropTypes.number.isRequired,
    minute: PropTypes.number.isRequired,
    second: PropTypes.number.isRequired,
  }).isRequired,
  hourFormat24: PropTypes.bool.isRequired,
  padHour: PropTypes.bool.isRequired,
  showSeconds: PropTypes.bool.isRequired,
  showPostFix: PropTypes.bool.isRequired
};

export default Time;
