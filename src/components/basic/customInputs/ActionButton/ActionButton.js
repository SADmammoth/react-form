import React, { useEffect, useState } from 'react';

import { isEmpty } from 'lodash-es';
import { createUseStyles } from 'react-jss';

import createEvent from '@/formHelpers/createEvent';
import renderTag from '@/formHelpers/renderTag';
import theme from '@/styles/theme';

import styles from './ActionButton.styles';

const useStyles = createUseStyles(styles);

function ActionButton(actionButton, id, render, input) {
  const classes = useStyles(theme);

  if (!actionButton || isEmpty(actionButton)) return input;
  const [value, setValue] = useState(input.props.value);
  useEffect(() => {
    setValue(input.props.value);
  }, [input.props.value]);

  const Button = renderTag(render, 'Button');

  return (
    <div className={classes.wrapper}>
      {React.cloneElement(input, { ...input.props, value })}
      <Button
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
      </Button>
    </div>
  );
}

export default ActionButton;
