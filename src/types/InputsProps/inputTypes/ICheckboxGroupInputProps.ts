import { InputType } from '../atomic/InputType';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';

export interface ICheckboxGroupInputProps extends IOptionBasedTypes {
  type: InputType.CheckboxGroup;
}
