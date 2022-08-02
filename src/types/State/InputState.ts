import { InputPropsByType } from '../InputsProps/InputProps';
import { InputsProps } from '../InputsProps/InputsProps';

export type InputState<
  Props extends InputsProps,
  Name extends keyof Props,
> = Omit<
  InputPropsByType[Props[Name]['type']],
  | 'value'
  | 'validator'
  | 'byCharValidator'
  | 'control'
  | 'bind'
  | 'group'
  | 'converters'
>;
