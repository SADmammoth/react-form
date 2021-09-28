const types = {
  INIT: 'INIT',
  SET_INVALID: 'SET_INVALID',
  UNSET_INVALID: 'UNSET_INVALID',
};

const actions = (dispatch) => ({
  init: (data) => {
    dispatch({ type: types.INIT, data });
  },
  setInvalid: (data) => {
    dispatch({ type: types.SET_INVALID, data });
  },
  unsetInvalid: (data) => {
    dispatch({ type: types.UNSET_INVALID, data });
  },
});

export { types, actions };
