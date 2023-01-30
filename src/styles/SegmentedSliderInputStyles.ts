import { css } from '@emotion/react';
import classes from './helpers/classes';

export const SegmentedSliderInputStyles = classes({
  root: (theme) => css`
    padding: 15px;
    display: flex;
    flex-direction: column;
  `,
  trackContainer: (theme) => css`
    --right-position: 0;
    --segments-count: 0;
  `,
  resetButton: (theme) => css`
    position: absolute;
    height: 100%;
    left: calc(-1 * ${theme.misc.inputWidth} / var(--segments-count));
  `,
  thumbsContainer: (theme) => css`
    width: ${theme.misc.inputWidth};
    position: relative;
    display: flex;
    & > button {
      background: none;
      display: block;
      width: auto;
      padding: 0;
      margin: 0;
      border: none;
      width: calc(${theme.misc.inputWidth} / var(--segments-count));
      & * {
        width: 100%;
      }
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
    height: 100%;
    width: calc(${theme.misc.inputWidth} / var(--segments-count));
    position: absolute;
    top: -3px;
    box-sizing: border-box;
    z-index: 1;
    left: calc(
      (
          ${theme.misc.inputWidth} -
            (${theme.misc.inputWidth} / (var(--segments-count) + 1))
        ) * var(--right-position)
    );
    input:disabled + div & {
      border-color: ${theme.color.disabled};
    }
  `,
  activeThumb: (theme) => css``,
  thumbTip: (theme) => css`
    display: none;
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
  trackRoot: css`
    display: flex;
    align-items: center;
  `,
});
