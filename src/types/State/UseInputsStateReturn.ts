import { InputPropsByType } from '../InputsProps/InputProps';
import { InputsProps } from '../InputsProps/InputsProps';
import { InputsState } from './InputsState';

export type UseInputsStateReturn<Props extends InputsProps> = [
  inputs: InputsState<Props>,
  updateInput: <Name extends keyof Props>(
    name: Name,
    props: Partial<InputPropsByType[Props[Name]['type']]>,
  ) => void,
];
