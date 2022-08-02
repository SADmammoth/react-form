import { InputsComponentsProps } from './InputsComponentsProps/InputsComponentsProps';
import { InputPropValueType } from './InputsProps/InputPropValueType';
import { InputPropsByType } from './InputsProps/InputProps';
import { InputsProps } from './InputsProps/InputsProps';

export type UseInputsReturn<Props extends InputsProps> = {
  inputs: {
    [name in keyof Props]: InputsComponentsProps<Props>;
  };
  setValue: <Name extends keyof Props>(
    name: Name,
    value: InputPropValueType<Props, Name>,
  ) => boolean;
  setInputProps: <Name extends keyof Props>(
    name: Name,
    props: Partial<InputPropsByType[Props[Name]['type']]>,
  ) => boolean;
};
