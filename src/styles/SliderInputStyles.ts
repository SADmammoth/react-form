import { css } from '@emotion/react';
import classes from './helpers/classes';

export const SliderInputStyles = classes({
  root: (theme) => css`
    padding: 15px;
    display: flex;
    flex-direction: column;
  `,
  trackContainer: (theme) => css`
    --position: 0;
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
    left: calc(${theme.misc.inputWidth} * var(--position) - 9px);
    input:disabled + div & {
      border-color: ${theme.color.disabled};
    }
  `,
  activeThumb: (theme) => css`
    border-color: ${theme.color.highlight};
  `,
  thumbTip: (theme) => css`
    font-size: 70%;
    position: absolute;
    top: 10px;
    transform: translate(50%);
    right: 50%;
    height: 10px;
    max-width: 30px;
    padding: 8px 5px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: linear-gradient(
        0deg,
        ${theme.color.highlight} 2px,
        transparent 2px
      ),
      linear-gradient(
        0deg,
        ${theme.color.popupBackground} 16px,
        transparent 16px
      );
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 10px;
      height: 15px;
      width: 100%;
      max-width: 30px;
      transform: translate(50%);
      right: 50%;
      z-index: 0;

      background: linear-gradient(
          90deg,
          ${theme.color.highlight} 1px,
          transparent 1px
        ),
        linear-gradient(-90deg, ${theme.color.highlight} 1px, transparent 1px);
    }
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: -10px;
      height: 20px;
      width: 20px;
      transform: translate(50%);
      right: 50%;
      z-index: 1;
      background: conic-gradient(
        transparent 130deg,
        ${theme.color.popupBackground} 130deg,
        ${theme.color.popupBackground} 220deg,
        transparent 220deg
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
