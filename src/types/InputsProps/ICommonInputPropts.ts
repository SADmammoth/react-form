import { ControlProps, ConvertersProps } from './atomic/ControlProps';
import { InputType } from './atomic/InputType';
import { ValidatorProps } from './atomic/ValidatorProps';

export interface ICommonInputProps {
  type: InputType;
  required?: boolean;
  label: string;
  control?: ControlProps;
  converters?: ConvertersProps;
  hidden?: boolean;
  validator?: ValidatorProps;
  validationMessage?: string;
  disabled?: boolean;
  bind?: string;

  value?: unknown;
}
