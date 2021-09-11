import React, { useEffect, useCallback, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

import Validator from '@/Validator/Validator';
import createEvent from '@/formHelpers/createEvent';
import getCounter from '@/formHelpers/getCounter';
import HoldButton from '@/generic/HoldButton';
import compareObjects from '@/helpers/compareObjects';
import theme from '@/styles/theme';

import styles from './CustomNumber.styles';

const useStyles = createUseStyles(styles);

function CustomNumber(props) {
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

  const InputTag = render.input || 'input';

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <div className={classNames(className, classes.number)}>
      <InputTag
        className={classes.input}
        type="text"
        name={name}
        onChange={onInputHandler}
        onBlur={onChangeHandler}
        value={value}
      />
      <HoldButton name={name} className={classes.plusButton} action={increment}>
        &#x25b4;
      </HoldButton>
      <HoldButton
        name={name}
        className={classes.minusButton}
        action={decrement}>
        &#x25be;
      </HoldButton>
    </div>
  );
}

CustomNumber.defaultProps = {
  className: '',
  // required: false,
  value: null,
  // placeholder: null,
  step: 1,
  min: 0,
  max: 999,
};

CustomNumber.propTypes = {
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

export default React.memo(CustomNumber, compareObjects);
