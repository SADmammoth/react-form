import { InputPropsByType } from './InputProps';
import { InputsProps, TypeByName } from './InputsProps';

export type InputPropValueType<
  Props extends InputsProps,
  Name extends keyof Props,
> = InputPropsByType[TypeByName<Props>[Name]]['value'];
