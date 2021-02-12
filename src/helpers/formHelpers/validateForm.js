import validatorsMap from '../../Validator/validatorsMap';
import findInputByName from './findInputByName';

export default function checkValidity(inputs, values, onValidationFail) {
  let input;
  let isAnyFailed;
  Object.keys(values).forEach((valueName) => {
    input = findInputByName(inputs, valueName);

    if (values[valueName].required && !values[valueName].value) {
      onValidationFail(input);
      if (!isAnyFailed) isAnyFailed = true;
    }
    if (input && typeof input.validator === 'string') {
      input = { ...input, ...validatorsMap[input.validator] };
    }
    if (input && input.validator && !input.validator(values[valueName].value)) {
      onValidationFail(input);
      if (!isAnyFailed) isAnyFailed = true;
    }
  });
  return !isAnyFailed;
}
