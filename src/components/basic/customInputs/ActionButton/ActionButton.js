import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash-es';
import { createUseStyles } from 'react-jss';
import Button from '@/generic/Button';
import createEvent from '@/helpers/createEvent';
import theme from '@/styles/theme';
import styles from './ActionButton.styles';

const useStyles = createUseStyles(styles);

function ActionButton(actionButton, id, render, disabled, input) {
  const classes = useStyles(theme);

  if (!actionButton || isEmpty(actionButton)) return input;
  const [value, setValue] = useState(input.props.value);
  useEffect(() => {
    setValue(input.props.value);
  }, [input.props.value]);

  return (
    <div className={classes.wrapper}>
      {React.cloneElement(input, { ...input.props, value })}
      <Button
        variant="actionButton"
        onClick={async () => {
          const { value, name, onBlur, onChange } = input.props;
          const newValue = await actionButton.action(name, value);
          setValue(newValue);
          if (onChange) {
            onChange(createEvent(name, newValue));
          } else {
            onBlur(createEvent(name, newValue));
          }
        }}
        disabled={disabled}
        render={render}>
        {actionButton.label}
      </Button>
    </div>
  );
}

export default ActionButton;
