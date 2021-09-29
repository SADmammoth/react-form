import { isArray } from 'lodash-es';

import bindIter from './bindIter';

export default function bind(state) {
  const newState = { ...state };

  Object.keys(state).forEach((name) => {
    const field = newState[name];
    if (field.bind) {
      if (isArray(field.bind)) {
        field.bind.forEach((bind) => {
          bindIter(name, field, bind, newState);
        });
        return;
      }

      bindIter(name, field, field.bind, newState);
    }
  });
  return newState;
}
