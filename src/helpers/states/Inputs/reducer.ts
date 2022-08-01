import { InputsState, InputState } from '@/helpers/types/basic';
import { ActionPayload, ACTION_TYPES } from './actions';
import { init, setInvalid, unsetInvalid, put } from './functions';

export default function inputsReducer(
  state: InputsState,
  { type, data }: ActionPayload,
) {
  switch (type) {
    case ACTION_TYPES.INIT:
      return init(data);

    case ACTION_TYPES.PUT:
      return put(state, data);

    case ACTION_TYPES.SET_INVALID:
      return setInvalid(state, data);

    case ACTION_TYPES.UNSET_INVALID:
      return unsetInvalid(state, data);

    default:
      return state;
  }
}
