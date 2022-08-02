import { ICommonInputProps } from '../ICommonInputPropts';

export interface IFileBasedInputs extends ICommonInputProps {
  accept?: string;
  value?: File[];
  allowMultiple?: boolean;
}
