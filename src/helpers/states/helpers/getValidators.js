import validatorsMap from '@/Validator/validatorsMap';

export default function getValidators(validatorProp, byCharValidatorProp) {
  let validators = {
    validator: validatorProp || (() => true),
    byCharValidator: byCharValidatorProp || (() => true),
  };

  if (typeof validatorProp === 'string') {
    validators = validatorsMap[validatorProp];
  }

  return validators;
}
