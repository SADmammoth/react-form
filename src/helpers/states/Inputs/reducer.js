import { types } from './actions';
import { init, setInvalid, unsetInvalid } from './functions';

export default function inputsReducer(state, { type, data }) {
  switch (type) {
    case types.INIT:
      return init(data);

    case types.SET_INVALID:
      return setInvalid(state, data);

    case types.UNSET_INVALID:
      return unsetInvalid(state, data);

    default:
      return state;
  }
}
