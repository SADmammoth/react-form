import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { INumberBasedInputs } from '../compound/INumberBasedInputs';

export interface INumberInputProps extends INumberBasedInputs {
  type: InputType.Number;
  placeholder?: string;
}
