import { InputsProps } from './InputsProps/InputsProps';
import { OnSubmitCallback } from './OnSubmitCallback';

export interface IFormProps<InputsNames extends keyof any> {
  inputs: InputsProps<InputsNames>;

  onSubmit?: OnSubmitCallback;
  resetOnSubmit?: boolean;
}
