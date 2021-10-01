import React, { useEffect, useCallback, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import Validator from '@/Validator';
import HoldButton from '@/generic/HoldButton';
import compareObjects from '@/genericHelpers/compareObjects';
import getCounter from '@/genericHelpers/getCounter';
import createEvent from '@/helpers/createEvent';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import styles from './Number.styles';

const useStyles = createUseStyles(styles);

function Number(props) {
  const classes = useStyles(theme);

  const {
    className,
    // type,
    name,
    value: currentValue,
    // placeholder,
    onInput,
    onChange,
    // required,
    min,
    max,
    step,
    render,
    disabled,
  } = props;

  const counter = useCallback(
    (value) => getCounter(value, min, max, step),
    [min, max, step],
  );

  const [value, setValue] = useState(currentValue);
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);
  useEffect(() => {
    onChange(createEvent(name, value));
  }, [value]);

  const increment = () => {
    setValue((passedValue) => {
      if (!passedValue && passedValue !== 0) return min;
      const newValue = counter(parseFloat(passedValue) + step);
      return newValue;
    });
  };

  const decrement = () => {
    setValue((passedValue) => {
      if (!passedValue && passedValue !== 0) return max;
      const newValue = counter(parseFloat(passedValue) - step);
      return newValue;
    });
  };

  const onInputHandler = (event) => {
    if (Validator.numericByChar(event.target.value)) {
      onInput(event);
    }
  };

  const onChangeHandler = (event) => {
    onChange(createEvent(name, counter(parseFloat(event.target.value))));
  };

  const Input = renderTag(render, 'Input');

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div className={classNames(className, classes.number)}>
      <Input
        className={classNames(classes.input, {
          [classes.disabled]: disabled,
        })}
        type="text"
        name={name}
        onChange={onInputHandler}
        onBlur={onChangeHandler}
        value={value}
        disabled={disabled}
      />
      <HoldButton
        name={name}
        className={classNames(classes.plusButton, {
          [classes.disabled]: disabled,
        })}
        action={increment}
        disabled={disabled}>
        &#x25b4;
      </HoldButton>
      <HoldButton
        name={name}
        className={classNames(classes.minusButton, {
          [classes.disabled]: disabled,
        })}
        action={decrement}
        disabled={disabled}>
        &#x25be;
      </HoldButton>
    </div>
  );
}

Number.defaultProps = {
  className: '',
  // required: false,
  value: null,
  // placeholder: null,
  step: 1,
  min: 0,
  max: 999,
};

Number.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // placeholder: PropTypes.string,
  // required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onInput: PropTypes.func,
  render: PropTypes.shape({
    Input: PropTypes.any,
  }),
};

export default React.memo(Number, compareObjects);
