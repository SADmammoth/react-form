import React, { useEffect, useMemo, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import renderTag from '@/formHelpers/renderTag';
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
      className={classNames(className, classes[`${type}Fieldset`])}>
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
        })}
        value={value}
        onChange={onChangeHandler}
        {...attributes}
        checked={checked}
      />
      <Label htmlFor={id + value}>{label}</Label>
    </div>
  );
}

Toggle.propTypes = {};

export default Toggle;
