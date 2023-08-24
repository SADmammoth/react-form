import { css } from '@emotion/react';
import classes from './helpers/classes';

export const ImageInputStyles = classes({
  fileLabels: (theme) => css`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0px 3px;
    align-self: flex-start;
    top: 3px;
    position: relative;
    padding-bottom: 10px;
    gap: 5px;
    overflow-x: auto;
    width: ${theme.misc.inputWidth};
    position: relative;

    ::-webkit-scrollbar {
      height: 3px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.color.common};
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.color.highlight};
    }
  `,
  fileLabelsSingle: (theme) => css`
    list-style-type: none;
    padding: 0px;
    margin; 0;
    position: relative;
  `,
  input: css`
    display: none;
  `,
  browseButton: (theme) => css`
    cursor: pointer;
    color: ${theme.color.background};
    height: 35px;
    width: 80px;
    border-radius: ${theme.misc.borderRadius};
    border: none;
    background: ${theme.color.common};
  `,
  addImageButton: (theme) => css`
    cursor: pointer;
    color: ${theme.color.background};
    height: var(--image-size);
    width: var(--image-size);
    border-radius: calc(${theme.misc.borderRadius} - 3px);
    border: none;
    background: ${theme.color.common};
    box-sizing: border-box;
    margin: 5px;
  `,
  label: (theme) => css`
    padding: 5px 10px;
    color: ${theme.color.commonText};
  `,
  inputBox: css`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    --image-size: 80px;
  `,
  inputBoxSingle: (theme) => css`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    --image-size: calc(${theme.misc.inputWidth} + 80px);
  `,
  emptyInputPlaceholder: (theme) => css`
    border: 3px solid ${theme.color.common};
    border-radius: ${theme.misc.borderRadius};
    height: calc(var(--image-size) + 10px);
    display: block;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: calc(${theme.misc.inputWidth} + 80px);

    & > p {
      padding: 0;
      margin: 0;
      color: ${theme.color.secondaryText};
      background: ${theme.color.background};
    }

    margin-bottom: 20px;
  `,
  inputPlaceholder: (theme) => css`
    border: 3px solid ${theme.color.common};
    border-radius: ${theme.misc.borderRadius};
    height: calc(var(--image-size) + 10px);
    display: block;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(${theme.misc.inputWidth} + 80px);

    & > p {
      padding: 0;
      margin: 0;
      color: ${theme.color.secondaryText};
      background: ${theme.color.background};
      margin-left: 10px;
    }

    margin-bottom: 20px;
  `,
});
