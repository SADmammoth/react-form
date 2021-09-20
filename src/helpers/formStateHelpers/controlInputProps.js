import { includes, isArray } from 'lodash-es';

const controlInputProps =
  (inputProps, inputsData) =>
  ([name, input]) => {
    const controlTarget = (target, [name, input], depth = 3) => {
      if (inputsData[target]) {
        if (isArray(input.value)) {
          const avaliableValues = Object.keys(input.control.map);
          const common = input.value.find((x) =>
            includes(avaliableValues, x.value || x),
          );

          if (common) {
            console.log(target);
            inputsData[target][input.control.prop] = input.control.map[common];
            return;
          }
        }

        if (input.control.map[input.value] !== undefined) {
          inputsData[target][input.control.prop] =
            input.control.map[input.value];
          return;
        }

        if (input.control.map['*'] !== undefined) {
          inputsData[target][input.control.prop] = input.control.map['*'];
          return;
        }
      }

      if (depth > 0 && input.control.group) {
        const inGroup = inputProps
          .filter(({ group }) => group?.id === input.control.group)
          .map(({ name }) => name);
        console.log(inGroup);
        inGroup.forEach((target) =>
          controlTarget(target, [name, input], depth--),
        );
      }
      return;
    };

    if (input.control) {
      controlTarget(input.control.field, [name, input]);
    } else if (input.control) {
      console.error(
        `Incorrect control by '${name}': no such field '${input.control.field}'`,
      );
    }
  };

export default controlInputProps;
