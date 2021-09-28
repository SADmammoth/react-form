import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import renderTag from '@/formHelpers/renderTag';
import theme from '@/styles/theme';

import styles from './TextInput.styles';

const useStyles = createUseStyles(styles);

function TextInput({
  className,
  name,
  type,
  invalid,
  value: currentValue,
  render,
  attributes,
  onChange,
  onBlur,
  byCharValidator,
  disabled,
  onKeyPress,
  ...props
}) {
  const classes = useStyles(theme);

  const [value, setValue] = useState(currentValue);
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  const Input = renderTag(render, 'Input');

  return (
    <Input
      {...props}
      name={name}
      type={type}
      className={classNames(className, classes.input, {
        [classes.invalid]: invalid,
        [classes.disabled]: disabled,
      })}
      value={value}
      onBlur={(event) => {
        setValue(event.target.value);
        onBlur(event);
      }}
      onChange={(event) => {
        setValue(event.target.value);
        onChange(event);
      }}
      onKeyPress={(event) => {
        onKeyPress(event);
        if (!byCharValidator(event.target.value + event.key)) {
          event.preventDefault();
        }
      }}
      disabled={disabled}
      {...attributes}
    />
  );
}

TextInput.propTypes = {};

export default TextInput;
