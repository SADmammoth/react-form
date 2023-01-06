import { InputComponent } from './InputComponent';
import { InputPropsByType } from './InputsProps/InputProps';
import { InputsProps } from './InputsProps/InputsProps';

export type RegisteredInputsMap<Props extends InputsProps = InputsProps> = {
  [typeKey in keyof InputPropsByType]?: InputComponent<Props, typeKey>;
};
