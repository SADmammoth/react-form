import {
  InputProps,
  InputPropsIntersection,
} from '../types/InputsProps/InputProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
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
      value,
      validator,
      byCharValidator,
      bind,
      control,
      ...otherInputProps
    } = inputProps;

    inputsState[name] = otherInputProps;

    valuesState[name] = {
      value,
      validator:
        typeof validator === 'string'
          ? getValidatorByKey(validator)
          : validator,
      byCharValidator:
        typeof byCharValidator === 'string'
          ? getValidatorByKey(byCharValidator)
          : byCharValidator,
      bind,
      control,
    };
  }

  return [
    inputsState as InputsState<InitInputsProps>,
    valuesState as ValuesState<InitInputsProps>,
  ];
}
