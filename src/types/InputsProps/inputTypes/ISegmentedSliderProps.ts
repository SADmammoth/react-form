import { InputType } from '../atomic/InputType';
import { SliderSegment } from '../atomic/SliderSegment';
import { IRangeBasedTypes } from '../compound/IRangeBasedTypes';
import { ISliderInputProps } from './ISliderInputProps';

export interface ISegmentedSliderInputProps extends IRangeBasedTypes {
  type: InputType.SegmentedSlider;
  segment: SliderSegment;
}
