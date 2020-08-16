import React from 'react';
import PropTypes from 'prop-types';
import '../styles/spinner.scss';

function Spinner({ centered, spinnerColor, spinnerBgColor, size }) {
  return (
    <div
      className={`spinner${centered ? ' spinner_centered' : ''}`}
      style={{
        '--common-color': spinnerColor,
        '--bg-color': spinnerBgColor,
        '--spinnerSize': size && size + 'px',
      }}
    />
  );
}

Spinner.defaultProps = {
  centered: false,
};

Spinner.propTypes = {
  centered: PropTypes.bool,
  spinnerColor: PropTypes.string,
  spinnerBgColor: PropTypes.string,
  size: PropTypes.number,
};

export default Spinner;
