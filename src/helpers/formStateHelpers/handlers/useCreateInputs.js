import createInputProps from '../createInputProps';

export default function useCreateInputs(
  updateValueCallback,
  highlightInput,
  notifications,
  inputAdditionalFields,
) {
  return (inputsProps, valuesState) => {
    if (!Object.keys(valuesState).length) {
      return {};
    }

    const inputsData = {};

    inputsProps.forEach(({ group, ...props }) => {
      const inputProps = createInputProps(
        props,
        updateValueCallback,
        valuesState,
        highlightInput,
        notifications,
        inputAdditionalFields,
      );
      inputsData[props.name] = inputProps;
    });

    Object.entries(inputsData).forEach(([name, input]) => {
      if (input.control && inputsData[input.control.field]) {
        // if (!valuesData[input.bind].bind) {
        //   valuesData[input.bind].bind = [input.name];
        // } else {
        //   valuesData[input.bind].bind.push(input.name);
        // }
        console.log(input.value);
        if (input.control.map[input.value] !== undefined) {
          console.log(inputsData[input.control.field][input.control.prop]);
          inputsData[input.control.field][input.control.prop] =
            input.control.map[input.value];
        }
        console.log('AHHHHHHHHHHHHHHHHHHHHHHHHH');
      }
    });

    return inputsData;
  };
}
