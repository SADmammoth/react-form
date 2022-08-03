import { InputPropsByType } from './InputsProps/InputProps';
import { InputsProps } from './InputsProps/InputsProps';

export type UpdateInputCallback<Props extends InputsProps> = <
  Name extends keyof Props,
  NewInputProps extends Partial<InputPropsByType[Props[Name]['type']]>,
>(
  name: Name,
  props: NewInputProps,
) => void;
