import { FormDataOutput } from '../types/FormDataOutput/FormDataOutput';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { ValuesState } from '../types/State/ValuesState';

export function formatFormOutput<Props extends InputsProps>(
  valuesState: ValuesState<Props>,
): FormDataOutput<Props> {
  return Object.fromEntries(
    Object.entries(valuesState).map(([name, { value }]) => {
      return [name, value];
    }),
  ) as FormDataOutput<Props>;
}
