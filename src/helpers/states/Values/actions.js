const types = {
  INIT: 'INIT',
  PUT: 'PUT',
};

const actions = (dispatch) => ({
  init: (data) => {
    dispatch({ type: types.INIT, data });
  },
  put: (data) => {
    dispatch({ type: types.PUT, data });
  },
});

export { types, actions };
