import { InputProps, InputPropsByType } from './InputProps';

export type InputsProps<Names extends keyof any> = {
  [name in Names]: InputProps;
};

export type TypeByName<
  Names extends keyof any,
  Props extends InputsProps<Names>,
> = {
  [name in Names]: Props[name]['type'];
};
