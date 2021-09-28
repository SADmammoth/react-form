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

function setInvalid(state, { name }) {
  if (!name) throw new Error('Invalid name parameter');
  return { ...state, [name]: { ...state[name], invalid: true } };
}

function unsetInvalid(state, { name }) {
  if (!name) throw new Error('Invalid name parameter');
  return { ...state, [name]: { ...state[name], invalid: false } };
}

export { init, setInvalid, unsetInvalid };
