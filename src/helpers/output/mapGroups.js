import { isEmpty } from 'lodash-es';
import createInput from '@/stateHelpers/helpers/createInput';

export default function mapGroups(inputs, values, additionalFields) {
  const inputsGroups = {};

  if (!inputs || isEmpty(inputs)) return inputs;

  Object.values(inputs).forEach((input) => {
    if (inputs[input.name]?.hidden) return;
    if (input.group) {
      if (!inputsGroups[input.group.id]) {
        inputsGroups[input.group.id] = {
          $title: input.group.title,
          [input.name]: createInput(input, values, additionalFields),
        };
        return;
      }

      inputsGroups[input.group.id][input.name] = createInput(
        input,
        values,
        additionalFields,
      );
      return;
    }

    inputsGroups[input.name] = createInput(input, values, additionalFields);
  });

  return inputsGroups;
}
