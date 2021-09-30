import { includes, isArray } from 'lodash-es';

const controlInputProps = (name, input, inputProps, put) => {
  /**********************************************/
  const controlTarget = (target, control, name, input, depth = 3) => {
    if (inputProps[target]) {
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
      const inGroup = inputProps
        .filter(({ group }) => group?.id === control.group)
        .map(({ name }) => name);

      inGroup.forEach((target) =>
        controlTarget(target, control, [name, input], depth--),
      );
      return;
    }

    console.error(
      `Incorrect control by '${name}': no such field '${input.control.field}'`,
    );
  };

  /**********************************************/

  if (input.control) {
    if (isArray(input.control)) {
      input.control.forEach((control) =>
        controlTarget(control.field, control, name, input),
      );
      return;
    }

    controlTarget(input.control.field, input.control, name, input);
    return;
  }
};

export default controlInputProps;
