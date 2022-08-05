import { CommonInputsComponentsProps } from '../types/InputsComponentsProps/CommonInputsComponentsProps';
import { InputsComponentsProps } from '../types/InputsComponentsProps/InputsComponentsProps';
import { InputsProps } from '../types/InputsProps/InputsProps';
import { InputsState } from '../types/State/InputsState';
import { ValuesState } from '../types/State/ValuesState';

export function stateToInputsComponentsProps<Props extends InputsProps>(
  inputsState: InputsState<Props>,
  valuesState: ValuesState<Props>,
  commonProps: CommonInputsComponentsProps<Props>,
): InputsComponentsProps<Props> {
  return Object.fromEntries(
    Object.entries(inputsState).map(([name, inputState]) => {
      return [
        name,
        { ...inputState, ...commonProps, name, value: valuesState[name].value },
      ];
    }),
  ) as InputsComponentsProps<Props>;
}
