import { css } from '@emotion/react';
import classes from './helpers/classes';

export const CheckboxInputStyles = classes({
  inputBox: (theme) => css`
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  `,
  label: (theme) => css`
    position: relative;
    padding-left: 25px;
    color: ${theme.color.commonText};

    user-select: none;

    cursor: pointer;

    &:before {
      content: '';
      width: 10px;
      height: 10px;
      left: 0px;
      background: ${theme.color.background};
      position: absolute;
      border-radius: 3px;

      outline: 3px solid ${theme.color.common};
      border: 3px solid ${theme.color.background};
    }
  `,
  checkbox: (theme) => css`
    appearance: hidden;
    display: none;

    &:checked ~ label:before {
      background: ${theme.color.common};
    }
  `,
});
