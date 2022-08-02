import { InputPropsByType } from '../InputsProps/InputProps';
import { InputsProps } from '../InputsProps/InputsProps';
import { IGroup } from '../InputsProps/atomic/IGroup';
import { Validators } from '../InputsProps/atomic/ValidatorProps';

export type ValueState<Props extends InputsProps, Name extends keyof Props> = {
  value: InputPropsByType[Props[Name]['type']]['value'];
  group: IGroup;
} & Partial<Validators>;
