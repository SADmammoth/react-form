import { includes, isArray } from 'lodash-es';
import { InputProps } from '@/helpers/types/InputsProps';
import { ControlProps, InputState } from '@/helpers/types/basic';

const controlInputProps = (
  name: string,
  input: InputState,
  inputProps: InputState,
  put: (name: string, prop: { [propName: string]: any }) => void,
) => {
  /** ******************************************* */
  const controlTarget = (
    target: keyof InputState,
    control: ControlProps,
    name: string,
    input: InputState,
    depth = 3,
  ) => {
    if (inputProps[target]) {
      if (control.map instanceof Function) {
        put(target, { [control.prop]: control.map(input.value) });
        return;
      }
      if (isArray(input.value)) {
        const avaliableValues = Object.keys(control.map);
        const common = input.value.find((x) =>
          includes(avaliableValues, x.value || x),
        );

        if (common) {
          put(target, { [control.prop]: control.map[common] });
          return;
        }
      }

      if (control.map[input.value] !== undefined) {
        put(target, { [control.prop]: control.map[input.value] });
        return;
      }

      if (control.map['*'] !== undefined) {
        put(target, { [control.prop]: control.map['*'] });
        return;
      }
    }

    if (depth > 0 && control.group) {
      const inGroup = Object.values(inputProps)
        .filter(({ group }) => group?.id === control.group)
        .map(({ name }) => name);

      inGroup.forEach((target) =>
        controlTarget(target, control, name, input, depth - 1),
      );
      return;
    }

    console.error(
      `Incorrect control by '${name}': no such field '${input?.control?.field}'`,
    );
  };

  /** ******************************************* */

  if (input.control) {
    if (isArray(input.control)) {
      input.control.forEach((control) =>
        controlTarget(control.field, control, name, input),
      );
      return;
    }

    controlTarget(
      input.control.field as keyof InputState,
      input.control,
      name,
      input,
    );
  }
};

export default controlInputProps;
