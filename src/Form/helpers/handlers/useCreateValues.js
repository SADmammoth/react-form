import setFormDefaultValue from '../../../helpers/formHelpers/setFormDefaultValue';
import convertersMap from '../../../Validator/convertersMap';

export default function useCreateValues() {
  return (inputsProps, valuesState) => {
    const valuesData = {};
    inputsProps.forEach((input) => {
      let convertersFromMap = input.converters;

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
      if (input.bind && valuesData[input.bind])
        !valuesData[input.bind].bind
          ? (valuesData[input.bind].bind = [input.name])
          : valuesData[input.bind].bind.push(input.name);
    });

    return { ...valuesState, ...valuesData };
  };
}
