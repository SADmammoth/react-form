import getConverters from '../../states/getConverters';

export default function formatFormValues(values, inputs) {
  const formattedValues = {};
  let input;

  Object.entries(values).forEach(([name, valueItem]) => {
    input = inputs[name];
    if (!input) return;
    const { group, hidden } = input;
    if (hidden) return;

    const converter = getConverters(input.converters).out;

    if (group) {
      formattedValues[group.id] = {
        $title: group.title,
        ...formattedValues[group.id],
        [name]: converter(valueItem.value),
      };
    } else {
      formattedValues[name] = converter(valueItem.value);
    }

    if (valueItem.defaultValue) {
      formattedValues[`${name}_default`] = converter(valueItem.defaultValue);
    }
  });

  return formattedValues;
}
