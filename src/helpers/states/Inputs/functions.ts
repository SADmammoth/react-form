import { omit } from 'lodash-es';
import checkFormNames from '@/helpers/checkFormNames';
import { InputsState } from '@/helpers/types/basic';
import { ActionDataType } from './actions';

function init({ inputsProps }: ActionDataType) {
  const state: InputsState = {};

  const duplicateNames = checkFormNames(inputsProps);

  if (duplicateNames) {
    console.error(`Duplicate names ${duplicateNames} at inputs configuration`);
    return state;
  }

  let value, defaultValue, inputState;

  inputsProps.forEach((input) => {
    ({ value, defaultValue, ...inputState } = input);
    state[input.name] = inputState;
  });

  return state;
}

function put(state: InputsState, { name, props }: ) {
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
