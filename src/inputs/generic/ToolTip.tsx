import React from 'react';
import { css, Theme } from '@emotion/react';
import { Optional } from '../../helpers/Optional';

const toolTipArrow = (theme: Theme) => `
&:before {
  content: '';
  display: block;
  position: absolute;
  top: -6px;
  height: 20px;
  width: 20px;
  transform: translate(50%);
  right: 50%;
  z-index: 1;
  background: conic-gradient(
    transparent 130deg,
    ${theme.color.popupBackground} 130deg,
    ${theme.color.popupBackground} 220deg,
    transparent 220deg
  );
}`;

const style = (theme: Theme) => css`
  font-size: 70%;
  position: absolute;
  bottom: -25px;
  transform: translate(50%);
  right: 50%;
  height: 10px;
  max-width: 50px;
  padding: 8px 5px;
  padding-top: 15px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: linear-gradient(
      0deg,
      ${theme.color.highlight} 2px,
      transparent 2px
    ),
    // Bottom Line
    linear-gradient(
        0deg,
        ${theme.color.popupBackground} 20px,
        transparent 20px
      ); // Transparent background for arrow

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 15px;
    height: 20px;
    width: 100%;
    transform: translate(50%);
    right: 50%;
    z-index: 0;

    background: linear-gradient(
        90deg,
        ${theme.color.highlight} 1px,
        transparent 1px
      ),
      // Left border
      linear-gradient(
          -90deg,
          ${theme.color.highlight} 1px,
          transparent 1px
        ); // Right border
  }
  ${toolTipArrow(theme)}
`;

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  show: boolean;
  text: string;
}

function ToolTip({ show, text, ...props }: IProps) {
  return (
    <Optional $={show}>
      <label role="tooltip" {...props} css={style} draggable={false}>
        {text}
      </label>
    </Optional>
  );
}

export default ToolTip;
