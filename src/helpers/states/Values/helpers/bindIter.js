import bindFields from './bindFields';

export default function bindIter(field, bindTo, newState) {
  if (!newState[bindTo]) {
    console.error(`Incorrect binding of '${name}': no such field ${bindTo}`);
    return;
  }

  bindFields(
    field,
    newState[bindTo],
    (one) => (newState[field.name] = one),
    (two) => (newState[bindTo] = two),
  );
}
