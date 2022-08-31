import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';

export interface ICheckboxInputProps extends ICommonInputProps {
  type: InputType.Checkbox;
  value?: boolean;
}
