import getConverters from '../../getConverters';

export default function formatFormValues(values, inputs) {
  const formattedValues = {};
  let input;

  Object.entries(values).forEach(([name, valueItem]) => {
    input = inputs[name];

    const { group } = input;
    const converter = getConverters(input).out;

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
