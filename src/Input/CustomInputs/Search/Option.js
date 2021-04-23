import React from 'react';
import PropTypes from 'prop-types';

function Option({ active, label, value, groups, onClick }) {
  let toShow = label;
  if (groups) {
    toShow = groups.map((group, i) => {
      return !(i % 2) ? <b>{group}</b> : group;
    });
  }

  return (
    <pre
      className={`option search-option${active ? ' active' : ''}`}
      onClick={onClick}
    >
      {toShow}
    </pre>
  );
}

Option.propTypes = {};

export default Option;
