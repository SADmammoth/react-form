import {
  ByCharValidatorProps,
  ControlProps,
  ConvertersProps,
  InputType,
  ValidatorProps,
  ValueOptionsProps,
} from './basic';

export interface InputProps {
  group: { id: string; title: string };
  loaded: boolean;
  value: any;

  type: InputType;
  name: string;
  className: string;
  description: string;
  required: boolean;
  label: string;
  placeholder: string;
  attributes: unknown;
  byCharValidator: ByCharValidatorProps;
  validator: ValidatorProps;
  valueOptions: ValueOptionsProps;
  minSymbols: number;
  maxSymbols: number;
  mask: string;
  maskType: unknown;
  validationMessage: string;
  onChange: (name: string, value: any) => void;
  onInput: (name: string, value: any) => void;
  alwaysShowTip: boolean;
  editable: boolean;
  markdownFeatures: unknown;
  allowScroll: boolean;
  converters: ConvertersProps;
  accept: unknown;
  actionButton: unknown;
  min: number;
  max: number;
  step: number;
  hidden?: boolean;
  disabled: boolean;
  control: ControlProps;
  invalid: boolean;
}
type InputsProps = InputProps[];
export default InputsProps;
