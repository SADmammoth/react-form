import { ICommonInputProps } from '../ICommonInputPropts';
import { IActionButton } from '../atomic/IActionButton';
import { InputType } from '../atomic/InputType';
import { ITextBasedInputs } from '../compound/ITextBasedInputs';

export interface ITextInputProps extends ICommonInputProps, ITextBasedInputs {
  type: InputType.Text;
  actionButton?: IActionButton;
}
