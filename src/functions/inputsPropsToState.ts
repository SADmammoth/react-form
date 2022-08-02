import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputsState } from '../types/State/InputsState';
import { ValuesState } from '../types/State/ValuesState';

export function inputsPropsToStates<InitInputsProps extends InputsProps>(
  props: InitInputsProps,
): [InputsState<InitInputsProps>, ValuesState<InitInputsProps>] {
  return [] as unknown as [
    InputsState<InitInputsProps>,
    ValuesState<InitInputsProps>,
  ];
}
