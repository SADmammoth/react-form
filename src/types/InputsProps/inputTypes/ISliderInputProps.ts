import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';

export interface ISliderInputProps extends IOptionBasedTypes {
  type: InputType.Slider;
  alwaysShowTip?: boolean;
}
