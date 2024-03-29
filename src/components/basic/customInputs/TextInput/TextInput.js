import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import renderTag from '@/helpers/renderTag';
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
  onInput,
  onChange,
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
        onChange(event);
      }}
      onChange={(event) => {
        setValue(event.target.value);
        onInput(event);
      }}
      onKeyPress={(event) => {
        if (onKeyPress) onKeyPress(event);
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
