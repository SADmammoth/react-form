import getConverters from '../getConverters';
import bind from './helpers/bind';

function init({ inputsProps }) {
  const state = {};

  inputsProps.forEach((input) => {
    state[input.name] = {
      value: getConverters(input.converters).in(
        input.defaultValue || input.value,
      ),
      defaultValue: input.defaultValue && [...input.defaultValue],
      bind: input.bind,
      updatedAt: Date.now(),
    };
  });

  return bind(state);
}

function put(state, { name, value }) {
  if (value === state[name]?.value) return state;
  return bind({
    ...state,
    [name]: { ...state[name], updatedAt: Date.now(), value },
  });
}

export { init, put };
