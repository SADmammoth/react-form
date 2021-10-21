import { types } from './actions';
import { init, override, put } from './functions';

export default function valuesReducer(state, { type, data }) {
  switch (type) {
    case types.INIT:
      return init(data);

    case types.PUT:
      return put(state, data);

    case types.OVERRIDE:
      return override(data);

    default:
      return state;
  }
}
