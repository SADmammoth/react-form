import React, { MouseEventHandler, useCallback } from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { SliderSegment } from 'src/types/InputsProps/atomic/SliderSegment';
import { Optional } from '../../helpers/Optional';
import { ProcessedClasses } from '../../styles/helpers/classes';
import HoverToolTip from './HoverToolTip';

export type SegmentedSliderTrackStyles = ProcessedClasses<{
  trackContainer: SerializedStyles;
  label: SerializedStyles;
  thumbsContainer: SerializedStyles;
  resetButton: SerializedStyles;
  minLabel: SerializedStyles;
  maxLabel: SerializedStyles;
  minMaxContainer: SerializedStyles;
  segment: SerializedStyles;
}>;

export type SegmentedSliderTrackProps = {
  id: string;
  rightPosition: number | null;
  style?: SegmentedSliderTrackStyles;
  ref: React.ForwardedRef<HTMLDivElement | null>;
  onTrackClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    i: number | null,
  ) => void;
  segment: SliderSegment;
  segmentsCount: number;
  labelCalculator?: (item: number) => string;
  showMinMax: boolean;
  minLabel: string;
  maxLabel: string;
};

const SegmentedSliderTrack: React.FC<SegmentedSliderTrackProps> =
  React.forwardRef<HTMLDivElement | null, SegmentedSliderTrackProps>(
    (
      {
        id,
        rightPosition,
        style,
        children,
        onTrackClick,
        segment,
        segmentsCount,
        labelCalculator,
        showMinMax,
        minLabel,
        maxLabel,
      },
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

      const renderSegment = (i: number) => {
        return (
          <HoverToolTip
            key={'' + id + i + 'segment'}
            text={labelCalculator?.(i) ?? ''}
            showOverride={(isHovered) =>
              labelCalculator !== undefined && isHovered
            }>
            <button
              key={`${id}_${i}`}
              css={style?.segment}
              type="button"
              onClick={(event) =>
                onTrackClick ? onTrackClick(event, i) : null
              }>
              <Segment segmentProgress={segmentProgress(i)} />
            </button>
          </HoverToolTip>
        );
      };

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
              '--right-position': rightPosition,
              '--segments-count': segmentsCount,
            }}>
            <div css={style ? style.thumbsContainer : style}>
              {children}
              <button
                css={style ? style.resetButton : style}
                type="button"
                onClick={(event) => onTrackClick?.(event, null)}></button>
              {new Array(segmentsCount).fill(0).map((_, i) => renderSegment(i))}
            </div>
          </div>
          <Optional $={showMinMax}>
            <div css={style ? style.maxLabel : style}>{maxLabel}</div>
          </Optional>
        </div>
      );
    },
  );

export default SegmentedSliderTrack;
