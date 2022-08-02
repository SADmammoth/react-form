import { ICommonInputProps } from '../ICommonInputPropts';
import { IActionButton } from '../atomic/IActionButton';
import { InputType } from '../atomic/InputType';
import { ITextBasedInputs } from '../compound/ITextBasedInputs';

export interface ITextAreaInputProps extends ITextBasedInputs {
  type: InputType.TextArea;
  allowScroll?: boolean;
  isResizable?: boolean;
  actionButton?: IActionButton;
}
