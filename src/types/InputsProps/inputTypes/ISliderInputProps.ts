import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';

export interface ISliderInputProps
  extends ICommonInputProps,
    IOptionBasedTypes {
  type: InputType.Slider;
  alwaysShowTip?: boolean;
}
