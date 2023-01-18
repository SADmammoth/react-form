import { ControlProps, ConvertersProps } from './atomic/ControlProps';
import { IActionButton } from './atomic/IActionButton';
import { InputType } from './atomic/InputType';
import { MaskType } from './atomic/MaskType';
import { ShowTip } from './atomic/ShowTip';
import { ByCharValidatorProps, ValidatorProps } from './atomic/ValidatorProps';
import { ValueOption, ValueOptions } from './atomic/ValueOptions';
import { OptionProps } from './compound/IOptionBasedTypes';
import { ICheckboxGroupInputProps } from './inputTypes/ICheckboxGroupInputProps';
import { ICheckboxInputProps } from './inputTypes/ICheckboxInputProps';
import { FileIcons, IFileInputProps } from './inputTypes/IFileInputProps';
import { IImageInputProps } from './inputTypes/IImageInputProps';
import { INumberInputProps } from './inputTypes/INumberInputProps';
import { IRadioGroupInputProps } from './inputTypes/IRadioGroupInputProps';
import { IRangeInputProps } from './inputTypes/IRangeInputProps';
import { ISearchInputProps } from './inputTypes/ISearchInputProps';
import { ISelectInputProps } from './inputTypes/ISelectInputProps';
import { ISliderInputProps } from './inputTypes/ISliderInputProps';
import { ISubform } from './inputTypes/ISubformProps';
import { ITextAreaInputProps } from './inputTypes/ITextAreaInputProps';
import { ITextInputProps } from './inputTypes/ITextInputProps';

export type InputProps =
  | ITextInputProps
  | INumberInputProps
  | ICheckboxInputProps
  | ICheckboxGroupInputProps
  | IRadioGroupInputProps
  | ITextAreaInputProps
  | ISliderInputProps
  | IRangeInputProps
  | ISelectInputProps
  | ISearchInputProps
  | IFileInputProps
  | IImageInputProps;
// | ISubform

export type InputPropsByType = {
  [InputType.Text]: ITextInputProps;
  [InputType.Number]: INumberInputProps;
  [InputType.Checkbox]: ICheckboxInputProps;
  [InputType.CheckboxGroup]: ICheckboxGroupInputProps;
  [InputType.RadioGroup]: IRadioGroupInputProps;
  [InputType.TextArea]: ITextAreaInputProps;
  [InputType.Slider]: ISliderInputProps;
  [InputType.Range]: IRangeInputProps;
  [InputType.Select]: ISelectInputProps;
  [InputType.Search]: ISearchInputProps;
  [InputType.File]: IFileInputProps;
  [InputType.Image]: IImageInputProps;
  // [InputType.Subform]: ISubform;
};

export type InputPropsIntersection = {
  value?:
    | string
    | File[]
    | number
    | ValueOption
    | { from: ValueOption; to: ValueOption };

  placeholder?: string;
  byCharValidator?: ByCharValidatorProps;
  minSymbols?: number;
  maxSymbols?: number;
  mask?: string;
  maskType?: MaskType;

  accept?: string;
  allowMultiple?: boolean;

  type?: InputType;
  required?: boolean;
  label?: string;
  control?: ControlProps;
  converters?: ConvertersProps;
  hidden?: boolean;
  validator?: ValidatorProps;
  validationMessage?: string;
  disabled?: boolean;
  bind?: string;

  min?: number;
  max?: number;
  step?: number;

  valueOptions?: ValueOptions;
  optionsProps?: OptionProps;

  fileIcons?: FileIcons;

  alwaysShowTip?: boolean;

  valueDisplayStyle?: ShowTip;

  restrictedToOptions?: boolean;
  allowScroll?: boolean;

  isResizable?: boolean;
  actionButton?: IActionButton;
};
