import { InputType } from '../atomic/InputType';
import { SliderSegment } from '../atomic/SliderSegment';
import { ValueDisplayStyle } from '../atomic/ValueDisplayStyle';
import { IRangeBasedTypes } from '../compound/IRangeBasedTypes';

export interface ISegmentedSliderInputProps extends IRangeBasedTypes {
  type: InputType.SegmentedSlider;
  segment: SliderSegment;
  segmentsCount?: number;
  valueDisplayStyle: ValueDisplayStyle;
}
