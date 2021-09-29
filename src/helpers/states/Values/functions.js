import getConverters from '../../getConverters';
import bind from './helpers/bind';
import setFormDefaultValue from './helpers/setFormDefaultValue';

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
  console.log(name, value);
  console.log('beforebind', { ...state, [name]: { ...state[name], value } });
  return bind({
    ...state,
    [name]: { ...state[name], updatedAt: Date.now(), value },
  });
}

export { init, put };
