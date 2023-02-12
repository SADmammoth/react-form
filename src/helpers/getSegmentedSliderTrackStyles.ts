import { SegmentedSliderTrackStyles } from 'src/inputs/generic/SegmentedSliderTrack';
import { TrackStyles } from 'src/inputs/generic/SliderTrack';
import { InputType } from 'src/types/InputsProps/atomic/InputType';
import { StyleByType } from './getStyleByType';

export function getSegmentedSliderTrackStyles(
  styles?: StyleByType[InputType.SegmentedSlider],
): SegmentedSliderTrackStyles | undefined {
  if (!styles) return undefined;
  const {
    label,
    trackContainer,
    thumbsContainer,
    resetButton,
    minLabel,
    maxLabel,
    minMaxContainer,
    segment,
  } = styles;
  return {
    label,
    trackContainer,
    thumbsContainer,
    resetButton,
    minLabel,
    maxLabel,
    minMaxContainer,
    segment,
  };
}
