import { MaskType } from '../atomic/MaskType';
import { ByCharValidatorProps } from '../atomic/ValidatorProps';

export interface ITextBasedInputs {
  value?: string;

  placeholder?: string;
  byCharValidator?: ByCharValidatorProps;
  minSymbols?: number;
  maxSymbols?: number;
  mask?: string;
  maskType?: MaskType;
}
