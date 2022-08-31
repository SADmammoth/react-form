import { InputType } from '../atomic/InputType';
import { ValueOption } from '../atomic/ValueOptions';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';

export interface ICheckboxGroupInputProps
  extends Omit<IOptionBasedTypes, 'value'> {
  type: InputType.CheckboxGroup;
  value?: ValueOption[];
}
