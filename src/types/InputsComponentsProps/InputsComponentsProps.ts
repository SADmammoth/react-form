import { InputPropsByType } from '../InputsProps/InputProps';
import { InputsProps } from '../InputsProps/InputsProps';
import { CommonInputsComponentsProps } from './CommonInputsComponentsProps';

export type InputsComponentsProps<Props extends InputsProps> = {
  [name in keyof Props]: InputPropsByType[Props[name]['type']] &
    CommonInputsComponentsProps<Props> & { name: string };
};
