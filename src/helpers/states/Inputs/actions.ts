const types = {
  INIT: 'INIT',
  SET_INVALID: 'SET_INVALID',
  UNSET_INVALID: 'UNSET_INVALID',
  PUT: 'PUT',
};

const actions = (
  dispatch: (arg: {
    type: typeof types[keyof typeof types];
    data: unknown;
  }) => void,
) => ({
  init: (data: unknown) => {
    dispatch({ type: types.INIT, data });
  },
  put: (data: unknown) => {
    dispatch({ type: types.PUT, data });
  },
  setInvalid: (data: unknown) => {
    dispatch({ type: types.SET_INVALID, data });
  },
  unsetInvalid: (data: unknown) => {
    dispatch({ type: types.UNSET_INVALID, data });
  },
});

export { types, actions };
