import React, { useState } from 'react';
import PropTypes from 'prop-types';

function HoldButton({
  action,
  className,
  name,
  children,
  holdInterval,
  firstInterval,
  disabled,
}) {
  const [timer, saveTimer] = useState(null);
  const [interval, saveInterval] = useState(null);

  const onMouseDown = () => {
    action();
    saveTimer(
      setTimeout(() => {
        saveInterval(
          setInterval(() => {
            action();
          }, holdInterval),
        );
      }, firstInterval),
    );
  };

  const onMouseUp = () => {
    clearTimeout(timer);
    clearInterval(interval);
  };

  return (
    <button
      type="button"
      name={name}
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      disabled={disabled}>
      {children}
    </button>
  );
}

HoldButton.defaultProps = {
  firstInterval: 500,
  holdInterval: 100,
};

HoldButton.propTypes = {
  action: PropTypes.func.isRequired,
  className: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.any,
  firstInterval: PropTypes.number,
  holdInterval: PropTypes.number,
};

export default HoldButton;
