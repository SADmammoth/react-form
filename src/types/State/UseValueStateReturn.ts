import { InputsProps } from '../InputsProps/InputsProps';
import { SetValueCallback } from '../SetValueCallback';
import { UpdateValueCallback } from '../UpdateValueCallback';
import { ValuesState } from './ValuesState';

export type UseValuesStateReturn<Props extends InputsProps> = [
  values: ValuesState<Props>,
  updateValue: UpdateValueCallback<Props>,
  setValue: SetValueCallback<Props>,
];
