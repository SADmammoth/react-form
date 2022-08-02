import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { ValueOption } from '../atomic/ValueOptions';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';

export interface IRangeInputProps extends Omit<IOptionBasedTypes, 'value'> {
  type: InputType.Range;
  alwaysShowTip?: boolean;
  value?: { from: ValueOption; to: ValueOption };
}
