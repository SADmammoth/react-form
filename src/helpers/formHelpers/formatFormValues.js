import mapGroups from './mapGroups';

export default function formatFormValues(stateValues, inputsProps) {
  const values = {};
  Object.entries(stateValues).forEach(([name, valueItem]) => {
    values[name] = valueItem.value;

    values[name] = valueItem.value;
    if (valueItem.defaultValue) {
      values[`${name}_default`] = valueItem.defaultValue;
    }
  });
  return mapGroups(values, inputsProps);
}
