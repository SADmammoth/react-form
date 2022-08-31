import { StyleByType } from '../../helpers/getStyleByType';
import { InputPropsByType } from '../InputsProps/InputProps';
import { InputsProps } from '../InputsProps/InputsProps';
import { CommonInputsComponentsProps } from './CommonInputsComponentsProps';

export type InputsComponentsProps<Props extends InputsProps> = {
  [name in keyof Props]: InputComponentProps<Props, Props[name]['type']>;
};

export type InputComponentProps<
  Props extends InputsProps,
  Type extends keyof InputPropsByType,
> = InputPropsByType[Type] &
  CommonInputsComponentsProps<Props> & {
    name: string;
    value: InputPropsByType[Type]['value'];
    type: Type;

    style?: StyleByType[Type];
  };
