import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';

export interface ICheckboxGroupInputProps
  extends ICommonInputProps,
    IOptionBasedTypes {
  type: InputType.CheckboxGroup;
}
