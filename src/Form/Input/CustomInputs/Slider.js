import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../helpers/compareObjects';
import Validator from '../../../Validator/Validator';
import getCounter from '../../../helpers/formHelpers/getCounter';

function CustomNumber(props) {
  const {
    name,
    type,
    value: currentValue,
    onInput,
    onChange,
    required,
    valueOptions,
  } = props;

  let value = currentValue;

  useEffect(() => {
    if (!currentValue) {
      value = valueOptions[0];
    }
  }, [value]);

  if (currentValue) {
    let currentIndex = useMemo(
      () => valueOptions.indexOf((el) => el.value === value),
      [valueOptions, value]
    );
  }

  let prev = async (event) => {};

  let next = async () => {};

  let onChangeHandler = () => {};

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div className="form-slider">
      <button
        type="button"
        name={name}
        className="form-slider-prev"
        onClick={prev}
      >
        -
      </button>
      <input
        type="text"
        name={name}
        value={currentValue}
        required={required}
        readOnly
      ></input>
      <div className="form-slider-bg">
        <div className="form-slider-thumb"></div>
      </div>

      <button
        type="button"
        name={name}
        className="form-slider-next"
        onClick={next}
      >
        +
      </button>
    </div>
  );
}

CustomNumber.defaultProps = {
  required: false,
  value: null,
  placeholder: null,
  attributes: {
    step: 1,
    min: 0,
    max: 999,
  },
};

CustomNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  attributes: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
  onInput: PropTypes.func,
};

export default React.memo(CustomNumber, compareObjects);
