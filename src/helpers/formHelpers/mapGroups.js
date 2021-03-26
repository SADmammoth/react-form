export default function mapGroups(inputs, inputsProps) {
  const inputsGroups = {};
  inputsProps.forEach((input) => {
    if (input.group) {
      if (!inputsGroups[input.group.id]) {
        inputsGroups[input.group.id] = {
          $title: input.group.title,
          [input.name]: inputs[input.name],
        };
      } else {
        inputsGroups[input.group.id][input.name] = inputs[input.name];
      }
    } else {
      inputsGroups[input.name] = inputs[input.name];
    }
  });

  return inputsGroups;
}
