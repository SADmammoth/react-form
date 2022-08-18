import { InputsProps } from './InputsProps/InputsProps';

export type StylesData<Props extends InputsProps> = {
  [name in keyof Props]: Props[name]['type'];
};
