import { ICommonInputProps } from '../ICommonInputPropts';
import { MaskType } from '../atomic/MaskType';
import { ByCharValidatorProps } from '../atomic/ValidatorProps';

export interface ITextBasedInputs extends ICommonInputProps {
  value?: string;

  placeholder?: string;
  byCharValidator?: ByCharValidatorProps;
  minSymbols?: number;
  maxSymbols?: number;
  mask?: string;
  maskType?: MaskType;
}
