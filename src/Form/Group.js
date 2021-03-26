import React from 'react';
import PropTypes from 'prop-types';

function Group({ name, title, children }) {
  return (
    <div id={`group-${name}`} className='group'>
      <p className='group-title'>{title}</p>
      {children}
    </div>
  );
}

Group.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default Group;
