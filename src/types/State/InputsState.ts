import { InputsProps } from '../InputsProps/InputsProps';
import { InputState } from './InputState';

export type InputsState<Props extends InputsProps> = {
  [name in keyof Props]: InputState<Props, name>;
};
