import controlInputProps from '../controlInputProps';
import createInputProps from '../createInputProps';

export default function useCreateInputs(
  updateValueCallback,
  highlightInput,
  notifications,
  unloadProps,
  updateProps,
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

    Object.entries(inputsData).forEach(
      controlInputProps(inputsProps, inputsData),
    );

    Object.entries(inputsData).forEach(([name, { hidden }]) => {
      if (hidden === true) {
        unloadProps(name);
      } else {
        updateProps();
      }
    });

    return inputsData;
  };
}
