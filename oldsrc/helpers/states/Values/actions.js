const types = {
  INIT: 'INIT',
  PUT: 'PUT',
  OVERRIDE: 'OVERRIDE',
};

const actions = (dispatch) => ({
  init: (data) => {
    dispatch({ type: types.INIT, data });
  },
  put: (data) => {
    dispatch({ type: types.PUT, data });
  },
  override: (data) => {
    dispatch({ type: types.OVERRIDE, data });
  },
});

export { types, actions };
