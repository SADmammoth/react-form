import React from 'react';
import { CSSInterpolation } from '@emotion/serialize';

type Props = {
  style?: CSSInterpolation;
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
      onClick={() => onClick()}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
