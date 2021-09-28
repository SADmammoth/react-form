const types = {
  INIT: 'INIT',
};

const actions = (dispatch) => ({
  init: (data) => {
    dispatch({ type: types.INIT, data });
  },
});

export { types, actions };
