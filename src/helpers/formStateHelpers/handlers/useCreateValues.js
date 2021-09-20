import convertersMap from '@/Validator/convertersMap';
import setFormDefaultValue from '@/formHelpers/setFormDefaultValue';

export default function useCreateValues() {
  return (inputsProps, valuesState) => {
    const valuesData = {};
    inputsProps.forEach((input) => {
      let convertersFromMap = input.converters || {
        in: (a) => a,
        out: (b) => b,
      };

      if (typeof input.converters === 'string') {
        convertersFromMap = convertersMap[input.converters];
      }
      valuesData[input.name] = {
        ...valuesData[input.name],
        id: input.name,
        value: convertersFromMap.in(input.defaultValue || input.value),
        required: input.required,
        defaultValue: setFormDefaultValue(valuesState, input),
        group: input.group,
        converters: convertersFromMap,
      };
      if (input.bind && valuesData[input.bind]) {
        if (!valuesData[input.bind].bind) {
          valuesData[input.bind].bind = [input.name];
        } else {
          valuesData[input.bind].bind.push(input.name);
        }
      } else if (input.bind) {
        console.error(
          `Incorrect binding of '${input.name}': no such field ${input.bind}`,
        );
      }
    });

    return { ...valuesState, ...valuesData };
  };
}
