/* eslint-disable no-use-before-define */
const init = { inputs: {}, values: {} };
const actionTypes = {
  UPDATE_INPUT: 'UPDATE_INPUT',
  UPDATE_VALUE: 'UPDATE_VALUE',
  CREATE_INPUTS: 'CREATE_INPUTS',
  CREATE_VALUES: 'CREATE_VALUES',
  HIGHLIGHT_INPUT: 'HIGHLIGHT_INPUT',
  UNHIGHLIGHT_INPUT: 'UNHIGHLIGHT_INPUT',
  RESET_FORM: 'RESET_FORM',
};

const formReducer =
  (updateInput, updateValue, createInputs, createValues) =>
  (state, { type, data }) => {
    const { inputs, values } = state;
    switch (type) {
      case actionTypes.UPDATE_INPUT:
        return {
          ...state,
          inputs: {
            ...updateInput(
              data.inputsProps,
              data.value,
              data.name,
              values,
              inputs,
            ),
          },
        };
      case actionTypes.UPDATE_VALUE:
        return {
          ...state,
          values: {
            ...values,
            ...updateValue(data.name, values, data.value),
          },
        };
      case actionTypes.CREATE_INPUTS:
        return {
          ...state,
          inputs: createInputs(data.inputsProps, values),
        };
      case actionTypes.CREATE_VALUES:
        return { values: createValues(data.inputsProps, values) };
      case actionTypes.HIGHLIGHT_INPUT:
        return {
          ...state,
          values: {
            ...state.values,
            ...highlightInput(data.name, values[data.name]),
          },
        };
      case actionTypes.UNHIGHLIGHT_INPUT:
        return {
          ...state,
          values: {
            ...state.values,
            ...unhighlightInput(data.name, values[data.name]),
          },
        };
      case actionTypes.RESET_FORM:
        return reset(data.inputsProps, values, inputs);
      default:
        return state;
    }
  };

function highlightInput(name, input) {
  return { [name]: { ...input, invalid: true } };
}

function unhighlightInput(name, input) {
  return { [name]: { ...input, invalid: false } };
}

const findProp = (props, name) =>
  props.find(({ name: candidate }) => name === candidate);

function reset(inputsProps, values, inputs) {
  return {
    values: Object.fromEntries(
      Object.entries(values).map(([name, { value, ...rest }]) => {
        const prop = findProp(inputsProps, name);
        return [
          name,
          {
            value: prop.defaultValue || prop.value,
            ...rest,
          },
        ];
      }),
    ),
    inputs: Object.fromEntries(
      Object.entries(inputs).map(([name, { value, ...rest }]) => {
        const prop = findProp(inputsProps, name);
        return [
          name,
          {
            value: prop.defaultValue || prop.value,
            ...rest,
          },
        ];
      }),
    ),
  };
}

export default formReducer;

const actions = {
  updateInput: (name, value, inputsProps) => ({
    type: actionTypes.UPDATE_INPUT,
    data: { name, value, inputsProps },
  }),
  updateValue: (name, value) => ({
    type: actionTypes.UPDATE_VALUE,
    data: { name, value },
  }),
  createInputs: (inputsProps) => ({
    type: actionTypes.CREATE_INPUTS,
    data: { inputsProps },
  }),
  createValues: (inputsProps) => ({
    type: actionTypes.CREATE_VALUES,
    data: { inputsProps },
  }),
  highlightInput: (name) => ({
    type: actionTypes.HIGHLIGHT_INPUT,
    data: { name },
  }),
  unhighlightInput: (name) => ({
    type: actionTypes.UNHIGHLIGHT_INPUT,
    data: { name },
  }),
  resetForm: (inputsProps) => ({
    type: actionTypes.RESET_FORM,
    data: { inputsProps },
  }),
};

export { init, actionTypes, actions };