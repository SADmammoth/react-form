import React, { useEffect, useState } from 'react';

import { isEmpty } from 'lodash-es';
import { useTheme, createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import Button from '@/generic/Button';

import styles from './ActionButton.styles';

const useStyles = createUseStyles(styles);

function ActionButton(actionButton, id, render, input) {
  const theme = useTheme();
  const classes = useStyles(theme);

  if (!actionButton || isEmpty(actionButton)) return input;
  const [value, setValue] = useState(input.props.value);
  useEffect(() => {
    setValue(input.props.value);
  }, [input.props.value]);

  const ButtonTag = render.Button || Button;

  return (
    <div className={classes.wrapper}>
      {React.cloneElement(input, { ...input.props, value })}
      <ButtonTag
        variant="actionButton"
        onClick={async () => {
          const { value, name, onBlur, onChange } = input.props;
          const newValue = await actionButton.action(name, value);
          setValue(newValue);
          onChange
            ? onChange(createEvent(name, newValue))
            : onBlur(createEvent(name, newValue));
        }}>
        {actionButton.label}
      </ButtonTag>
    </div>
  );
}

export default ActionButton;