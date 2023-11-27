import React, { useState } from 'react';
import { Interpolation, Theme } from '@emotion/react';
import ToolTip from './ToolTip';

interface IProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onMouseEnter' | 'onMouseLeave'
  > {
  showOverride?: (isHovered: boolean) => boolean;
  text: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  wrapperStyle?: Interpolation<Theme>;
  [key: string]: any;
}

const HoverToolTip: React.FC<IProps> = ({
  showOverride,
  text,
  onMouseEnter,
  onMouseLeave,
  children,
  wrapperStyle,
  ...props
}) => {
  const [hovered, setHovered] = useState(showOverride?.(false) ?? false);

  return (
    <div
      css={[
        {
          position: 'relative',
        },
        wrapperStyle,
        {
          pointerEvents: 'all',
        },
      ]}
      onMouseEnter={(event) => {
        setHovered(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        setHovered(false);
        onMouseLeave?.(event);
      }}
      {...props} // FIXME: This props should not be on tooltip
      draggable={false}>
      {children}
      <ToolTip show={showOverride?.(hovered) ?? hovered} text={text} />
    </div>
  );
};

export default HoverToolTip;
