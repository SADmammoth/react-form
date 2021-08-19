/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

// import PropTypes from 'prop-types';

function Option({ active, label, groups, onClick }) {
  let toShow = label;
  if (groups) {
    toShow = groups.map((group, i) => {
      if (!group) return group;
      return i % 2 ? <pre className="bold">{group}</pre> : <pre>{group}</pre>;
    });
  }

  return (
    <pre
      className={`option search-option${active ? ' active' : ''}`}
      onClick={onClick}>
      {toShow}
    </pre>
  );
}

Option.propTypes = {};

export default Option;
