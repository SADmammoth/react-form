import { types } from './actions';
import { init, put } from './functions';

export default function valuesReducer(state, { type, data }) {
  switch (type) {
    case types.INIT:
      return init(data);

    case types.PUT:
      return put(state, data);

    default:
      return state;
  }
}
