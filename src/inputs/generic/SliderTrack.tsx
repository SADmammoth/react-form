import React, { MouseEventHandler } from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { Optional } from '../../helpers/Optional';
import { ProcessedClasses } from '../../styles/helpers/classes';

export type TrackStyles = ProcessedClasses<{
  trackContainer: SerializedStyles;
  label: SerializedStyles;
  thumbsContainer: SerializedStyles;
  minLabel: SerializedStyles;
  maxLabel: SerializedStyles;
  minMaxContainer: SerializedStyles;
}>;

export type SliderTrackProps = {
  leftPosition?: number;
  rightPosition: number;
  style?: TrackStyles;
  ref: React.ForwardedRef<HTMLDivElement | null>;
  onTrackClick?: MouseEventHandler;
  minLabel: string;
  maxLabel: string;
  showMinMax: boolean;
};

const SliderTrack: React.FC<SliderTrackProps> = React.forwardRef<
  HTMLDivElement | null,
  SliderTrackProps
>(
  (
    {
      leftPosition,
      rightPosition,
      style,
      children,
      onTrackClick,
      minLabel,
      maxLabel,
      showMinMax,
    },
    forwardedRef,
  ) => {
    return (
      <div css={[style ? style.minMaxContainer : style, css``]}>
        <Optional $={showMinMax}>
          <div css={style ? style.minLabel : style}>{minLabel}</div>
        </Optional>
        <div
          ref={forwardedRef}
          css={[style ? style.trackContainer : style, css``]}
          style={{
            //@ts-ignore
            '--left-position': leftPosition ?? 0,
            '--right-position': rightPosition,
          }}>
          <div
            css={style ? style.thumbsContainer : style}
            onClick={onTrackClick}>
            {children}
          </div>
        </div>
        <Optional $={showMinMax}>
          <div css={style ? style.maxLabel : style}>{maxLabel}</div>
        </Optional>
      </div>
    );
  },
);

export default SliderTrack;
