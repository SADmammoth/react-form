import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { ValueOption } from '../atomic/ValueOptions';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';
import { ISliderBasedInputs } from '../compound/ISliderBasedInputs';

export interface IRangeInputProps extends Omit<ISliderBasedInputs, 'value'> {
  type: InputType.Range;
  value?: { from: ValueOption; to: ValueOption; range: ValueOption[] };
}
