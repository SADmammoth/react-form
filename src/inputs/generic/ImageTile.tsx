import React from 'react';
import { Theme, css } from '@emotion/react';
import Button from './Button';

const root = (theme: Theme) => css`
  position: relative;
  margin: 0;
`;

const closeButton = (theme: Theme) => css`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 5px;
  padding: 0;
  margin: 0;
  font-size: 1.7rem;
  font-weight: bold;
  color: ${theme.color.commonText};
  -webkit-text-stroke: 0.5px ${theme.color.background};
`;

const imageStyle = (theme: Theme) => css`
  width: var(--image-size);
  height: var(--image-size);
  border: 2px solid ${theme.color.common};
  border-radius: ${theme.misc.borderRadius};
  background: ${theme.color.background};
  object-fit: cover;
`;

type Props = {
  name: string;
  url?: string;
  onClose: () => void;
  disabled?: boolean;
};

function ImageTile({ name, url, onClose, disabled }: Props) {
  return (
    <li css={root}>
      <img css={imageStyle} src={url} alt={name} title={name} />
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

export default ImageTile;
