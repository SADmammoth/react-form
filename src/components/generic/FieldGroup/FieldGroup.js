import React from 'react';

import PropTypes from 'prop-types';

function FieldGroup({ name, title, children }) {
  return (
    <div id={`group-${name}`} className="group">
      <p className="group-title">{title}</p>
      {children}
    </div>
  );
}

FieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  title: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.any,
};

export default FieldGroup;
