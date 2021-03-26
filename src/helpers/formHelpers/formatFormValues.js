import mapGroups from './mapGroups';

export default function formatFormValues(stateValues, inputsProps) {
  const values = {};
  Object.entries(stateValues).forEach(([name, valueItem]) => {
    const group = valueItem.group;

    if (group) {
      values[group] = { ...values[group], [name]: valueItem.value };
    } else {
      values[name] = valueItem.value;
    }

    if (valueItem.defaultValue) {
      values[`${name}_default`] = valueItem.defaultValue;
    }
  });
  return mapGroups(values, inputsProps);
}
