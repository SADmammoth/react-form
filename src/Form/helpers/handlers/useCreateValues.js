import setFormDefaultValue from '../../../helpers/formHelpers/setFormDefaultValue';

export default function useCreateValues() {
  return (inputsProps, valuesState) => {
    const valuesData = {};
    inputsProps.forEach((input) => {
      valuesData[input.name] = {
        ...valuesData[input.name],
        id: input.name,
        value: input.defaultValue || input.value,
        required: input.required,
        defaultValue: setFormDefaultValue(valuesState, input),
        group: input.group,
      };
      if (input.bind && valuesData[input.bind])
        !valuesData[input.bind].bind
          ? (valuesData[input.bind].bind = [input.name])
          : valuesData[input.bind].bind.push(input.name);
    });

    return { ...valuesState, ...valuesData };
  };
}
