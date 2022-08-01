import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IFileBasedInputs } from '../compound/IFileBasedInputs';

export type FileIcons = {
  [fileExtension: string]: string;
};

export interface IFileInputProps extends ICommonInputProps, IFileBasedInputs {
  type: InputType.File;
  fileIcons?: FileIcons;
}
