import { InputProps } from '../InputsProps/InputProps';

export interface IInputState
  extends Omit<InputProps, 'value' | 'validator' | 'byCharValidator'> {}
