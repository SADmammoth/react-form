import { css, Theme } from '@emotion/react';
import classes from './helpers/classes';

export const CheckboxInputClasses = {
  inputBox: (theme: Theme) => css`
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  `,
  label: (theme: Theme) => css`
    position: relative;
    padding-left: 25px;
    color: ${theme.color.commonText};

    user-select: none;

    &:before {
      content: '';
      width: 10px;
      height: 10px;
      left: 0;
      background: ${theme.color.background};
      position: absolute;
      border-radius: 3px;

      outline: 3px solid ${theme.color.common};
      border: 3px solid ${theme.color.background};
    }
  `,
  checkbox: (theme: Theme) => css`
    appearance: hidden;
    opacity: 0;
    width: 1px;

    &:checked ~ label:before {
      background: ${theme.color.common};
    }

    &:not(:disabled) ~ label {
      cursor: pointer;
    }

    &:disabled ~ label {
      color: ${theme.color.disabledText};
    }

    &:disabled ~ label:before {
      outline-color: ${theme.color.disabled};
    }

    &:disabled:checked ~ label:before {
      background: ${theme.color.disabled};
    }
  `,
};

export const CheckboxInputStyles = classes(CheckboxInputClasses);
