import React from 'react';
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
};

const SliderTrack: React.FC<SliderTrackProps> = React.forwardRef<
  HTMLDivElement | null,
  SliderTrackProps
>(
  (
    { id, label, leftPosition, rightPosition, style, children },
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
        <div css={style ? style.thumbsContainer : style}>{children}</div>
      </div>
    );
  },
);

export default SliderTrack;
