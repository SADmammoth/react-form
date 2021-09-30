import bindFields from './bindFields';

export default function bindIter(name, field, bindTo, newState) {
  if (!newState[bindTo]) {
    console.error(`Incorrect binding of '${name}': no such field ${bindTo}`);
    return;
  }

  bindFields(
    { ...field, name },
    { ...newState[bindTo], name: bindTo },
    (one) => {
      newState[name] = one;
    },
    (two) => {
      newState[bindTo] = two;
    },
  );
}
