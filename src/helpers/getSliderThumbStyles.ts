import { ThumbStyles } from 'src/inputs/generic/SliderThumb';
import { InputType } from 'src/types/InputsProps/atomic/InputType';
import { StyleByType } from './getStyleByType';

export function getSliderThumbStyles(
  styles?:
    | StyleByType[InputType.Slider]
    | StyleByType[InputType.SegmentedSlider],
): ThumbStyles | undefined {
  if (!styles) return undefined;
  const { thumb, thumbTip, activeThumb, thumbDragArea } = styles;
  return { thumb, thumbTip, activeThumb, thumbDragArea };
}
