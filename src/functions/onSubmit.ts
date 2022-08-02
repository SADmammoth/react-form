import { FormDataOutput } from '../types/FormDataOutput/FormDataOutput';
import { InputsProps } from '../types/InputsProps/InputsProps';

export type OnSubmitFunction = <Props extends InputsProps>(
  data: FormDataOutput<Props>,
  resetOnSubmit?: boolean,
) => Promise<void>;
export const onSubmit: OnSubmitFunction = async (
  data,
  resetOnSubmit = false,
) => {};
