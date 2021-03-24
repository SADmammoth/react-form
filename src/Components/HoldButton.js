import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

function HoldButton({
  action,
  className,
  name,
  children,
  holdInterval,
  firstInterval,
}) {
  const [timer, saveTimer] = useState(null);
  const [interval, saveInterval] = useState(null);

  const onMouseDown = useCallback(() => {
    if (!timer && !interval) {
      // action();
      // saveTimer(
      //   setTimeout(() => {
      //     saveInterval(
      //       setInterval(() => {
      //         action();
      //       }, holdInterval)
      //     );
      //   }, firstInterval)
      // );
    }
  }, [timer, interval, action]);

  const onMouseUp = useCallback(() => {
    clearTimeout(timer);
    console.log(timer);
    clearInterval(interval);

    console.log(interval);
    saveTimer(null);
    saveInterval(null);
  }, [timer, interval]);

  return (
    <button
      type='button'
      name={name}
      className={className}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  firstInterval: PropTypes.number,
  holdInterval: PropTypes.number,
};

export default HoldButton;
