import { InputPropValueType } from './InputsProps/InputPropValueType';
import { InputsProps } from './InputsProps/InputsProps';

export type SetValueCallback<Props extends InputsProps> = <
  Name extends keyof Props,
  Value extends InputPropValueType<Props, Name>,
>(
  name: Name,
  value: Value,
) => boolean;
