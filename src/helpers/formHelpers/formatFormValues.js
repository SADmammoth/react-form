import mapGroups from './mapGroups';

export default function formatFormValues(stateValues, inputsProps) {
  const values = {};

  Object.entries(stateValues).forEach(([name, valueItem]) => {
    const group = valueItem.group;
    const converter = valueItem.converters.out;

    if (group) {
      values[group.id] = {
        $title: group.title,
        ...values[group.id],
        [name]: converter(valueItem.value),
      };
    } else {
      values[name] = converter(valueItem.value);
    }

    if (valueItem.defaultValue) {
      values[`${name}_default`] = converter(valueItem.defaultValue);
    }
  });
  return values;
}
