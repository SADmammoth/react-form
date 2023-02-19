import { InputType } from '../atomic/InputType';
import { ValueDisplayStyle } from '../atomic/ValueDisplayStyle';
import { ISliderBasedInputs } from '../compound/ISliderBasedInputs';

export interface ISliderInputProps extends ISliderBasedInputs {
  type: InputType.Slider;
}
