import createInput from '@/helpers/states/helpers/createInput';
import InputsProps from '../types/InputsProps';
import {
  InputsState,
  InputType,
  SharedInputProps,
  ValuesState,
} from '../types/basic';

export default function mapList(
  inputs: InputsState,
  values: ValuesState,
  sharedInputProps: SharedInputProps,
) {
  return [...Object.values(inputs || {})]
    .filter(
      ({ hidden, type, loaded }) =>
        !hidden && (type !== InputType.Subform || !loaded),
    )
    .map((props) => createInput(props, values, sharedInputProps));
}
