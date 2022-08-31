import { css } from '@emotion/react';
import classes from './helpers/classes';
import { CheckboxInputClasses } from './CheckboxInput.styles';

export const CheckboxGroupInputStyles = classes({
  checkboxes: (theme) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 10px;

    & > * {
      align-items: flex-start;
    }
  `,
  checkboxesLabel: (theme) => css`
    color: ${theme.color.commonText};
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  `,
  ...CheckboxInputClasses,
});
