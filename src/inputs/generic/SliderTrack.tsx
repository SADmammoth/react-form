import React, { MouseEventHandler } from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { Optional } from '../../helpers/Optional';
import { ProcessedClasses } from '../../styles/helpers/classes';

export type TrackStyles = ProcessedClasses<{
  trackContainer: SerializedStyles;
  label: SerializedStyles;
  thumbsContainer: SerializedStyles;
}>;

export type SliderTrackProps = {
  id: string;
  label?: string;
  leftPosition: number;
  rightPosition?: number;
  style?: TrackStyles;
  ref: React.ForwardedRef<HTMLDivElement | null>;
  onTrackClick?: MouseEventHandler;
};

const SliderTrack: React.FC<SliderTrackProps> = React.forwardRef<
  HTMLDivElement | null,
  SliderTrackProps
>(
  (
    { id, label, leftPosition, rightPosition, style, children, onTrackClick },
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        css={[style ? style.trackContainer : style, css``]}
        //@ts-ignore
        style={{ '--position': leftPosition }}>
        <Optional $={!!label}>
          <label htmlFor={id} css={style ? style.label : style}>
            {label}
          </label>
        </Optional>
        <div css={style ? style.thumbsContainer : style} onClick={onTrackClick}>
          {children}
        </div>
      </div>
    );
  },
);

export default SliderTrack;
