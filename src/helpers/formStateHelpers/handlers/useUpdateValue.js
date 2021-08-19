export default function useUpdateValue() {
  return (name, valuesState, newValue) => {
    console.log(name, valuesState);
    const valueItem = valuesState[name];

    if (valueItem && valueItem.bind) {
      const newValues = { [name]: { ...valueItem, value: newValue } };
      valueItem.bind.forEach((valueName) => {
        newValues[valueName] = {
          ...valuesState[valueName],
          value: newValue,
        };
      });

      return newValues;
    }
    return {
      [name]: { ...valueItem, value: newValue },
    };
  };
}
