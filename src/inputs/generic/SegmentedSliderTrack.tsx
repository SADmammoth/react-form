import React, { MouseEventHandler } from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { SliderSegment } from 'src/types/InputsProps/atomic/SliderSegment';
import { Optional } from '../../helpers/Optional';
import { ProcessedClasses } from '../../styles/helpers/classes';

export type SegmentedSliderTrackStyles = ProcessedClasses<{
  trackContainer: SerializedStyles;
  label: SerializedStyles;
  thumbsContainer: SerializedStyles;
  resetButton: SerializedStyles;
}>;

export type SegmentedSliderTrackProps = {
  rightPosition: number | null;
  style?: SegmentedSliderTrackStyles;
  ref: React.ForwardedRef<HTMLDivElement | null>;
  onTrackClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    i: number | null,
  ) => void;
  segment: SliderSegment;
  segmentsCount: number;
};

const SegmentedSliderTrack: React.FC<SegmentedSliderTrackProps> =
  React.forwardRef<HTMLDivElement | null, SegmentedSliderTrackProps>(
    (
      { rightPosition, style, children, onTrackClick, segment, segmentsCount },
      forwardedRef,
    ) => {
      const Segment = segment;
      const index =
        rightPosition !== null ? rightPosition * segmentsCount - 1 : null;
      let segmentProgress = (i: number) => {
        if (index === null) return 0;
        if (i - 1 < Math.ceil(index) && i - 1 >= Math.floor(index)) {
          return index - Math.floor(index);
        }
        if (Math.floor(index) < i - 1) {
          return 0;
        }
        return 1;
      };

      return (
        <div
          ref={forwardedRef}
          css={[style ? style.trackContainer : style, css``]}
          //@ts-ignore
          style={{
            //@ts-ignore
            '--right-position': leftPosition,
            '--segments-count': segmentsCount,
          }}>
          <div css={style ? style.thumbsContainer : style}>
            {children}
            <button
              css={style ? style.resetButton : style}
              type="button"
              onClick={(event) => onTrackClick?.(event, null)}></button>
            {new Array(segmentsCount).fill(0).map((_, i) => (
              <button
                type="button"
                onClick={(event) =>
                  onTrackClick ? onTrackClick(event, i) : null
                }>
                <Segment segmentProgress={segmentProgress(i)} />
              </button>
            ))}
          </div>
        </div>
      );
    },
  );

export default SegmentedSliderTrack;
