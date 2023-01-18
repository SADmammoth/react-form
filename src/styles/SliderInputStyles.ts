import { css } from '@emotion/react';
import classes from './helpers/classes';

export const SliderInputStyles = classes({
  root: (theme) => css`
    padding: 15px;
  `,
  trackContainer: (theme) => css`
    display: flex;
    flex-direction: column;
    --position: 0;
    width: ${theme.misc.inputWidth};
  `,
  thumbsContainer: (theme) => css`
    height: 13px;
    position: relative;
    width: 100%;
    &:before {
      content: '';
      display: block;
      height: 100%;
      width: 100%;
      background: ${theme.color.background};
      position: absolute;
      border: solid 3px ${theme.color.common};
      box-sizing: border-box;
      border-radius: ${theme.misc.borderRadius};
    }
    &:after {
      content: '';
      display: block;
      height: 100%;
      width: calc(${theme.misc.inputWidth} * var(--position));
      background: ${theme.color.common};
      position: absolute;
      border-radius: ${theme.misc.borderRadius};
      padding-right: 7px;
    }
    input:disabled + div &:before {
      border-color: ${theme.color.disabled};
    }
    input:disabled + div &:after {
      background: ${theme.color.disabled};
    }
  `,
  thumbDragArea: (theme) => css`
    position: absolute;
    top: -50px;
    left: -50px;
    height: 100px;
    width: calc(${theme.misc.inputWidth} + 100px);
    user-select: auto !important;
    z-index: 10000;
  `,
  thumb: (theme) => css`
    border-radius: 100%;
    height: 12px;
    width: 12px;
    border: solid 4px ${theme.color.common};
    background: ${theme.color.background};
    position: absolute;
    top: -3px;
    z-index: 1;
    left: calc(${theme.misc.inputWidth} * var(--position) - 5px);
    &:hover > label {
      opacity: 1;
    }
    input:disabled + div & {
      border-color: ${theme.color.disabled};
    }
  `,
  activeThumb: (theme) => css`
    border-color: ${theme.color.highlight};
    & > label {
      opacity: 1 !important;
    }
  `,
  thumbTip: (theme) => css`
    opacity: 0;
    font-size: 70%;
    position: absolute;
    top: -30px;
    transform: translate(50%);
    right: 50%;
    height: 30px;
    max-width: 30px;
    padding: 5px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: linear-gradient(
      180deg,
      ${theme.color.popupBackground} 20px,
      transparent 20px
    );
    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      height: 20px;
      width: 20px;
      transform: translate(50%);
      right: 50%;
      z-index: 1;
      background: conic-gradient(
        ${theme.color.popupBackground} 45deg,
        transparent 45deg,
        transparent 310deg,
        ${theme.color.popupBackground} 310deg
      );
    }
  `,
  label: (theme) => css`
    color: ${theme.color.commonText};
    padding: 10px 5px;

    input:disabled + div & {
      color: ${theme.color.disabledText};
    }
  `,
  sliderInput: (theme) => css`
    opacity: 0;
    position: absolute;
    pointer-events: none;
  `,
});
