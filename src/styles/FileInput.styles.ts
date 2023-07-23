import { css } from '@emotion/react';
import classes from './helpers/classes';

export const FileInputStyles = classes({
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
  input: css`
    display: none;
  `,
  uploadFileButton: css`
    cursor: pointer;
  `,
  label: (theme) => css`
    padding: 5px 10px;
    color: ${theme.color.commonText};
  `,
  inputBox: css`
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  `,
  inputPlaceholder: (theme) => css`
    border: 3px solid ${theme.color.common};
    border-radius: ${theme.misc.borderRadius};
    height: 30px;
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

    & > button {
      color: ${theme.color.background};
      height: 100%;
      width: 80px;
      border-top-right-radius: calc(${theme.misc.borderRadius} - 3px);
      border-bottom-right-radius: calc(${theme.misc.borderRadius} - 3px);
      border: none;
      background: ${theme.color.common};
    }
    margin-bottom: 20px;
  `,
});
