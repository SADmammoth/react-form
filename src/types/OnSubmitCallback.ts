import { FormDataOutput } from './FormDataOutput/FormDataOutput';
import { InputsProps } from './InputsProps/InputsProps';

export type OnSubmitFunction = <Props extends InputsProps>(
  data: FormDataOutput<Props>,
) => Promise<void>;

export type OnSubmitCallback<Props extends InputsProps> =
  | OnSubmitFunction
  | false;
