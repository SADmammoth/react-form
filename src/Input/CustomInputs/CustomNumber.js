import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import compareObjects from '../../helpers/compareObjects';
import Validator from '../../Validator/Validator';
import getCounter from '../../helpers/formHelpers/getCounter';
import HoldButton from '../../Components/HoldButton';
import createEvent from '../../helpers/createEvent';

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
    render,
  } = props;

  const counter = useCallback(
    (value) => {
      return getCounter(value, min, max, step);
    },
    [min, max, step]
  );

  const [value, setValue] = useState(currentValue);
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  const increment = () => {
    setValue((value) => {
      const newValue = counter(parseFloat(value) + step);
      onChange(createEvent(name, newValue));
      return newValue;
    });
  };

  const decrement = () => {
    setValue((value) => {
      const newValue = counter(parseFloat(value) + step);
      onChange(createEvent(name, newValue));
      return newValue;
    });
  };

  const onInputHandler = (event) => {
    if (event.target.value === '') {
      return;
    }

    if (Validator.numericByChar(event.target.value)) {
      onInput(event);
    }
  };

  const onChangeHandler = (event) => {
    onChange(createEvent(name, counter(parseFloat(event.target.value))));
  };

  const InputTag = render.input || 'input';

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div className='form-number'>
      <InputTag
        type='text'
        name={name}
        onChange={onInputHandler}
        onBlur={onChangeHandler}
        value={value}
      ></InputTag>
      <HoldButton name={name} className='form-number-plus' action={increment}>
        &#x25b4;
      </HoldButton>
      <HoldButton name={name} className='form-number-minus' action={decrement}>
        &#x25be;
      </HoldButton>
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
  render: PropTypes.shape({
    Input: PropTypes.any,
  }),
};

export default React.memo(CustomNumber, compareObjects);
