import { css } from '@emotion/react';

export enum IconType {
  ChevronUp,
  ChevronDown,
}

type Props = { type: IconType };

const IconBase: React.FC = ({ children }) => {
  return (
    <i
      css={css`
        font-style: normal;
      `}>
      {children}
    </i>
  );
};

function chooseIcon(type: IconType) {
  switch (type) {
    case IconType.ChevronUp:
      return '\u25B2';
    case IconType.ChevronDown:
      return '\u25BC';
    default:
      return '';
  }
}

const Icon = ({ type }: Props) => {
  return <IconBase>{chooseIcon(type)}</IconBase>;
};

export default Icon;
