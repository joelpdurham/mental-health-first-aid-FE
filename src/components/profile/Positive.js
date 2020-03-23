import React from 'react';
import PropTypes from 'prop-types';

export const Positive = ({ message, author, seen }) => (
  <>
    <p>{seen ? (<></>) : (<p>NEW!</p>)}&quot;{message}&quot;</p>
    <p>from {author}</p>
  </>
);

Positive.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  seen: PropTypes.bool.isRequired
};
