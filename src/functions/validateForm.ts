import { InputsProps } from '../types/InputsProps/InputsProps';
import { ValuesState } from '../types/State/ValuesState';

export function validateForm<Props extends InputsProps>(
  valuesState: ValuesState<Props>,
) {
  //Highlight fields
  return Object.values(valuesState).every(({ validator, value }) => {
    return validator(value);
  });
}
