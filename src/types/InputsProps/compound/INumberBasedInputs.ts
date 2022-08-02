import { ICommonInputProps } from '../ICommonInputPropts';

export interface INumberBasedInputs extends ICommonInputProps {
  value?: number;

  min?: number;
  max?: number;
  step?: number;
}
