import { types, actions } from './actions';
import { init } from './functions';

export default function inputsReducer(state, { type, data }) {
  switch (type) {
    case types.INIT:
      return init(data);

    default:
      return state;
  }
}
