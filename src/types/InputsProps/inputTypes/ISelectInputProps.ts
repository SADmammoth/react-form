import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { ValueOption } from '../atomic/ValueOptions';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';

export interface ISelectInputProps extends Omit<IOptionBasedTypes, 'value'> {
  type: InputType.Select;
  allowScroll?: boolean;
  placeholder?: string;
  allowMultiple: true;
  value?: ValueOption[];
}
