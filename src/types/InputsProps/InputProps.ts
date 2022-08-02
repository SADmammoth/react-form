import { InputType } from './atomic/InputType';
import { ICheckboxGroupInputProps } from './inputTypes/ICheckboxGroupInputProps';
import { ICheckboxInputProps } from './inputTypes/ICheckboxInputProps';
import { IFileInputProps } from './inputTypes/IFileInputProps';
import { IImageInputProps } from './inputTypes/IImageInputProps';
import { INumberInputProps } from './inputTypes/INumberInputProps';
import { IRadioGroupInputProps } from './inputTypes/IRadioGroupInputProps';
import { IRangeInputProps } from './inputTypes/IRangeInputProps';
import { ISearchInputProps } from './inputTypes/ISearchInputProps';
import { ISelectInputProps } from './inputTypes/ISelectInputProps';
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
  | IRangeInputProps
  | ISelectInputProps
  | ISearchInputProps
  | IFileInputProps
  | IImageInputProps
  | ISubform;

export type InputPropsByType = {
  [InputType.Text]: ITextInputProps;
  [InputType.Number]: INumberInputProps;
  [InputType.Checkbox]: ICheckboxInputProps;
  [InputType.CheckboxGroup]: ICheckboxGroupInputProps;
  [InputType.RadioGroup]: IRadioGroupInputProps;
  [InputType.TextArea]: ITextAreaInputProps;
  [InputType.Range]: IRangeInputProps;
  [InputType.Select]: ISelectInputProps;
  [InputType.Search]: ISearchInputProps;
  [InputType.File]: IFileInputProps;
  [InputType.Image]: IImageInputProps;
  [InputType.Subform]: ISubform;
};
