import { Validator } from 'src/types/InputsProps/atomic/ValidatorProps';
import { InputType } from '../types/InputsProps/atomic/InputType';

const validators = {
  [InputType.Number]: (value: string) => {
    const num = parseInt(value);
    return !value || num === num;
  },
};

export function getNativeValidator(type: InputType): Validator | null {
  return validators[type as keyof typeof validators] || null;
}
