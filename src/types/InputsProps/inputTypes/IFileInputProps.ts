import { ICommonInputProps } from '../ICommonInputPropts';
import { InputType } from '../atomic/InputType';
import { IFileBasedInputs } from '../compound/IFileBasedInputs';

export type FileIcons = {
  [fileExtension: string]: string;
};

export interface IFileInputProps extends IFileBasedInputs {
  type: InputType.File;
  fileIcons?: FileIcons;
  placeholder?: string;
}
