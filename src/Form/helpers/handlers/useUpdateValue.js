export default function useUpdateValue() {
  return (name, valuesState, newValue) => {
    let valueItem = valuesState[name];

    if (valueItem && valueItem.bind) {
      let newValues = { [name]: { ...valueItem, value: newValue } };
      valueItem.bind.forEach(
        (name) => (newValues[name] = { ...valuesState[name], value: newValue })
      );

      return newValues;
    }
    return { [name]: { ...valueItem, value: newValue } };
  };
}
