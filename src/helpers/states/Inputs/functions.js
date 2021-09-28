import { omit } from 'lodash-es';

function init({ inputsProps }) {
  const state = {};

  //TODO Add filter

  inputsProps.forEach((input) => {
    state[input.name] = {
      ...omit(input, ['value', 'defaultValue']),
    };
  });

  //TODO Add control

  return state;
}

export { init };
