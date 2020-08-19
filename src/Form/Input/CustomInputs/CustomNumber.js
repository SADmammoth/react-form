import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../../helpers/compareObjects';
import Validator from '../../../Validator/Validator';
import getCounter from '../../../helpers/formHelpers/getCounter';

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

  let counter = useCallback(
    (value) => {
      return getCounter(value, min, max, step);
    },
    [min, max, step]
  );

  useEffect(() => {
    if (currentValue !== counter(currentValue)) {
      onChange({ target: { name, value: counter(currentValue) } });
    }
  }, [currentValue, onChange]);

  let increment = async (event) => {
    console.log(1);
    event.target.value = counter(parseFloat(currentValue) + step);
    onChange(event);
  };

  let decrement = async () => {
    event.target.value = counter(parseFloat(currentValue) - step);
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
    event.target.value = counter(parseFloat(event.target.value));
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
  onInput: PropTypes.func,
};

export default React.memo(CustomNumber, compareObjects);
