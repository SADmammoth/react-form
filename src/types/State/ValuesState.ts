import { InputsProps } from '../InputsProps/InputsProps';
import { ValueState } from './ValueState';

export type ValuesState<Props extends InputsProps> = {
  [name in keyof Props]: ValueState<Props, name>;
};
