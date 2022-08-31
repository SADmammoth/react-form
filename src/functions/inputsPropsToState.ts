import { applyNativeValidator } from '../helpers/applyNativeValidator';
import { InputPropsIntersection } from '../types/InputsProps/InputProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputType } from '../types/InputsProps/atomic/InputType';
import { InputsState } from '../types/State/InputsState';
import { ValuesState } from '../types/State/ValuesState';
import { getValidatorByKey } from './getValidatorByKey';

export function inputsPropsToStates<InitInputsProps extends InputsProps>(
  props: InitInputsProps,
): [InputsState<InitInputsProps>, ValuesState<InitInputsProps>] {
  let inputsState: Record<string, any> = {};
  let valuesState: Record<string, any> = {};

  const propsEntries = Object.entries(props);

  for (let i = 0; i < propsEntries.length; i++) {
    const [name, inputProps] = propsEntries[i] as [
      name: string,
      inputProps: InputPropsIntersection,
    ];

    const {
      type,
      value,
      validator,
      byCharValidator,
      bind,
      control,
      ...otherInputProps
    } = inputProps;

    inputsState[name] = { type, ...otherInputProps };

    valuesState[name] = {
      value,
      validator: applyNativeValidator(
        type as InputType,
        typeof validator === 'string'
          ? getValidatorByKey(validator)
          : validator,
      ),
      byCharValidator: applyNativeValidator(
        type as InputType,
        typeof byCharValidator === 'string'
          ? getValidatorByKey(byCharValidator)
          : byCharValidator,
      ),
      bind,
      control,
    };
  }

  return [
    inputsState as InputsState<InitInputsProps>,
    valuesState as ValuesState<InitInputsProps>,
  ];
}
