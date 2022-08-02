import { FormDataOutput } from './FormDataOutput/FormDataOutput';
import { InputsProps } from './InputsProps/InputsProps';

export type OnSubmitCallback<Props extends InputsProps> =
  | ((data: FormDataOutput<Props>) => Promise<void>)
  | false;
