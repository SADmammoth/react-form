import InputsProps from './types/InputsProps';

export default function checkFormNames(inputs: InputsProps): string | null {
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
