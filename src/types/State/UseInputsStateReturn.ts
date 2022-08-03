import { InputPropsByType } from '../InputsProps/InputProps';
import { InputsProps } from '../InputsProps/InputsProps';
import { UpdateInputCallback } from '../UpdateInputCallback';
import { InputsState } from './InputsState';

export type UseInputsStateReturn<Props extends InputsProps> = [
  inputs: InputsState<Props>,
  updateInput: UpdateInputCallback<Props>,
];
