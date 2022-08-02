import { OnSubmitFunction } from '../functions/onSubmit';
import { InputsProps } from './InputsProps/InputsProps';

export type OnSubmitCallback<Props extends InputsProps> =
  | OnSubmitFunction
  | false;
