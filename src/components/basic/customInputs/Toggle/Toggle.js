import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import renderTag from '@/helpers/renderTag';
import theme from '@/styles/theme';
import styles from './Toggle.styles';

const useStyles = createUseStyles(styles);

function Toggle({
  id,
  value,
  name,
  type,
  className,
  onChange,
  attributes,
  label,
  checked,
  required,
  render,
  disabled,
}) {
  const classes = useStyles(theme);

  const Input = renderTag(render, 'Input');
  const Label = renderTag(render, 'Label');

  const onChangeHandler = () => {
    onChange(!checked, value, name);
  };

  return (
    <div
      key={id + value}
      className={classNames(className, {
        [classes.disabled]: disabled,
      })}>
      <Input
        id={id + value}
        name={name}
        type={
          type === 'checkbox' || type === 'toggle' || type === 'spoiler'
            ? 'checkbox'
            : 'radio'
        }
        className={classNames(classes[type], {
          [classes.required]: required,
          [classes.disabledInput]: disabled,
        })}
        value={value}
        onChange={onChangeHandler}
        {...attributes}
        checked={checked}
        disabled={disabled}
      />
      <Label htmlFor={id + value}>{label}</Label>
    </div>
  );
}

Toggle.propTypes = {};

export default Toggle;
