import { InputsProps } from '../InputsProps/InputsProps';

export type InputState<
  Props extends InputsProps,
  Name extends keyof Props,
> = Omit<
  Props[Name],
  | 'value'
  | 'validator'
  | 'byCharValidator'
  | 'control'
  | 'bind'
  | 'group'
  | 'converters'
>;
