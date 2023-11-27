import { css } from '@emotion/react';
import classes from './helpers/classes';

export const CustomTextAreaInputStyles = classes({
  root: (theme) => css`
    border: 3px solid ${theme.color.common};
    background-color: ${theme.color.background};
    border-radius: ${theme.misc.borderRadius};
    padding: 3px 10px;

    color: ${theme.color.commonText};
    outline: none;

    &::placeholder {
      color: ${theme.color.secondaryText};
    }

    &:focus {
      border: 3px solid ${theme.color.highlight};
    }

    &:disabled {
      border-color: ${theme.color.disabled};
      &::placeholder {
        color: ${theme.color.disabledText};
      }
    }
  `,
  label: (theme) => css`
    color: ${theme.color.commonText};
    padding: 5px 10px;

    input:disabled + & {
      color: ${theme.color.disabledText};
    }
  `,
  inputBox: (theme) => css`
    display: flex;
    flex-direction: column-reverse;
    width: ${theme.misc.inputWidth};
    padding: 10px;
  `,
  invalid: (theme) => css`
    color: ${theme.color.errorText};
    background-color: ${theme.color.errorBackground};
    border-color: ${theme.color.error};

    &::placeholder {
      color: ${theme.color.errorSecondaryText};
    }

    &:focus {
      border-color: ${theme.color.error};
    }
  `,
  labelInvalid: (theme) => css`
    color: ${theme.color.errorText};
  `,
});
