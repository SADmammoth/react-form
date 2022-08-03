import { InputPropValueType } from '../InputsProps/InputPropValueType';
import { InputsProps, TypeByName } from '../InputsProps/InputsProps';

export type InputsData<Props extends InputsProps> = {
  [name in keyof Props]?: InputPropValueType<Props, name>;
};

export type FormDataOutput<Props extends InputsProps> = InputsData<Props>;
