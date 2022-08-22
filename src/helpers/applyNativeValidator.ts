import { InputType } from '../types/InputsProps/atomic/InputType';
import { Validator } from '../types/InputsProps/atomic/ValidatorProps';
import { getNativeValidator } from './getNativeValidator';

export function applyNativeValidator(
  type: InputType,
  customValidator?: Validator,
): Validator | undefined {
  const nativeValidator = getNativeValidator(type);

  if (nativeValidator) {
    if (!customValidator) {
      return nativeValidator;
    }
    return (value: any) => {
      return nativeValidator(value) && customValidator(value);
    };
  }

  return customValidator;
}
