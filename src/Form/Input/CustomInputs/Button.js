import React from 'react';
import PropTypes from 'prop-types';

function Button({ type, children, className, onClick }) {
  return (
    <button
      type={type}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  link: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
