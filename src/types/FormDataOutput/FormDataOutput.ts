import { InputPropsByType } from '../InputsProps/InputProps';
import { InputsProps, TypeByName } from '../InputsProps/InputsProps';

export type InputsData<Props extends InputsProps> = {
  [name in keyof Props]?: InputPropsByType[TypeByName<Props>[name]]['value'];
};

export type FormDataOutput<Props extends InputsProps> = InputsData<Props>;
