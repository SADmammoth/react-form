import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTheme, createUseStyles } from 'react-jss';

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
  ...props
}) {
  const classes = useStyles(theme);

  const InputTag = render.Input || 'input';
  const [value, setValue] = useState(currentValue);
  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  return (
    <InputTag
      {...props}
      name={name}
      type={type}
      className={classNames(className, classes.input, {
        [classes.invalid]: invalid,
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
        if (!byCharValidator(event.target.value + event.key)) {
          event.preventDefault();
        }
      }}
      {...attributes}
    />
  );
}

TextInput.propTypes = {};

export default TextInput;
