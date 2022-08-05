import { InputComponentProps } from './InputsComponentsProps/InputsComponentsProps';
import { InputPropValueType } from './InputsProps/InputPropValueType';
import { InputProps, InputPropsByType } from './InputsProps/InputProps';
import { InputsProps } from './InputsProps/InputsProps';

export type StatefullInputProps<Type extends keyof InputPropsByType> =
  InputComponentProps<InputsProps, Type> & {
    name: string;
    type: Type;
    onChange?: (value: InputPropsByType[Type]['value']) => {};
    onInput?: (value: InputPropsByType[Type]['value']) => {};
  };
