//@ts-ignore
import validatorsMap from '@/Validator/validatorsMap';
import { InputsState, InputState, Validator, ValuesState } from './types/basic';

export default function checkValidity(
  inputs: InputsState,
  values: ValuesState,
  onValidationFail: (input: InputState) => void,
) {
  let input: InputState;
  let isAnyFailed: boolean = false;

  Object.keys(values).forEach((valueName) => {
    input = inputs[valueName];

    if (
      values[valueName].required &&
      !values[valueName].value &&
      values[valueName].value !== 0
    ) {
      input.validationMessage = `${input.label || input.name} is required`;
      onValidationFail(input);
      if (!isAnyFailed) isAnyFailed = true;
    }
    let validator: Validator;
    if (input && typeof input.validator !== 'string') {
      validator = input.validator;
    } else {
      validator = validatorsMap[input.validator];
    }
    if (input && input.validator && !validator(values[valueName].value)) {
      onValidationFail(input);
      if (!isAnyFailed) isAnyFailed = true;
    }
  });
  return !isAnyFailed;
}
