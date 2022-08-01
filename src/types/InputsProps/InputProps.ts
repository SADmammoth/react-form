import { IFileBasedInputs } from './compound/IFileBasedInputs';
import { ICheckboxGroupInputProps } from './inputTypes/ICheckboxGroupInputProps';
import { ICheckboxInputProps } from './inputTypes/ICheckboxInputProps';
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
  | IFileBasedInputs
  | IImageInputProps
  | ISubform;
