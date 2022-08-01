import InputsProps from '@/helpers/types/InputsProps';

enum ACTION_TYPES {
  INIT = 'INIT',
  SET_INVALID = 'SET_INVALID',
  UNSET_INVALID = 'UNSET_INVALID',
  PUT = 'PUT',
}

export type InitActionDataType = { inputsProps: InputsProps }; //TODO
export type PutActionDataType = { name: unknown; props: unknown }; //TODO
export type ActionPayload = { type: ACTION_TYPES; data: InitActionDataType };

const actions = (dispatch: (payload: ActionPayload) => void) => ({
  init: (data: InitActionDataType) => {
    dispatch({ type: ACTION_TYPES.INIT, data });
  },
  put: (data: PutActionDataType) => {
    dispatch({ type: ACTION_TYPES.PUT, data });
  },
  setInvalid: (data: unknown) => {
    dispatch({ type: ACTION_TYPES.SET_INVALID, data });
  },
  unsetInvalid: (data: unknown) => {
    dispatch({ type: ACTION_TYPES.UNSET_INVALID, data });
  },
});

export { ACTION_TYPES, actions };
