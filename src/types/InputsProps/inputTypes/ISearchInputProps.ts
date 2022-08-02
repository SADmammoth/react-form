import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IOptionBasedTypes } from '../compound/IOptionBasedTypes';
import { ITextBasedInputs } from '../compound/ITextBasedInputs';

export interface ISearchInputProps
  extends Omit<IOptionBasedTypes, 'value'>,
    ITextBasedInputs {
  type: InputType.Search;
  restrictedToOptions?: boolean;
  allowScroll?: boolean;
}
