import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IFileBasedInputs } from '../compound/IFileBasedInputs';

export interface IImageInputProps extends ICommonInputProps, IFileBasedInputs {
  type: InputType.Image;
}
