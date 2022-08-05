import { InputComponentProps } from './InputsComponentsProps/InputsComponentsProps';
import { InputPropsByType } from './InputsProps/InputProps';
import { InputsProps } from './InputsProps/InputsProps';

export type InputComponent<
  Props extends InputsProps,
  Type extends keyof InputPropsByType,
> = React.ComponentType<InputComponentProps<Props, Type>>;
