import { InputsProps } from './InputsProps/InputsProps';
import { OnSubmitCallback } from './OnSubmitCallback';

export interface IFormProps<Props extends InputsProps> {
  inputs: Props;

  formId: string;
  onSubmit?: OnSubmitCallback<Props>;
  resetOnSubmit?: boolean;
}
