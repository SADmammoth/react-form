import React from 'react';
import { Theme, css } from '@emotion/react';
import Button from './Button';

function formatFileSize(bytes: number) {
  let size = bytes;
  if (size < 1024) {
    return size.toFixed(2) + 'B';
  }
  size /= 1024;
  if (size < 1024) {
    return size.toFixed(2) + 'KB';
  }
  size /= 1024;
  if (size < 1024) {
    return size.toFixed(2) + 'MB';
  }
  size /= 1024;
  if (size < 1024) {
    return size.toFixed(2) + 'GB';
  }
}

const root = (theme: Theme) => css`
  background-color: ${theme.color.popupBackground};
  color: ${theme.color.commonText};
  position: relative;
  padding: 3px;
  border-radius: 20px;
  margin: 0;
  padding-left: 10px;
  padding-right: 15px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  min-width: calc(${theme.misc.inputWidth} - 30px);
`;

const nameStyle = (theme: Theme) =>
  css`
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
    max-width: 63px;
    overflow: hidden;
  `;

const sizeStyle = (theme: Theme) =>
  css`
    margin: 0;
    padding: 0;
    font-size: 70%;
    margin-right: 10px;
  `;

const closeButton = (theme: Theme) => css`
  background-color: transparent;
  border: none;
  color: ${theme.color.highlight};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 2px;
`;

const extensionStyle = css`
  margin: 0;
  padding: 0;
  margin-left: -5px;
  margin-right: 5px;
`;

type Props = {
  name: string;
  size: number;
  onClose: () => void;
  disabled?: boolean;
};

function FileLabel({ name, size, onClose, disabled }: Props) {
  const nameParts = name.split('.');
  const extension = nameParts.pop();
  return (
    <li css={root}>
      <p css={nameStyle}>{nameParts.join('.')}</p>
      <p css={extensionStyle}>.{extension}</p>
      <p css={sizeStyle}>{formatFileSize(size)}</p>
      <Button
        style={closeButton}
        label="Close"
        onClick={onClose}
        disabled={disabled}>
        &#10799;
      </Button>
    </li>
  );
}

export default FileLabel;
