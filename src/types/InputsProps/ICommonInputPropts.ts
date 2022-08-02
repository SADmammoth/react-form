import { ControlProps, ConvertersProps } from './atomic/ControlPropts';
import { IGroup } from './atomic/IGroup';
import { InputType } from './atomic/InputType';
import { ValidatorProps } from './atomic/ValidatorProps';

export interface ICommonInputProps {
  type: InputType;
  required?: boolean;
  label: string;
  group?: IGroup;
  control?: ControlProps;
  converters?: ConvertersProps;
  hidden?: boolean;
  validator?: ValidatorProps;
  validationMessage?: string;
  disabled?: boolean;

  value?: unknown;
}
