const init = { inputs: {}, values: {} };
const actionTypes = {
  UPDATE_INPUT: 'UPDATE_INPUT',
  UPDATE_VALUE: 'UPDATE_VALUE',
  CREATE_INPUTS: 'CREATE_INPUTS',
  CREATE_VALUES: 'CREATE_VALUES',
  HIGHLIGHT_INPUT: 'HIGHLIGHT_INPUT',
  UNHIGHLIGHT_INPUT: 'UNHIGHLIGHT_INPUT',
};

const formReducer = (
  updateInput,
  updateValue,
  createInputs,
  createValues,
  onInputsUpdate
) => (state, { type, data }) => {
  let { inputs, values } = state;

  switch (type) {
    case actionTypes.UPDATE_INPUT:
      return {
        ...state,
        inputs: {
          ...updateInput(data.inputsProps, data.name, values, inputs),
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
        inputs: createInputs(data.inputsProps, values, onInputsUpdate),
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

export default formReducer;

const actions = {
  updateInput: (name, value) => ({
    type: actionTypes.UPDATE_INPUT,
    data: { name, value },
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
};

export { init, actionTypes, actions };
