import { InputsProps } from './InputsProps/InputsProps';
import { OnSubmitCallback } from './OnSubmitCallback';

export interface IFormProps {
  inputs: InputsProps;

  onSubmit?: OnSubmitCallback;
  resetOnSubmit?: boolean;
}
