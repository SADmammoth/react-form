import { InputProps, InputPropsByType } from './InputProps';

export type InputsProps = {
  [name: string]: InputProps;
};

export type TypeByName<Props extends InputsProps> = {
  [name in keyof Props]: Props[name]['type'];
};
