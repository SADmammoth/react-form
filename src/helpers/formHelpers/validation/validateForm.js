import validatorsMap from '@/Validator/validatorsMap';

export default function checkValidity(inputs, values, onValidationFail) {
  let input;
  let isAnyFailed;
  Object.keys(values).forEach((valueName) => {
    input = inputs[name];

    if (
      values[valueName].required &&
      !values[valueName].value &&
      values[valueName].value !== 0
    ) {
      input.validationMessage = `${input.label || input.name} is required`;
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
