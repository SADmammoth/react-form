import getConverters from '../../getConverters';
import setFormDefaultValue from './helpers/setFormDefaultValue';

function init({ inputsProps }) {
  const state = {};

  inputsProps.forEach((input) => {
    state[input.name] = {
      value: getConverters(input.converters).in(
        input.defaultValue || input.value,
      ),
      defaultValue: input.defaultValue && [...input.defaultValue],
    };
  });

  //TODO Add bind

  return state;
}

function put(state, { name, value }) {
  //TODO Add bind
  return { ...state, [name]: { ...state[name], value } };
}

export { init, put };
