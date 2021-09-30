import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import renderTag from '@/formHelpers/renderTag';
import theme from '@/styles/theme';
import styles from './LabelledInput.styles';

const useStyles = createUseStyles(styles);

function LabelledInput(disabled, render, label, id, input) {
  const classes = useStyles(theme);

  // eslint-disable-next-line react/destructuring-assignment
  const Label = renderTag(render, 'Label');

  return label ? (
    <div>
      <Label
        className={classNames(classes.label, { [classes.disabled]: disabled })}
        htmlFor={id}>
        {label}
      </Label>
      {input}
    </div>
  ) : (
    input
  );
}
export default LabelledInput;
