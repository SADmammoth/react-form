import React from 'react';
import { Interpolation, Theme } from '@emotion/react';

type Props = {
  style?: Interpolation<Theme>;
  disabled?: boolean;
  onClick: () => void;
  label: string;
};

const Button: React.FC<Props> = ({
  style,
  disabled,
  children,
  label,
  onClick,
}) => {
  return (
    <button
      css={style}
      aria-label={label}
      title={label}
      onClick={(event) => {
        onClick();
        event.preventDefault();
      }}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
