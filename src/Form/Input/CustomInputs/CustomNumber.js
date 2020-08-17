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
    onInput,
    onChange,
    required,
    attributes: { min, max, step },
  } = props;

  let getCounter = (value) => {
    let newValue = value;
    let product = (newValue - min) / step;

    if (step && step !== 1 && product !== Math.round(product)) {
      newValue = step * Math.round(product) + min;
    }

    if (newValue > max) {
      newValue = max;
    }

    if (newValue < min) {
      newValue = min;
    }

    return newValue;
  };

  useEffect(() => {
    if (currentValue !== getCounter(currentValue)) {
      onChange({ target: { name, value: getCounter(currentValue) } });
    }
  }, [currentValue, onChange]);

  let increment = async (event) => {
    event.target.value = getCounter(parseFloat(currentValue) + step);
    onChange(event);
  };

  let decrement = async () => {
    event.target.value = getCounter(parseFloat(currentValue) - step);
    onChange(event);
  };

  let onInputHandler = (event) => {
    if (event.target.value === '') {
      return;
    }

    if (Validator.numericByChar(event.target.value)) {
      onInput(event);
    }
  };

  let onChangeHandler = () => {
    event.target.value = getCounter(parseFloat(event.target.value));
    onChange(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div className="form-number">
      <input
        type="text"
        name={name}
        onChange={onInputHandler}
        onBlur={onChangeHandler}
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
