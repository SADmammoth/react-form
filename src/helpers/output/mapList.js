import createInput from '../states/createInput';

export default function mapList(
  inputs,
  values,
  updateValueCallback,
  additionalFields,
) {
  return [...Object.values(inputs || {})]
    .filter(({ hidden }) => !hidden)
    .map((props) =>
      createInput(props, values, updateValueCallback, additionalFields),
    );
}
