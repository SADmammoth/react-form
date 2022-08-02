import { InputPropValueType } from '../InputsProps/InputPropValueType';
import { InputPropsByType } from '../InputsProps/InputProps';
import { InputsProps } from '../InputsProps/InputsProps';
import { ControlProps } from '../InputsProps/atomic/ControlProps';
import { Validators } from '../InputsProps/atomic/ValidatorProps';

export type ValueState<Props extends InputsProps, Name extends keyof Props> = {
  value: InputPropValueType<Props, Name>;
  control: ControlProps;
  bind: unknown; //TODO
} & Partial<Validators>;
