import { isEmpty } from 'lodash-es';
import createInput from '@/helpers/states/helpers/createInput';
import {
  InputsGroups,
  InputsState,
  InputType,
  SharedInputProps,
  ValuesState,
} from '../types/basic';

export default function mapGroups(
  inputs: InputsState,
  values: ValuesState,
  sharedInputProps: SharedInputProps,
): InputsGroups {
  const inputsGroups: InputsGroups = {};

  if (!inputs || isEmpty(inputs)) return {};

  Object.values(inputs).forEach((input) => {
    if (
      inputs[input.name]?.hidden ||
      (inputs[input.name].type === InputType.Subform &&
        inputs[input.name].loaded)
    )
      return;
    if (input.group) {
      if (!inputsGroups[input.group.id]) {
        inputsGroups[input.group.id] = {
          $title: input.group.title,
          [input.name]: createInput(input, values, sharedInputProps),
        } as InputsGroups[keyof InputsGroups];
        return;
      }

      (inputsGroups[input.group.id] as Record<string, unknown>)[input.name] =
        createInput(input, values, sharedInputProps);
      return;
    }

    inputsGroups[input.name] = createInput(input, values, sharedInputProps);
  });

  return inputsGroups;
}
