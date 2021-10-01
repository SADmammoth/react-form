export default function checkFormNames(inputs) {
  for (let i = 0; i < inputs.length; i += 1) {
    if (
      inputs
        .slice(i + 1)
        .find((anotherInput) => inputs[i].name === anotherInput.name)
    ) {
      return inputs[i].name;
    }
  }
  return null;
}
