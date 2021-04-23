import React from 'react';
import PropTypes from 'prop-types';

function Option({ label, value, groups }) {
  let toShow = label;
  if (groups) {
    toShow = groups.map((group, i) => {
      return !(i % 2) ? <b>{group}</b> : group;
    });
  }

  return <pre className='text'>{toShow}</pre>;
}

Option.propTypes = {};

export default Option;
