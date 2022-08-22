import { InputPropValueType } from './InputsProps/InputPropValueType';
import { InputsProps } from './InputsProps/InputsProps';

export type UpdateValueCallback<Props extends InputsProps> = <
  Name extends keyof Props,
  Value = InputPropValueType<Props, Name>,
>(
  name: Name,
  value: Value,
) => Value | undefined;
