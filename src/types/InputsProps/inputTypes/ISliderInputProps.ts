import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { ValuesRange } from '../atomic/ValueOptions';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';
import { IRangeBasedTypes } from '../compound/IRangeBasedTypes';

export interface ISliderInputProps extends IRangeBasedTypes {
  type: InputType.Slider;
  alwaysShowTip?: boolean;
}
