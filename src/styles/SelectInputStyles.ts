import { css } from '@emotion/react';
import classes from './helpers/classes';

export const SelectInputStyles = classes({
  root: (theme) => css`
    border: 3px solid ${theme.color.common};
    background-color: ${theme.color.background};
    border-radius: ${theme.misc.borderRadius};
    padding: 3px 10px;
    width: ${theme.misc.inputWidth};
    box-sizing: border-box;

    color: ${theme.color.commonText};
    outline: none;

    caret-color: transparent;

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
    cursor: pointer;
  `,
  label: (theme) => css`
    color: ${theme.color.commonText};
    padding: 5px 10px;

    input:disabled + & {
      color: ${theme.color.disabledText};
    }
    position: relative;
    cursor: pointer;
    &::after {
      content: '\\23f7';

      font-size: 105%;
      font-weight: 700;
      display: block;
      width: 10px;
      height: 10px;
      color: ${theme.color.commonText};
      position: absolute;
      right: 15px;
      top: 115%;
    }
    input:focus + &::after {
      content: '\\23f6';
      font-size: 105%;
      font-weight: 700;
      display: block;
      width: 10px;
      height: 10px;
      color: ${theme.color.commonText};
      position: absolute;
      right: 15px;
      top: 115%;
      pointer-events: none;
    }
  `,
  labelActive: (theme) => css`
    &::after {
      content: '\\23f6';
      font-size: 105%;
      font-weight: 700;
      display: block;
      width: 10px;
      height: 10px;
      color: ${theme.color.highlight};
      position: absolute;
      right: 15px;
      top: 115%;
      pointer-events: none;
    }
  `,
  inputBox: (theme) => css`
    display: flex;
    flex-direction: column-reverse;
    width: ${theme.misc.inputWidth};
    padding: 10px 20px;
  `,
  focusedInputBox: (theme) => css`
    display: flex;
    flex-direction: column-reverse;
    width: ${theme.misc.inputWidth};
    padding: 10px 20px;
    z-index: 100;
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
});
