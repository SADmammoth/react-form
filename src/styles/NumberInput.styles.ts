import { css } from '@emotion/react';
import classes from './helpers/classes';

export const NumberInputStyles = classes({
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

    position: relative;
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
  buttons: (theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 15px;
    margin-bottom: 2px;
  `,
  button: (theme) => css`
    padding: 0px;
    margin: 0;
    font-size: 0.7rem;
    background: none;
    outline: none;
    border: none;
    color: ${theme.color.commonText};
    cursor: pointer;

    &:hover {
      color: ${theme.color.highlight};
    }
    &:active {
      color: ${theme.color.common};
    }
    &:disabled {
      color: ${theme.color.disabled};
    }
  `,
});
