import { InputType } from '../atomic/InputType';
import { SliderSegment } from '../atomic/SliderSegment';
import { ValueDisplayStyle } from '../atomic/ValueDisplayStyle';
import { IRangeBasedTypes } from '../compound/IRangeBasedTypes';
import { ISliderBasedInputs } from '../compound/ISliderBasedInputs';

export interface ISegmentedSliderInputProps extends ISliderBasedInputs {
  type: InputType.SegmentedSlider;
  segment: SliderSegment;
  segmentsCount?: number;
}
