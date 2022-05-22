//@ts-ignore
import validatorsMap from '@/Validator/validatorsMap';
import {
  ByCharValidatorProps,
  ValidatorProps,
  Validators,
} from '@/helpers/types/basic';

export default function getValidators(
  validatorProp: ValidatorProps,
  byCharValidatorProp: ByCharValidatorProps,
): Validators {
  if (typeof validatorProp === 'string') {
    return validatorsMap[validatorProp];
  }

  if (typeof byCharValidatorProp === 'string') {
    return validatorsMap[byCharValidatorProp];
  }

  let validators = {
    validator: validatorProp || (() => true),
    byCharValidator: byCharValidatorProp || (() => true),
  };

  return validators;
}
