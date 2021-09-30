const types = {
  INIT: 'INIT',
  SET_INVALID: 'SET_INVALID',
  UNSET_INVALID: 'UNSET_INVALID',
  PUT: 'PUT',
};

const actions = (dispatch) => ({
  init: (data) => {
    dispatch({ type: types.INIT, data });
  },
  put: (data) => {
    dispatch({ type: types.PUT, data });
  },
  setInvalid: (data) => {
    dispatch({ type: types.SET_INVALID, data });
  },
  unsetInvalid: (data) => {
    dispatch({ type: types.UNSET_INVALID, data });
  },
});

export { types, actions };
