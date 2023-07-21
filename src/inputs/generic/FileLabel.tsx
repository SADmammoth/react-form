import React from 'react';
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

type Props = {
  name: string;
  size: number;
  onClose: () => void;
  disabled?: boolean;
};

function FileLabel({ name, size, onClose, disabled }: Props) {
  return (
    <div>
      <p>{name}</p>
      <p>{formatFileSize(size)}</p>
      <Button label="Close" onClick={onClose} disabled={disabled}>
        x
      </Button>
    </div>
  );
}

export default FileLabel;
