import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../helpers/compareObjects';
import Validator from '../../../Validator/Validator';

function CustomNumber(props) {
  const {
    name,
    type,
    value: currentValue,
    placeholder,
    onChange,
    required,
    attributes: { min, max, step },
  } = props;

  let getCounter = (value) => {
    let newValue = value;
    if (step && step !== 1 && (newValue - min) / step !== 0) {
      newValue = (step * (newValue - min)) % step;
    }

    if (newValue > max) {
      newValue = max;
    }

    if (newValue < min) {
      newValue = min;
    }

    return newValue;
  };

  if (currentValue !== getCounter(currentValue)) {
    onChange({ target: { name, value: min } });
  }

  let onChangeHandler = (counter) => {
    onChange({ target: { name, value: counter } });
  };

  let increment = async (event) => {
    event.target.value = getCounter(parseInt(currentValue) + step);
    onChange(event);
  };

  let decrement = async () => {
    event.target.value = getCounter(parseInt(currentValue) - step);
    onChange(event);
  };

  let onInputHandler = (event) => {
    if (event.target.value === '') {
      return;
    }

    if (type === 'number' && Validator.number(event.target.value, min, max)) {
      if (event.target.value == getCounter(parseInt(event.target.value))) {
        event.target.value = getCounter(parseInt(event.target.value));
        onChange(event);
      }
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div className="form-number">
      <input
        type="text"
        name={name}
        onChange={onInputHandler}
        value={currentValue}
      ></input>
      <button
        type="button"
        name={name}
        className="form-number-plus"
        onClick={increment}
      >
        &#x25b4;
      </button>
      <button
        type="button"
        name={name}
        className="form-number-minus"
        onClick={decrement}
      >
        &#x25be;
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
};

export default React.memo(CustomNumber, compareObjects);
