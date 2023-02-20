import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';

export interface ISelectInputProps extends IOptionBasedTypes {
  type: InputType.Select;
  allowScroll?: boolean;
  placeholder?: string;
}
