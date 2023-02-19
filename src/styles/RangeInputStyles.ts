import { css } from '@emotion/react';
import classes from './helpers/classes';

export const RangeInputStyles = classes({
  root: (theme) => css`
    padding: 15px;
    display: flex;
    flex-direction: column;
  `,
  trackContainer: (theme) => css`
    --right-position: 0;
    --left-position: 0;
  `,
  minMaxContainer: (theme) => css`
    display: flex;
    align-items: center;
  `,
  thumbsContainer: (theme) => css`
    height: 13px;
    position: relative;
    width: ${theme.misc.inputWidth};
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
      left: calc(${theme.misc.inputWidth} * var(--left-position));
      width: calc(${theme.misc.inputWidth} * (var(--right-position) - var(--left-position)));
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
    --position: 0;
    border-radius: 100%;
    height: 12px;
    width: 12px;
    border: solid 4px ${theme.color.common};
    background: ${theme.color.background};
    position: absolute;
    top: -3px;
    z-index: 1;
    left: calc(${theme.misc.inputWidth} * var(--position) - 9px);
    input:disabled + div & {
      border-color: ${theme.color.disabled};
    }
  `,
  activeThumb: (theme) => css`
    border-color: ${theme.color.highlight};
  `,
  label: (theme) => css`
    color: ${theme.color.commonText};
    padding: 10px 5px;

    input:disabled + div & {
      color: ${theme.color.disabledText};
    }
  `,
  hiddenSliderInput: (theme) => css`
    opacity: 0;
    position: absolute;
    pointer-events: none;
  `,
  valueSliderInput: (theme) => css`
    width: 20px;
    height: 8px;
    margin-right: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    border: none;
    padding: 5px;
    border: 2px solid ${theme.color.common};
    border-radius: ${theme.misc.borderRadius};
    color: ${theme.color.commonText};
  `,
  trackRoot: css`
    display: flex;
    align-items: center;
  `,
  minLabel: (theme) => css`
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 40px;
    margin-right: 15px;
    margin-bottom: 4px;
    color: ${theme.color.commonText};
  `,
  maxLabel: (theme) => css`
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 40px;
    margin-left: 15px;
    margin-bottom: 4px;
    color: ${theme.color.commonText};
  `,
});
