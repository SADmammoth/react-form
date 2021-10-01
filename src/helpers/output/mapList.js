import createInput from '@/stateHelpers/helpers/createInput';

export default function mapList(
  inputs,
  values,
  updateValueCallback,
  additionalFields,
) {
  return [...Object.values(inputs || {})]
    .filter(({ hidden, type }) => !hidden && type !== 'subform')
    .map((props) =>
      createInput(props, values, updateValueCallback, additionalFields),
    );
}
