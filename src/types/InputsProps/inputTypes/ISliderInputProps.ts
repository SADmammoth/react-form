import { InputType } from '../atomic/InputType';
import { ValueDisplayStyle } from '../atomic/ValueDisplayStyle';
import { IRangeBasedTypes } from '../compound/IRangeBasedTypes';

export interface ISliderInputProps extends IRangeBasedTypes {
  type: InputType.Slider;
  valueDisplayStyle?: ValueDisplayStyle;
}
