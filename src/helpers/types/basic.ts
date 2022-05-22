import { ReactElement } from 'react';
import { InputProps } from './InputsProps';

export interface FormData {
  [key: string]: string;
}

export interface InputsComponentsList {
  [key: string]: object | ReactElement;
  $list: ReactElement[];
}

export interface RenderElementsProp {
  Group: ReactElement;
  Label: ReactElement;
  Loader: (size: string | number, centered: boolean) => ReactElement;
  Input: ReactElement;
  Form: ReactElement;
}

export enum NotificationStatus {
  Success = 'success',
  Error = 'error',
}

export enum NotificationsVisibility {
  All = 'all',
  ErrorsOnly = 'errorsOnly',
  HideAll = 'hideAll',
}

export type NotifyCallback = (
  status: NotificationStatus,
  error?: unknown,
) => void;

export interface UseNotificationsResult {
  success: () => void;
  error: (error: unknown) => void;
}

export interface HighlightedInputData {
  name: string;
  errorMessage?: string;
}

export enum InputType {
  Subform = 'subfrom',
} //TODO Replace with actual

export interface InputState {
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
  inputs?: InputProps[] | (() => Promise<InputProps[]>);
} //TODO Replace with actual

export interface InputsState {
  [key: string]: InputState;
} //TODO Replace with actual

export interface ValueState {
  value: any;
  defaultValue: any;
  required: boolean;
} //TODO Replace with actual

export interface ValuesState {
  [key: string]: ValueState;
} //TODO Replace with actual

export interface SharedInputProps {
  render: RenderElementsProp;
  formId: string;
  updateValue: UpdateValueCallback;
  highlightInput: (data: HighlightedInputData) => void;
} //TODO Replace with actual

export type OnInputUpdateCallback = (inputs: InputsComponentsList) => void;

export type OnSubmitCallback = ((data: FormData) => Promise<any>) | false;

export type UseDiffCallback = (
  diff: object[] | null,
  values: object[] | null,
  savedValues: object[] | null,
) => void;

export interface ValueOption {
  label: string;
  value: string;
}

export type ValueOptions = ValueOption[]; //TODO Replace with actual
export type ValueOptionsProps = ValueOptions; //TODO Replace with actual

export interface ValuesOutput {
  [key: string]: any;
} //TODO Replace with actual

export type InputGroup = {
  $title: string;
} & {
  [key: string]: ReactElement;
};

export interface InputsGroups {
  [key: string]: InputGroup | ReactElement;
} //TODO Replace with actual

export type UpdateValueCallback = (name: string, value: any) => void;

export interface ControlProps {
  map: { '*': unknown } & unknown[];
  prop: string;
  group: string;
  field: string;
} //TODO Replace with actual

export type Converters = {
  in: (value: any) => any;
  out: (value: any) => any;
};

export type ConvertersProps = Converters | string;

export type Validator = (value: any) => boolean;
export type Validators = { validator?: Validator; byCharValidator?: Validator };

export type ValidatorProps = Validator | string;
export type ByCharValidatorProps = Validator | string;
export type InputComponentProps = {
  id: string;
  key: string;
  group?: { id: string; title: string };
  loaded?: boolean;
  value: any;

  type: InputType;
  name: string;
  className?: string;
  description?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  attributes?: unknown;
  valueOptions?: ValueOptionsProps;
  minSymbols?: number;
  maxSymbols?: number;
  mask?: string;
  maskType?: unknown;
  validationMessage?: string;
  onChange?: (name: string, value: any) => void;
  onInput?: (name: string, value: any) => void;
  alwaysShowTip?: boolean;
  editable?: boolean;
  markdownFeatures?: unknown;
  allowScroll?: boolean;
  converters?: Converters;
  accept?: unknown;
  actionButton?: unknown;
  min?: number;
  max?: number;
  step?: number;
  hidden?: boolean;
  disabled?: boolean;
  control?: ControlProps;
  invalid?: boolean;
  highlightInput: (dat: HighlightedInputData) => void;
  render: RenderElementsProp;
} & Validators;
