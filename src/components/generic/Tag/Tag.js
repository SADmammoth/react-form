import React from 'react';

// import PropTypes from 'prop-types';

function Tag({ children, onDelete }) {
  return (
    <div className="tag">
      {children}
      <button
        type="button"
        className="remove-button"
        onClick={(event) => {
          onDelete(event);
          event.preventDefault();
        }}
      />
    </div>
  );
}

Tag.propTypes = {};

export default Tag;
