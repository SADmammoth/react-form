import { InputsProps } from './InputsProps/InputsProps';
import { OnSubmitCallback } from './OnSubmitCallback';

export interface IFormProps<Props extends InputsProps> {
  inputs: InputsProps;

  onSubmit?: OnSubmitCallback<Props>;
  resetOnSubmit?: boolean;
}
