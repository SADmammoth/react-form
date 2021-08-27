import React from 'react';

import PropTypes from 'prop-types';

function Button({ type, variant, children, className, onClick, ...props }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      className={className || '' + ' ' + variant}
      onClick={(event) => {
        event.preventDefault();
        onClick(event);
      }}
      {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
