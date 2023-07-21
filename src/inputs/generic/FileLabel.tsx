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
  padding: 10px;
  border-radius: 20px;
  margin: 0;
  padding-left: 15px;
`;

const nameStyle = (theme: Theme) =>
  css`
    margin: 0;
    padding: 0;
    padding-bottom: 5px;
    margin-right: 50px;
  `;

const sizeStyle = (theme: Theme) =>
  css`
    margin: 0;
    padding: 0;
    font-size: 80%;
  `;

const closeButton = (theme: Theme) => css`
  background-color: ${theme.color.background};
  border-radius: 100%;
  border-color: ${theme.color.highlight};
  color: ${theme.color.highlight};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
`;

type Props = {
  name: string;
  size: number;
  onClose: () => void;
  disabled?: boolean;
};

function FileLabel({ name, size, onClose, disabled }: Props) {
  return (
    <li css={root}>
      <p css={nameStyle}>{name}</p>
      <p css={sizeStyle}>{formatFileSize(size)}</p>
      <Button
        style={closeButton}
        label="Close"
        onClick={onClose}
        disabled={disabled}>
        x
      </Button>
    </li>
  );
}

export default FileLabel;
