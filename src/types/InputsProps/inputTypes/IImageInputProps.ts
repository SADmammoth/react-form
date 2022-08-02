import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IFileBasedInputs } from '../compound/IFileBasedInputs';

export interface IImageInputProps extends IFileBasedInputs {
  type: InputType.Image;
}
