import { TrackStyles } from 'src/inputs/generic/SliderTrack';
import { InputType } from 'src/types/InputsProps/atomic/InputType';
import { StyleByType } from './getStyleByType';

export function getSliderTrackStyles(
  styles?: StyleByType[InputType.Slider],
): TrackStyles | undefined {
  if (!styles) return undefined;
  const {
    minMaxContainer,
    label,
    trackContainer,
    thumbsContainer,
    minLabel,
    maxLabel,
  } = styles;
  return {
    minMaxContainer,
    label,
    trackContainer,
    thumbsContainer,
    minLabel,
    maxLabel,
  };
}
