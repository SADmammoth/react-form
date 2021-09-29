import bindFields from './bindFields';

export default function bind(state) {
  const newState = { ...state };

  Object.keys(state).forEach((name) => {
    const field = newState[name];
    if (field.bind) {
      const boundField = newState[field.bind];
      if (!boundField) {
        console.error(
          `Incorrect binding of '${name}': no such field ${field.bind}`,
        );
        return;
      }
      bindFields(
        field,
        boundField,
        (one) => (newState[name] = one),
        (two) => (newState[field.bind] = two),
      );
      console.log('newstate', { ...newState });
    }
  });
  console.log('newstate', newState);
  return newState;
}
