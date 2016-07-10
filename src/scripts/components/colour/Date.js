import React, { PropTypes } from 'react';

const Date = ({ date }) => (
  <h2 className='colours__date'>{date}</h2>
);

Date.propTypes = {
  date: PropTypes.string.isRequired
};

export default Date;
