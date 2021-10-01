import { omit } from 'lodash-es';
import checkFormNames from '@/helpers/checkFormNames';

function init({ inputsProps }) {
  const state = {};

  const duplicateNames = checkFormNames(inputsProps);

  if (duplicateNames) {
    console.error(`Duplicate names ${duplicateNames} at inputs configuration`);
    return state;
  }

  inputsProps.forEach((input) => {
    state[input.name] = {
      ...input,
    };
  });

  return state;
}

function put(state, { name, props }) {
  return {
    ...state,
    [name]: {
      ...state[name],
      ...props,
    },
  };
}

function setInvalid(state, { name }) {
  if (!name) throw new Error('Invalid name parameter');
  return { ...state, [name]: { ...state[name], invalid: true } };
}

function unsetInvalid(state, { name }) {
  if (!name) throw new Error('Invalid name parameter');
  return { ...state, [name]: { ...state[name], invalid: false } };
}

export { init, setInvalid, unsetInvalid, put };
